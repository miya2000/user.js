// ==UserScript==
// @name flash - remove kuso
// @author miya2000
// @namespace http://d.hatena.ne.jp/miya2000/
// @version 1.1.0
// @include http://*
// ==/UserScript==
(function() {
    function main() {
        var kuso = document.evaluate('//embed[contains(@src, "flash_detection.swf")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!kuso) return;
        if (!/flashContentURL=javascript%3A/i.test(kuso.src)) {
            kuso.src = kuso.src.replace(/flashContentURL=([^&]*)/, 'flashContentURL=javascript%3Alocation.replace(%22$1%22)%3B');
        }
    }
    document.addEventListener('DOMContentLoaded', main, false);
})()