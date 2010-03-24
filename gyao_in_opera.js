// ==UserScript==
// @name GyaO - GyaO in Opera
// @description Open GyaO movie directly.
// @version 1.2.0
// @include http://www.gyao.jp/*
// @include http://hot.gyao.jp/*
// @include http://utauga.jp/karaoke/*
// @exclude http://*http://*
// @exclude http://*http%3A%2F%2F*
// ==/UserScript==
(function() {

    // ignore "event" script
    window.opera.addEventListener('BeforeScript', function (e) {
        var ev = e.element.getAttribute('event');
        if (ev) {
            e.preventDefault();
        }
    }, false );

    // overwrite browser determine.
    window.opera.defineMagicVariable('canPlay', function() { return true }, null);

    // do nothing on 'showRecommend'.
    window.opera.defineMagicFunction('showRecommend', function(){});

    // avoid cloaking.
    document.all = true;

    //=== www.gyao.jp ===
    if (/http:\/\/www\.gyao\.jp\/sityou\/movie\//.test(location.href)) {
        window.opera.defineMagicFunction('createWmpObject',
            function(orgFunc, orgThis, ID, WIDTH, HEIGHT, URL, UIMODE, STRETCHTOFIT, PLAYCOUNT, VOLUME) {
                if (window.opener) {
                    window.close();
                    var pD = window.opener.document;
                    var iframe = pD.createElement('iframe');
                    iframe.src = URL;
                    iframe.style.display = 'none';
                    pD.body.appendChild(iframe);
                }
                else {
                    location.href = URL;
                }
            }
        );
    }

    //=== hot.gyao.jp ===
    if (/http:\/\/hot\.gyao\.jp\/sityou\/catedetail\/contents_id\//.test(location.href)) {
        window.opera.defineMagicFunction('createWmpObject',
            function(orgFunc, orgThis, ID, WIDTH, HEIGHT, URL, UIMODE, STRETCHTOFIT, PLAYCOUNT, VOLUME) {
                var iframe = document.createElement('iframe');
                iframe.src = URL;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
            }
        );
    }

    //=== utauga.jp ===
    if (/^http:\/\/utauga\.jp\/karaoke\//.test(location.href)) {
        window.opera.defineMagicFunction('changeMedia',
            function(orgFunc, orgThis, id, viewRank) {
                var iframe = document.getElementById('wmviFrame');
                var URL='/karaoke/asx.php?id='+id+'&log=0';
                iframe.src = URL;
                if (viewRank) {
                    var rank=document.getElementById('rankiFrame');
                    rank.src="/karaoke/play/play.php?id="+id;
                }
            }
        );
    }
    if (/^http:\/\/utauga\.jp\/karaoke\/(index\.php)?\?/.test(location.href)) {
        var m;
        if (m = /contents_id=([^&]+)/.exec(location.search)) {
            var contents_id = m[1];
            document.addEventListener('load', function() { changeMedia(contents_id); }, false);
        }
    }
    if (/^http:\/\/utauga\.jp\/karaoke\/wmv\.php/.test(location.href)) {
        window.opera.defineMagicFunction('createWmpObject', function(){});
    }
})()
