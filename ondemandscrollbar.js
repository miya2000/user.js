// ==UserScript==
// @name      ondemand scrollbar
// @namespace http://orera.g.hatena.ne.jp/miya2000/
// @version   1.02
// @include   http://*
// @exclude   http://fastladder.com/reader/*
// @exclude   http://reader.livedoor.com/reader/*
// ==/UserScript==
(function() {

    var scrollbar, tip, scrollbar2, tip2, root,
		DEF_TIMEOUT = 1300, DEF_MOUSEOUT = 500,
    	startY = 0, startX = 0, startScrollTop, startScrollLeft,
    	hide_id, showing = false, holding = false, holizontal = false,
    	session = null,
    	scrollbarWidth = 16,  scrollbarHeight = 16;

    function initScrollbar() {
		var scrollBaseCSS = [
			'position: fixed;',
			'margin: 0;',
			'padding: 0;',
			'border: none;',
			'z-index: 9999;',
			'overflow: hidden;',
			'background-color: #BBB;',
			'opacity: 0;'
		],
		tipBaseCSS = [
			'position: relative;',
			'margin: 0;',
			'padding: 0;',
			'border: none;',
			'background-color: #D0FFD0;',
			'border-radius: 10px;'
		],
		scrollEventObj = {
			'mousedown' : scrollbar_mousedown,
			'mousemove' : scrollbar_mousemove,
			'mouseout'  : scrollbar_mouseout,
			'dblclick'  : scrollbar_dblclick,
		},
		tipEventObj = {
			'mousedown' : tip_mousedown
		};

        root = (document.compatMode == 'BackCompat') ? document.body : document.documentElement;

		function nodeFactory(base, optional){
			var node = document.createElement('div');
			node.style.cssText = base.join('') + optional.join('');
			return node;
		}

		function scrollFactory(cssArray){
			return nodeFactory( scrollBaseCSS, cssArray );
		}

		function tipFactory(cssArray){
			return nodeFactory( tipBaseCSS, cssArray );
		}

		//create scroll bar div
		scrollbar = scrollFactory([
            'top: 0;',
            'right: 0;',
            'width: 16px;',
            'height: 100%;'
		]);
		tip = tipFactory([
            'width: 100%;',
            'height: 40px;'
		]);
		scrollbar.appendChild(tip);

		scrollbar2 = scrollFactory([
            'bottom: 0;',
            'left: 0;',
            'width: 100%;',
            'height: 16px;'
		]);
		tip2 = tipFactory([
            'width: 40px;',
            'height: 100%;'
		]);
		scrollbar2.appendChild(tip2);

		// event bind
		bind( scrollbar,  scrollEventObj );
		bind( scrollbar2, scrollEventObj );
		bind( tip,  tipEventObj );
		bind( tip2, tipEventObj );

		// document all events
		bind( window, {
			'mousewheel' : window_wheel,
			'scroll'     : window_scroll,
			'resize'     : window_resize
		});
		bind( document, { 'DOMNodeInserted' : document_domnodeinserted } );

        document.body.appendChild(scrollbar);
        document.body.appendChild(scrollbar2);

        if (getPref('ondemandscrollbar_killScrollbar')) {
            killScrollbar();
        }
    }

    function scrollbar_mousedown(e) {
        showScrollbar(DEF_TIMEOUT);
    }
    function scrollbar_mousemove(e) {
        showScrollbarNegatively(DEF_TIMEOUT);
    }
    function scrollbar_mouseout(e) {
        hideScrollbarLater(DEF_MOUSEOUT);
    }
    function scrollbar_dblclick(e) {
        killScrollbar();
    }
    function tip_mousedown(e) {
        scrollDragStart(e);
    }
    function window_scroll(e) {
        showScrollbarMoreNegatively(DEF_TIMEOUT);
    }
    function window_resize(e) {
        updateScrollbar();
        updateScrollbar2();
    }
	function window_wheel(e) {
		var delta = -(e.wheelDelta/2);
        startScrollLeft = root.scrollLeft;
		if( e.clientY> window.innerHeight - 16 ){
			e.preventDefault();
        	root.scrollLeft = startScrollLeft+delta;
        	updateScrollbar2();
			return;
		}
	}

    function document_domnodeinserted(e) {
        updateScrollbar();
        updateScrollbar2();
    }

    function updateScrollbar() {
		var top, height;
        if (root.scrollHeight <= root.clientHeight) {
			checkStyle( tip, 'display', 'none' );
        } else {
            top = new String(root.scrollTop / root.scrollHeight * 100 + 0.5 | 0) + '%';
            height = root.clientHeight / root.scrollHeight * 100 + 0.5 | 0;
			height = (height * root.clientHeight < 20 ) ? '20px' : height + '%';
			checkStyle( tip, 'top', top );
			checkStyle( tip, 'height', height );
			checkStyle( tip, 'display', '' );
        }
    }

    function updateScrollbar2() {
		var left, width;
        if (root.scrollWidth <= root.clientWidth) {
			checkStyle( tip2, 'display', 'none' );
        } else {
            left = new String(root.scrollLeft / root.scrollWidth * 100 + 0.5 | 0) + '%';
            width = root.clientWidth / root.scrollWidth * 100 + 0.5 | 0;
			width = (width * root.clientWeight < 20 ) ? '20px' : width + '%';
			checkStyle( tip2, 'left', left );
			checkStyle( tip2, 'width', width );
			checkStyle( tip2, 'display', '' );
        }
    }

	function checkStyle( node, property, value ){
		if( node.style[property] != value ){
			node.style[property] = value;
		}
	}

	function setSBStyle( property, value ){
		scrollbar.style[property] = value;
		scrollbar2.style[property] = value;
	}

    function showScrollbar(hideAfter) {
        if (holding) return;
        // scrollbar showing.
        if (document.documentElement.offsetWidth < window.innerWidth) {
            hideScrollbar();
            return;
        }

        if (document.documentElement.offsetHeight < window.innerHeight) {
            hideScrollbar();
            return;
        }

        updateScrollbar();
        updateScrollbar2();
		// scroll flg
		setSBStyle( 'opacity', 0.7 );
        showing = true;
        hideScrollbarLater(hideAfter);
    }
    function showScrollbarNegatively(hideAfter) {
		if (showing){
            showScrollbar(hideAfter);
		}else if (root.scrollHeight > root.clientHeight) {
            showScrollbar(hideAfter);
        }
    }
    function showScrollbarMoreNegatively(hideAfter) {
        if (showing && root.scrollHeight > root.clientHeight) {
            showScrollbar(hideAfter);
        }
    }
    function hideScrollbar() {
        if (holding) return;
		setSBStyle( 'opacity', 0 );
        showing = false;
    }
    function hideScrollbarLater(milliseconds) {
        if (holding) return;
        clearHideScrollbarLater();
        hide_id = setTimeout(hideScrollbar, milliseconds || DEF_TIMEOUT);
    }
    function clearHideScrollbarLater() {
        if (holding) return;
        if (hide_id) clearTimeout(hide_id);
        hide_id = null;
    }
    function holdScrollbarOpacity(opacity) {
        clearHideScrollbarLater();
        holding = true;
		setSBStyle( 'opacity', opacity );
    }
    function clearHoldScrollbarOpacity() {
        holding = false;
		holizontal = false;
        showScrollbar(DEF_TIMEOUT);
    }

    function scrollDragStart(e) {
        if (document.documentElement.offsetWidth < window.innerWidth) {
            return;
        }
        if (document.documentElement.offsetHeight < window.innerHeight) {
            return;
        }
        e.preventDefault();
		bind( document, {
			'mousemove' : scrollDragging,
			'mouseup' : scrollDragEnd
		});
        holdScrollbarOpacity(.9);
        startY = e.clientY;
        startX = e.clientX;
        startScrollTop = root.scrollTop;
        startScrollLeft = root.scrollLeft;
    }
    function scrollDragging(e) {
        // The e.clientY value after scrolling becomes strange.
        if (session) return;
        session = setTimeout(function() { session = null; }, 0);
		if( e.target == tip ){
			holizontal = true;
		}
		if( holizontal ) {
        	root.scrollTop = startScrollTop + ((e.clientY - startY) * (root.scrollHeight / root.clientHeight) + 0.5 | 0);
        	updateScrollbar();
		}else{
        	root.scrollLeft = startScrollLeft+ ((e.clientX - startX) * (root.scrollWidth / root.clientWidth) + 0.5 | 0);
        	updateScrollbar2();
		}
    }
    function scrollDragEnd(e) {
        document.removeEventListener('mousemove', scrollDragging, false);
        document.removeEventListener('mouseup', scrollDragEnd, false);
        clearHoldScrollbarOpacity();
    }

    function killScrollbar() {
        setPref('ondemandscrollbar_killScrollbar', '1');
        if (scrollbar.offsetWidth) scrollbarWidth = scrollbar.offsetWidth;
        if (scrollbar2.offsetHeight) scrollbarHeight = scrollbar2.offsetHeight;
		setSBStyle( 'display', 'none' );
        setTimeout(function() {
            document.addEventListener('dblclick', observeDblclick, false);
        }, 100);
    }
    function observeDblclick(e) {
        if (e.pageX >= root.clientWidth - scrollbarWidth) {
            restoreScrollbar();
        }
        if (e.pageY >= root.clientHeight - scrollbarHeight) {
            restoreScrollbar();
        }

    }
    function restoreScrollbar() {
        setPref('ondemandscrollbar_killScrollbar', null);
        document.removeEventListener('dblclick', observeDblclick, false);
		setSBStyle( 'display', '' );
        showScrollbar(2000);
    }


    function getPref(key) {
        if (!window.localStorage) return null;
        return window.localStorage[key];
    }
    function setPref(key, value) {
        if (!window.localStorage) return;
        if (value == null) {
            localStorage.removeItem(key);
        } else {
            window.localStorage[key] = value;
        }
    }

	function bind( node, eventsObj ){
		for( var key in eventsObj ){
			node.addEventListener( key, eventsObj[key], false );
		}
	}


    function main() {
		if( window.top != window.self ){ return; }	// ignore iframe
        if (!document.body){ return; }
        initScrollbar();
    }
    document.addEventListener('DOMContentLoaded', main, false);
})()
