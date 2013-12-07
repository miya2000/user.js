// ==UserScript==
// @name      nicovideo - hotkey
// @namespace http://d.hatena.ne.jp/miya2000/
// @author    miya2000
// @version   3.0.0Å@(niconico Ginza)
// @include   http://www.nicovideo.jp/watch/*
// @exclude   http://*http://*
// ==/UserScript==
(function() {
function main() {
    // setting.
    const HOTKEY = { f:use_hotkey, k:32 }; // Space
    const CONFIG = [
        { f:play_pause, k:32 }, // Space
        { f:volumeup,   k:38 }, // Up
        { f:volumedown, k:40 }, // Down
        { f:seekright,  k:39 }, // Right
        { f:seekleft,   k:37 }, // Left
    ];
    
    // main.
    if (window.parent != window) return;
    var input = document.createElement('input');
    input.readOnly = true;
    input.autocomplete = 'off';
    input.size = 20;
    input.style.cssText = 'color: #444; border: #222 solid 2px; border-radius: 5px; padding: 2px 4px; opacity: 0.9;';
    input.addEventListener('focus', function() {
        input.style.backgroundColor = '#301010';
        input.value = 'Hotkey available.'
    }, false);
    input.addEventListener('blur', function() {
        input.style.backgroundColor = '#102510';
        input.value = 'Hotkey unavailable.'
    }, false);
    input.addEventListener('keydown', function(e) {
        var keyCode = e.keyCode;
        for (var i = 0; i < CONFIG.length; i++) {
            if (keyCode == CONFIG[i].k) {
                if (typeof(CONFIG[i].f) == 'function') {
                    CONFIG[i].f(e);
                }
                e.preventDefault();
                e.stopPropagation();
                break;
            }
        }
    }, false);
    (document.getElementById('playerNicoplayer')).appendChild(input);
    adjustView(input);
    input.focus();
    
    document.addEventListener('keypress', function(e) {
        if (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return;
        if (e.keyCode === HOTKEY.k) {
            if (typeof(HOTKEY.f) == 'function') {
                HOTKEY.f();
            }
            e.preventDefault();
        }
    }, false);
    
    // key functions.
    function use_hotkey() {
        adjustView(input);
        input.focus();
    }
    function play_pause() {
        var flvplayer = getFlvPlayer();
        if (!flvplayer) return;
        if (flvplayer.ext_getStatus() == 'playing') {
            flvplayer.ext_play(0);
        }
        else {
            flvplayer.ext_play(1);
        }
    }
    function volumeup(e) {
        volume(5);
    }
    function volumedown(e) {
        volume(-5);
    }
    function volume(vol) {
        var flvplayer = getFlvPlayer();
        if (!flvplayer) return;
        var cur = Number(flvplayer.ext_getVolume());
        var to = cur + Number(vol);
        if (to > 100) to = 100;
        if (to < 0  ) to = 0;
        flvplayer.ext_setVolume(to);
    }
    function seekright(e) {
        seek(10);
    }
    function seekleft(e) {
        if (e.ctrlKey) seek(Number.NEGATIVE_INFINITY);
        else           seek(-10);
    }
    function seek(time) {
        var flvplayer = getFlvPlayer();
        if (!flvplayer) return;
        var len = Number(flvplayer.ext_getTotalTime());
        var cur = Number(flvplayer.ext_getPlayheadTime());
        var to = cur + Number(time);
        if (to > len) to = len;
        if (to < 0  ) to = 0;
        flvplayer.ext_setPlayheadTime(to);
        // for shotage of backward seek.
        var cur = Number(flvplayer.ext_getPlayheadTime());
        if (time < 0 && cur - to > 5 && to > 10) {
            flvplayer.ext_setPlayheadTime(to - 10);
        }
    }
    
    // utils.
    function adjustView(ele) {
        var p = getAbsolutePosition(ele);
        var view = document.documentElement;
        if (p.y < view.scrollTop || 
            p.y > (view.scrollTop + view.scrollHeight)
        ) {
            ele.parentNode.scrollIntoView(false);
        }
    }
    function getAbsolutePosition(el) {
        var p = el, x = 0, y = 0;
        while (p.offsetParent) {
            x += p.offsetLeft, y += p.offsetTop, p = p.offsetParent;
        }
        return { x : x, y : y }
    }
    
    function getFlvPlayer() {
        return document.getElementById('external_nicoplayer') || document.getElementById('flvplayer');
    }
}
if (window.opera) main();
else {
    var script = document.createElement('script');
    script.setAttribute('type', 'text\/javascript');
    script.innerHTML = '(' + main.toString() + ')()';
    document.body.appendChild(script);
}
})();
