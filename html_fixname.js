// ==UserScript==
// @name html - fix name
// @description remove '#' from head of the name attribute.
// @author miya2000
// @namespace http://d.hatena.ne.jp/miya2000/
// @version 1.0.0
// @include http://*
// ==/UserScript==
(function(){
    function main(){
        var as=document.evaluate('\/\/a[starts-with(@name,"#")]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i=0,len=as.snapshotLength;i<len;i++) {
            var a=as.snapshotItem(i);
            a.setAttribute('name', a.getAttribute('name').substring(1));
        }
    }
    document.addEventListener('DOMContentLoaded',main,false);
})()

