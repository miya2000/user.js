// ==UserScript==
// @name      ondemand scrollbar
// @namespace http://orera.g.hatena.ne.jp/miya2000/
// @include   http://*
// ==/UserScript==
(function() {
    var scrollbar, tip;
    function initScrollbar() {
        scrollbar = document.createElement('div');
        scrollbar.style.cssText = [
            'position: fixed;',
            'top: 0;',
            'right: 0;',
            'z-index: 1000;',
            'width: 16px;',
            'height: 100%;',
            'background-color: #D9D9D9;',
            'opacity: 0;'
        ].join('');
        tip = document.createElement('div');
        tip.style.cssText = [
            'position: relative;',
            'width: 100%;',
            'height: 40px;',
            'background-color: #DDFFDD;',
            'border-radius: 10px;'
        ].join('');
        scrollbar.appendChild(tip);
        scrollbar.addEventListener('mousemove', showScrollbar, false);
        scrollbar.addEventListener('mouseout', hideScrollbar, false);
        window.addEventListener('scroll', showAndUpdateScrollbar, false);
        window.addEventListener('resize', updateScrollbar,false);
        document.body.appendChild(scrollbar);
        updateScrollbar();
    }
    
    function showAndUpdateScrollbar() {
        showScrollbar();
        updateScrollbar();
    }
    var ele = (document.compatMode == "BackCompat") ? document.body : document.documentElement;
    function updateScrollbar() {
        if (ele.scrollHeight == ele.clientHeight) {
            tip.style.display = 'none';
        }
        else {
            tip.style.top = (ele.scrollTop / ele.scrollHeight) * 100 + '%';
            tip.style.height = (ele.clientHeight / ele.scrollHeight) * 100 + '%';
            tip.style.display = '';
        }
    }
    
    var hide_id;
    function showScrollbar() {
        scrollbar.style.opacity = 0.8;
        hideScrollbarLater();
    }
    function hideScrollbar() {
        scrollbar.style.opacity = 0;
    }
    function hideScrollbarLater() {
        clearHideScrollbarLater();
        hide_id = setTimeout(hideScrollbar, 1000);
    }
    function clearHideScrollbarLater() {
        if (hide_id) clearTimeout(hide_id);
        hide_id = null;
    }
    
    function main() {
        if (!document.body) return;
        initScrollbar();
    }
    document.addEventListener('DOMContentLoaded', main, false);
})()