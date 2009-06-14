// ==UserScript==
// @name del.icio.us - Auto Commit del.icio.us (for new version.)
// @namespace http://d.hatena.ne.jp/miya2000/
// @version 2.0.1
// @include http://delicious.com/save?*
// ==/UserScript==
(function(){

    var ackey = 'qawsedrftgyhujiko'; // edit your complex pass phrase.
    if (location.hash != '#' + ackey) return;

/*
# bookmarklet
javascript:(function(){var ackey='qawsedrftgyhujiko';var url='http://delicious.com/save?url='+encodeURIComponent(window.location.href)+'&title='+encodeURIComponent(document.title)+'&v=0&noui=1&jump=doclose#'+ackey;window.open(url,'','width=550,height=320').blur();})()

# menu.ini
[Link Popup Menu]
Item, "save link to delicious"=Go to page, "javascript:(function(){var ackey='qawsedrftgyhujiko';var url='http://delicious.com/save?url='+encodeURIComponent('%l')+'&title='+encodeURIComponent('%t')+'&v=0&noui=1&jump=doclose#'+ackey;if('%l'.indexOf('http')!=0){alert('not a http link.');return;}if(/^javascript:/.test(location.href)){window.blur();location.href=url;}else{window.open(url,'','width=550,height=320').blur();}})()"

[Image Link Popup Menu]
Item, "save link to delicious"=Go to page, "javascript:(function(){var ackey='qawsedrftgyhujiko';var url='http://delicious.com/save?url='+encodeURIComponent('%l')+'&title='+encodeURIComponent('%t')+'&v=0&noui=1&jump=doclose#'+ackey;if('%l'.indexOf('http')!=0){alert('not a http link.');return;}if(/^javascript:/.test(location.href)){window.blur();location.href=url;}else{window.open(url,'','width=550,height=320').blur();}})()"

[Document Popup Menu]
Item, "save to delicious"=Go to page,      "javascript:(function(){var ackey='qawsedrftgyhujiko';var url='http://delicious.com/save?url='+encodeURIComponent('%u')+'&title='+encodeURIComponent('%t')+'&v=0&noui=1&jump=doclose#'+ackey;window.open(url,'','width=550,height=320').blur();})()"

[Hotclick Popup Menu]
Item, "save link to delicious"=Go to page, "javascript:(function(){var ackey='qawsedrftgyhujiko';var url='http://delicious.com/save?url='+encodeURIComponent('%l')+'&title='+encodeURIComponent('%t')+'&v=0&noui=1&jump=doclose#'+ackey;if('%l'.indexOf('http')!=0){alert('not a http link.');return;}if(/^javascript:/.test(location.href)){window.blur();location.href=url;}else{window.open(url,'','width=550,height=320').blur();}})()"

[Link Selection Popup Menu]
Item, "save link to delicious"=Go to page, "javascript:(function(){var ackey='qawsedrftgyhujiko';var url='http://delicious.com/save?url='+encodeURIComponent('%l')+'&title='+encodeURIComponent('%t')+'&v=0&noui=1&jump=doclose#'+ackey;if('%l'.indexOf('http')!=0){alert('not a http link.');return;}if(/^javascript:/.test(location.href)){window.blur();location.href=url;}else{window.open(url,'','width=550,height=320').blur();}})()"

# mouse.ini
[Application]
GestureUp="Go to page,                     "javascript:(function(){var ackey='qawsedrftgyhujiko';var url='http://delicious.com/save?url='+encodeURIComponent('%l')+'&title='+encodeURIComponent('%t')+'&v=0&noui=1&jump=doclose#'+ackey;if('%l'.indexOf('http')!=0){alert('not a http link.');return;}if(/^javascript:/.test(location.href)){window.blur();location.href=url;}else{window.open(url,'','width=550,height=320').blur();}})()""
*/

    function main() {
        var form = document.getElementById('saveitem');
        try { form.submit.removeAttribute('name') } catch(e) {} // boo!
        form.tags.value = '\u3042\u3068\u3067\u8AAD\u3080 '; // set tag [look later].
        var url   = form.url.value;
        var title = form.title.value;
        // avoid default title.
        if (title) {
            if (title == url && !/(?:\?|&)title=[^&]+/.test(location.search)) {
                title = '';
            }
        }
        // -- load title from nicovideo.jp --
        if (url.indexOf('http:\/\/www.nicovideo.jp\/watch\/') == 0) {
            form.tags.value = '\u30CB\u30B3\u30CB\u30B3\u52D5\u753B '; // set tag [niconico douga].
            loadTitleFromNiconico(url, function(data) {
                form.title.value = data.title;
                form.notes.value = data.description;
                form.submit();
            });
            return;
        }
        // -- load title from nicovideo.jp --
        // -- load title from other service --
        if (!title) {
            loadTitle(url, function(data) {
                form.title.value = (data) ? data.title : url;
                form.submit();
            });
            return;
        }
        // -- load title from other service --
        if (!title) form.title.value = url;
        form.submit();
    }
    document.addEventListener('DOMContentLoaded', main, false);
    
    // load title from other service (b.hatena.ne.jp)
    function loadTitle(url, callback) {
        var bak = window.__tmpcallback;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://b.hatena.ne.jp/entry/json/?callback=__tmpcallback&url=' + encodeURIComponent(url);
        window.__tmpcallback = function (data) {
            window.__tmpcallback = bak;
            callback(data);
        };
        document.body.appendChild(s);
    }
    
    // load title from nicovideo.jp
    function loadTitleFromNiconico(url, callback) {
        var video_id = /[a-z]{0,2}[0-9]+(?=\?|#|$)/.exec(url)[0];
        var video_info = 'http://www.nicovideo.jp/api/getthumbinfo/' + video_id;
        crossDomainRequest(video_info, function(xhr) {
            var text = xhr.responseText;
            var title = '', desc = '';
            if (/<error>/.test(text)) {
                var m = text.match(/<code>([^<]*)</);
                title = ((m) ? '[' + m[1] + '] ' : '[DELETED] ') + url;
            }
            else {
                var m = text.match(/<title>([^<]*)</);
                if (m) title = m[1];
                var m = text.match(/<description>([^<]*)</);
                if (m) desc = m[1];
            }
            callback({ title: title, description: desc });
        });
    }
    
    // Cross Domain Request (single access).
    var crossDomainRequest = (function() {
        var script_listener = new Function();
        opera.addEventListener('BeforeScript', function(e) { script_listener(e) }, false);
        return function(url, callback) {
            var s = document.createElement('script');
            s.style.display = 'none';
            s.src = url;
            script_listener = function(e) {
                if (e.element === s) {
                    e.preventDefault();
                    callback({ responseText: e.element.text });
                }
            };
            document.body.appendChild(s);
        }
    })();
    
})()
