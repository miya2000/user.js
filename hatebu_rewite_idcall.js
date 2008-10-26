// ==UserScript==
// @name        hatebu - rewite id-call.
// @description rewite id-call link from the user page to the user bookmark on the entry page.
// @author      miya2000
// @namespace   http://d.hatena.ne.jp/miya2000/
// @include     http://b.hatena.ne.jp/entry/*
// ==/UserScript==
(function() {
    function main(){
        var as = document.evaluate('\/\/a[starts-with(@href,"http://b.hatena.ne.jp/")][starts-with(text(),"id:")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var reg = /id:(.*)/;
        for (var i = 0, len = as.snapshotLength; i < len; i++) {
            var a = as.snapshotItem(i);
            var id = reg.exec(a.text)[1];
            var bmLink = document.getElementById('bookmark-user-' + id);
            if (bmLink) {
                a.setAttribute('href', '#bookmark-user-' + id);
            }
        }
    }
    document.addEventListener('DOMContentLoaded', main, false);
})()

