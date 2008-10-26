// ==UserScript==
// @name Google Cache - rewrite link URL to Google cache.
// @author miya2000
// @namespace http://d.hatena.ne.jp/miya2000/
// @version 1.0.2
// @include http://72.14.235.104/search?q=cache:*
// @include http://72.14.203.104/search?q=cache:*
// @include http://72.14.253.104/search?q=cache:*
// @include http://209.85.175.104/search?q=cache:*
// ==/UserScript==
(function(){
    var func = function(){
        var exp = document.createExpression('\/\/a[@href]', null);
        var as = exp.evaluate(document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i=0, len=as.snapshotLength; i<len; i++) {
            var a = as.snapshotItem(i);
            if ( ! /^http/.test(a.href) ) continue;
            a.addEventListener('mousedown',(function(target){
                var href = target.getAttribute('href');
                if ( /^#/.test(href) ) {
                    href = location.href + href;
                }
                else {
                    href = 'http:\/\/www.google.co.jp\/search?q='+encodeURIComponent('cache:'+target.href);
                }
                return function(e){
                    target.href = href;
                    target.removeEventListener('mousedown',arguments.callee,false);
                }
            })(a),false);
        }
    }
    window.addEventListener('DOMContentLoaded', func, false);
})();

