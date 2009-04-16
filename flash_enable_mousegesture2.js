// ==UserScript==
// @name flash - enable mouse gesture2 (for Opera9.5)
// @description do hogehoge to allow mouse-gesture on flash.
// @author miya2000
// @namespace http://d.hatena.ne.jp/miya2000/
// @version 1.1.0
// @include http://*
// @exclude http://www.nicovideo.jp/watch/*
// @exclude http://*youtube*
// @exclude http://www.slideshare.net/*
// @exclude http://*ustream.tv/*
// ==/UserScript==
(function() {
    
    function evaluate(xpath, context) {
        var eles = document.evaluate(xpath, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var arr = [];
        for (var i = 0, len = eles.snapshotLength; i < len; i++) {
            arr.push(eles.snapshotItem(i));
        }
        return arr;
    }
    
    // http://developer.mozilla.org/ja/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach#Compatibility
    function fe(array) {
        if (array.forEach) return;
        array.forEach = function(fun /*, thisp*/) {
            var len = this.length;
            if (typeof fun != "function") throw new TypeError();
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in this) fun.call(thisp, this[i], i, this);
            }
        };
    }
    
    // http://mayokara.info/note/view/269
    var defer = function(/* f1, f2, ... */){
        var self = this, fn = Array.prototype.slice.call(arguments);
        (function(/* arg2, arg3, ... */){
            var args = Array.prototype.slice.call(arguments);
            (fn.shift()).apply(self, [arguments.callee].concat(args));
        })();
    };
    
    var replace = function(x, y) {
        if (!y || x === y) {
            var p = x.parentNode;
            var n = x.nextSibling;
            p.removeChild(x);
            p.insertBefore(x, n);
        }
        else {
            x.parentNode.replaceChild(y, x);
        }
    }
    
    // emulate dblclick event listener.
    // (embed(or object) element's click event is not available on Opera.)
    function addDblClickListener(el, f) {
        var cnt = 0, pre = 0;
        el.addEventListener('mousedown', function(e) {
            e.preventDefault();
            var now = new Date().getTime();
            if (now - pre < 200) { cnt++ } // adjust me.
            else                 { cnt=1 }
            if (cnt == 2) {
                f(e);
                el.removeEventListener(e.type, arguments.callee, e.eventPhase == Event.CAPTURING_PHASE);
            }
            pre = now;
        }, false);
    }
    
    function createCover(el){
        function getLocation(el) {
            var p = el, x = 0, y = 0;
            while(p) {
                x += p.offsetLeft;
                y += p.offsetTop;
                p  = p.offsetParent;
            }
            return { x: x, y: y };
        }
        var dv = el.ownerDocument.createElement('div');
        dv.style.cssText = 'position: absolute; margin: 0; padding: 0; border-width: 0; opacity: .05; background-color: black; ';
        dv.style.width  = el.offsetWidth  + 'px';
        dv.style.height = el.offsetHeight + 'px';
        var loc = getLocation(el);
        dv.style.left = loc.x + 'px';
        dv.style.top  = loc.y + 'px';
        var zIndex = getComputedStyle(el, null).getPropertyValue('z-index');
        dv.style.zIndex = isNaN(zIndex) ? 1000 : Number(zIndex) + 1; // ignore "inherit".
        return dv;
    }
    
    // set wmode="opaque" to flash element.
    function setWModeEm(fl) {
        if (fl.offsetWidth * fl.offsetHeight == 0) return;
        fl.setAttribute('wmode', 'opaque');
        var dv = document.createElement('div');
        dv.innerHTML = fl.outerHTML;
        var dfl = dv.firstChild;
        replace(fl, dfl);
        
        var cover = createCover(dfl);
        document.body.appendChild(cover);
        cover.addEventListener('click', function(){ // enable contextmenu (and disable mouse-gesture).
            cover.parentNode.removeChild(cover);
        },false);
        addDblClickListener(dfl, function() {       // remove wmode (and restart movie).
            replace(dfl, fl);
        });
    }
    function setWModeOb(fl) {
        if (fl.offsetWidth * fl.offsetHeight == 0) return;
        var prm = document.createElement('param');
        prm.setAttribute('name','wmode');
        prm.setAttribute('value','opaque');
        fl.appendChild(prm);
        replace(fl);
        
        var cover = createCover(fl);
        document.body.appendChild(cover);
        cover.addEventListener('click', function() { // enable contextmenu (and disable mouse-gesture).
            cover.parentNode.removeChild(cover);
        },false);
        addDblClickListener(fl, function() {         // remove wmode (and restart movie).
            var prms = evaluate('param[@name="wmode"]', fl);
            for (var i = 0; i < prms.length; i++) {
                fl.removeChild(prms[i]);
            }
            replace(fl);
        });
    }
    
    function doHogeHoge(target) {
        var embedFlash = evaluate('//embed[(@wmode!="opaque" and @wmode!="transparent") and @type="application/x-shockwave-flash"]', target);
        var objectFlash = evaluate('//object[count(param[@name="wmode" and (@value="opaque" or @value="transparent")])=0 and (@type="application/x-shockwave-flash" or @classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000")]', target);
        if (embedFlash.length == 0 && objectFlash.length == 0) {
            return;
        }
        fe(embedFlash); fe(objectFlash);
        embedFlash.forEach(setWModeEm);
        objectFlash.forEach(setWModeOb);
    }
    
    function main() {
        if (!document.body) return;
        defer(
            function(next) {
                // for Eolas's patent.
                var funcName = '__tmp' + Math.ceil(new Date * Math.random()); // prevent conflict other script.
                var ex_script = document.createElement('script');
                ex_script.style.display = 'none';
                ex_script.src = 'data:text/javascript,window.' + funcName + '=' + encodeURIComponent(replace.toString());
                var bak_tmp = window[funcName];
                document.body.appendChild(ex_script);
                setTimeout(function() {
                    if (ex_script.parentNode) {
                        ex_script.parentNode.removeChild(ex_script);
                    }
                    if (!window[funcName]) return;
                    replace = window[funcName];
                    window[funcName] = bak_tmp;
                    next();
                }, 0);
            },
            function() {
                doHogeHoge(document.body);
                document.addEventListener('DOMNodeInserted', function(e) {
                    document.removeEventListener('DOMNodeInserted', arguments.callee, false);
                    doHogeHoge(e.target);
                    document.addEventListener('DOMNodeInserted', arguments.callee, false);
                }, false);
            }
        );
    }
    document.addEventListener('DOMContentLoaded', main, false);
})()