// ==UserScript==
// @name Remedie for Opera.
// @include http://*:10010/
// ==/UserScript==
(function() {
    
    window.opera.addEventListener('BeforeScript', function (e) {
        var src = e.element.getAttribute('src');
        if (src && src.match(/remedie\.js/)) {
            // prevent overwrite history.
            e.element.text = e.element.text.replace(/location\.href = "#channel\/" \+ channel\.id;/, [
                'var nextHash = "#channel/" + channel.id;',
                'if (nextHash != location.hash) location.href = nextHash;'
            ].join('\n'));
        }
    }, false);
    
    function addStyle(styleStr, doc) {
        var document = doc || window.document;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.style.display = 'none';
        style.innerHTML = styleStr;
        style.ownerDocument.body.appendChild(style);
        return style;
    }
    
    function main() {
        if (!Remedie) return;
        
        // ignore browser detection.
        jQuery.browser.mozilla = true;
        
        // fix [PLAY] link.
        addStyle('.rounded_by_jQuery_corners > div > div { display: none }');
        
        // enable mouse gesture.
        var org_showChannel = Remedie.prototype.showChannel;
        Remedie.prototype.showChannel = function() {
            org_showChannel.apply(this, arguments);
            this.current_href = location.href;
        }
        setInterval(function() {
            if (remedie.current_href != location.href) {
                remedie.current_href = location.href;
                var args = location.hash.split('/');
                if (args[0] == '#channel') {
                    remedie.showChannel( remedie.channels[args[1]] );
                }
                else if (args[0] == '' || args[0] == '#menu') {
                    if (remedie.current_id) {
                        remedie.toggleChannelView(false);
                    }
                }
            }
        }, 100);
    }
    document.addEventListener('DOMContentLoaded', main, false);
})();