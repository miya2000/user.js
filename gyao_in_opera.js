// ==UserScript==
// @name GyaO - GyaO in Opera
// @description Open GyaO movie directly.
// @version 1.1.0
// @include http://www.gyao.jp/*
// @exclude http://*http://*
// ==/UserScript==
(function() {

    // alert off
    window.opera.addEventListener('BeforeScript', function (e) {
        var ev = e.element.getAttribute('event');
        if ( ev && ev.toLowerCase() == 'click()' ) {
            e.preventDefault();
        }
    }, false );

    // overwrite browser determine.
    window.opera.defineMagicVariable('canPlay', function() { return true }, null);

    // remove 'showRecommend'.
    window.opera.defineMagicFunction('showRecommend', function(){});

    // open asx directly.
    if (/sityou/.test(location.href)) {
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
})()

