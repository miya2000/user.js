// ==UserScript==
// @name html - set anchor title.
// @description set title to anchor without title attribute.
// @author miya2000
// @namespace http://d.hatena.ne.jp/miya2000/
// @version 1.1
// @include http://*
// ==/UserScript==
(function(){

    if (document.documentElement.getAttribute('xmlns') == 'http://www.w3.org/1999/xhtml' && !document.documentElement.namespaceURI) {
        return;
    }

    function guessTitle(a) {
        var title = a.textContent.replace(/^\s+|\s+$/g, '');
        if (!title) {
            var img = a.getElementsByTagName('img')[0];
            if (img) title = (img.alt || '').replace(/^\s+|\s+$/g, '');
        }
        return title;
    }

    function main() {
        var pagetitle = (document.title) ? document.title.replace(/^\s+|\s+$/g, '') : '';
        var an = document.evaluate('\/\/a[@href and not(starts-with(@href,"javascript")) and not(@title)]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i=0, len = an.snapshotLength; i < len; i++) {
            var a = an.snapshotItem(i);
            var title = guessTitle(a);
            if (title) {
                if (pagetitle && a.href.indexOf(location.hostname) > 0) {
                    title += ' - ' + pagetitle;
                }
                a.setAttribute('title', title);
            }
        }
    }
    document.addEventListener('DOMContentLoaded', main, false);
})()
