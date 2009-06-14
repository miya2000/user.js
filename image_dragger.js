// ==UserScript==
// @name Image Dragger (like Adobe Reader)
// @description enable drag scroll like Adobe Reader on large image page. togglable by Esc key.
// @author miya2000
// @namespace http://github.com/miya2000/
// @version 1.0.0
// @include *.jpg
// @include *.jpeg
// @include *.gif
// @include *.png
// @include *.bmp
// ==/UserScript==
/**
 * @notice for Opera 9.5 over.
 * @see dragLikeAdobeReader (javascripter)
 *      http://userscripts.org/scripts/show/28474
 */
(function() {
    var ImageDragger = (function() {
        var documents = [];
        var dragging = false;
        var target, curX, curY;
        function mousedown(e) {
            dragging = true;
            target = e.currentTarget;
            curX = e.pageX;
            curY = e.pageY;
            e.preventDefault();
        }
        function mousemove(e) {
            if (!dragging) return;
            target.ownerDocument.body.scrollLeft += (curX - e.pageX);
            target.ownerDocument.body.scrollTop  += (curY - e.pageY);
        }
        function mouseup(e) {
            dragging = false;
            target = null;
        }
        function dragOn(ele) {
            dragOff(ele); // clear.
            ele.style.cursor = 'move';
            reset(ele);
            ele.addEventListener('mousedown', mousedown, false);
            var document = ele.ownerDocument;
            if (documents.indexOf(document) < 0) {
                document.addEventListener('mousemove', mousemove, false);
                document.addEventListener('mouseup', mouseup, false);
                documents.push(document);
            }
        }
        function dragOff(ele) {
            ele.style.cursor = '';
            reset(ele);
            ele.removeEventListener('mousedown', mousedown, false);
            if (target === ele) mouseup();
        }
        function reset(e) {
            var p = e.parentNode;
            var n = e.nextSibling;
            p.removeChild(e);
            p.insertBefore(e, n);
        }
        // class definition.
        var clazz = function ImageDragger(img) {
            this.img = img;
            this.updateEnv();
        };
        clazz.prototype = {
            constructor : clazz,
            _enabled : true,
            get enabled()  { return this._enabled; }, // Opera 9.5 over.
            set enabled(v) { this._enabled = v; this.updateEnv(); },
            updateEnv : function() {
                if (!this._enabled) {
                    dragOff(this.img);
                    return;
                }
                var clientW = this.img.ownerDocument.body.clientWidth;
                var clientH = this.img.ownerDocument.body.clientHeight;
                if (this.img.width > clientW || this.img.height > clientH) {
                    dragOn(this.img);
                }
                else {
                    dragOff(this.img);
                }
            },
        };
        return clazz;
    })();

    var imgs = document.getElementsByTagName('img');
    if (imgs.length > 1) return;
    var img = imgs[0];
    var imgd = new ImageDragger(imgs[0]);
    img.addEventListener('load', function() {
        imgd.updateEnv();
    }, false);
    window.addEventListener('resize', function() {
        imgd.updateEnv();
    }, false);
    window.addEventListener('keydown', function(e) {
        if (e.keyCode == 27) { // Esc.
            imgd.enabled = !imgd.enabled;
        }
    }, false);
})()
