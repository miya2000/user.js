// ==UserScript==
// @name ldr - fix br (for Opera).
// @include http://fastladder.com/reader/
// ==/UserScript==
(function() {
    var forEach = Array.prototype.forEach;
    function main() {
        register_hook('BEFORE_PRINTFEED', function(feed){
            forEach.call(feed.items, function(item) {
                item.body = item.body.replace(/<br><\/br>/ig, '<br>');
            });
        });
    }
    document.addEventListener('DOMContentLoaded', main, false);
})();