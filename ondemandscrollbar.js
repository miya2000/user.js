// ==UserScript==
// @name      ondemand scrollbar
// @namespace http://orera.g.hatena.ne.jp/miya2000/
// @version   1.00
// @include   http://*
// @exclude   http://fastladder.com/reader/*
// @exclude   http://reader.livedoor.com/reader/*
// ==/UserScript==
(function() {
    
    var scrollbar, tip, root;
    function initScrollbar() {
        root = (document.compatMode == 'BackCompat') ? document.body : document.documentElement;
        scrollbar = document.createElement('div');
        scrollbar.style.cssText = [
            'position: fixed;',
            'top: 0;',
            'right: 0;',
            'margin: 0;',
            'padding: 0;',
            'border: none;',
            'z-index: 9999;',
            'width: 16px;',
            'height: 100%;',
            'overflow: hidden;',
            'background-color: #BBB;',
            'opacity: 0;'
        ].join('');
        tip = document.createElement('div');
        tip.style.cssText = [
            'position: relative;',
            'margin: 0;',
            'padding: 0;',
            'border: none;',
            'width: 100%;',
            'height: 40px;',
            'background-color: #D0FFD0;',
            'border-radius: 10px;'
        ].join('');
        scrollbar.appendChild(tip);
        scrollbar.addEventListener('mousedown', scrollbar_mousedown, false);
        scrollbar.addEventListener('mousemove', scrollbar_mousemove, false);
        scrollbar.addEventListener('mouseout', scrollbar_mouseout, false);
        scrollbar.addEventListener('dblclick', scrollbar_dblclick, false);
        tip.addEventListener('mousedown', tip_mousedown, false);
        window.addEventListener('scroll', window_scroll, false);
        window.addEventListener('resize', window_resize,false);
        document.addEventListener('DOMNodeInserted', document_domnodeinserted, false);
        document.body.appendChild(scrollbar);
        
        if (getPref('ondemandscrollbar_killScrollbar')) {
            killScrollbar();
        }
    }
    
    function scrollbar_mousedown(e) {
        showScrollbar(1300);
    }
    function scrollbar_mousemove(e) {
        showScrollbarNegatively(1300);
    }
    function scrollbar_mouseout(e) {
        hideScrollbarLater(700);
    }
    function scrollbar_dblclick(e) {
        killScrollbar();
    }
    function tip_mousedown(e) {
        scrollDragStart(e);
    }
    function window_scroll(e) {
        updateScrollbar();
    }
    function window_resize(e) {
        updateScrollbar();
    }
    function document_domnodeinserted(e) {
        updateScrollbar();
    }
    
    function updateScrollbar() {
        if (root.scrollHeight <= root.clientHeight) {
            if (tip.style.display != 'none') tip.style.display = 'none';
        }
        else {
            var top = root.scrollTop / root.scrollHeight * 100 + 0.5 | 0;
            top = top + '%';
            var height = root.clientHeight / root.scrollHeight * 100 + 0.5 | 0;
            if (height * root.clientHeight < 20) {
                height = '20px';
            }
            else {
                height = height + '%';
            }
            if (tip.style.top != top) tip.style.top = top;
            if (tip.style.height != height) tip.style.height = height;
            if (tip.style.display != '') tip.style.display = '';
        }
    }
    
    var hide_id, showing = false, holding = false;
    function showScrollbar(hideAfter) {
        if (holding) return;
        // scrollbar showing.
        if (document.documentElement.offsetWidth < window.innerWidth) {
            hideScrollbar();
            return;
        }
        updateScrollbar();
        scrollbar.style.opacity = 0.7;
        showing = true;
        hideScrollbarLater(hideAfter);
    }
    function showScrollbarNegatively(hideAfter) {
        if (showing || root.scrollHeight > root.clientHeight) {
            showScrollbar(hideAfter);
        }
    }
    function hideScrollbar() {
        if (holding) return;
        scrollbar.style.opacity = 0;
        showing = false;
    }
    function hideScrollbarLater(milliseconds) {
        if (holding) return;
        clearHideScrollbarLater();
        hide_id = setTimeout(hideScrollbar, milliseconds || 1300);
    }
    function clearHideScrollbarLater() {
        if (holding) return;
        if (hide_id) clearTimeout(hide_id);
        hide_id = null;
    }
    function holdScrollbarOpacity(opacity) {
        clearHideScrollbarLater();
        holding = true;
        scrollbar.style.opacity = opacity;
    }
    function clearHoldScrollbarOpacity() {
        holding = false;
        showScrollbar(1300);
    }

    var startY = 0, startScrollTop;
    function scrollDragStart(e) {
        e.preventDefault();
        document.addEventListener('mousemove', scrollDragging, false);
        document.addEventListener('mouseup', scrollDragEnd, false);
        holdScrollbarOpacity(.9);
        startY = e.clientY;
        startScrollTop = root.scrollTop;
    }
    var session = null;
    function scrollDragging(e) {
        // The e.clientY value after scrolling becomes strange. 
        if (session) return;
        session = setTimeout(function() { session = null; }, 0);
        root.scrollTop = startScrollTop + ((e.clientY - startY) * (root.scrollHeight / root.clientHeight) + 0.5 | 0);
        updateScrollbar();
    }
    function scrollDragEnd(e) {
        document.removeEventListener('mousemove', scrollDragging, false);
        document.removeEventListener('mouseup', scrollDragEnd, false);
        clearHoldScrollbarOpacity();
    }
    
    var scrollbarWidth = 16;
    function killScrollbar() {
        setPref('ondemandscrollbar_killScrollbar', '1');
        if (scrollbar.offsetWidth) scrollbarWidth = scrollbar.offsetWidth;
        scrollbar.style.display = 'none';
        setTimeout(function() {
            document.addEventListener('dblclick', observeDblclick, false);
        }, 100);
    }
    function observeDblclick(e) {
        if (e.pageX >= root.clientWidth - scrollbarWidth) {
            restoreScrollbar();
        }
    }
    function restoreScrollbar() {
        setPref('ondemandscrollbar_killScrollbar', null);
        document.removeEventListener('dblclick', observeDblclick, false);
        scrollbar.style.display = '';
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
        }
        else {
            window.localStorage[key] = value;
        }
    }
    
    function main() {
        if (!document.body) return;
        initScrollbar();
    }
    document.addEventListener('DOMContentLoaded', main, false);
})()