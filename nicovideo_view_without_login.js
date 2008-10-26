// ==UserScript==
// @name      nicovideo - view without login.
// @namespace http://d.hatena.ne.jp/miya2000/
// @author    miya2000
// @version   1.1.0
// @include   http://www.nicovideo.jp/watch/*
// @exclude   http://*http*
// ==/UserScript==
(function(){
    var bak_write = document.write;
    function main() {
        if (window.User && window.User.id) return;
        var video_id = location.href.match(/[^/]*$/);
        if (!video_id) return;
        var thumb_script = document.createElement('script');
        thumb_script.src = 'http://www.nicovideo.jp/thumb_watch/' + video_id;
        thumb_script.style.display = 'none';
        document.write = function(html) {
            document.write = bak_write;
            new Insertion.Top($('PAGEBODY'), html);
        };
        Element.setStyle('PAGEBODY',{'text-align':'center'});
        document.body.appendChild(thumb_script);
    }
    document.addEventListener('DOMContentLoaded', main, false);
})();
