// ==UserScript==
// @name wheelable select.
// @author miya2000
// @namespace http://d.hatena.ne.jp/miya2000/
// @version 1.0.0
// @include http://*
// ==/UserScript==
(function(){
    
    function wheeled(e) {
        var t = e.currentTarget;
        var c = e.detail;
        var n = t.selectedIndex + (c > 0 ? 1 : -1);
        if (n >= 0 && n < t.length) t.selectedIndex = n;
        e.preventDefault();
    };
    
    function main() {
        var sn = document.getElementsByTagName('select');
        for(var i = 0; i < sn.length;i++){
            var s = sn[i];
            if(!s.multiple){
                s.addEventListener('mousewheel', wheeled, false);
            }
        }
    }
    document.addEventListener('DOMContentLoaded', main, false);
})();

