// ==UserScript==
// @name livedoor reader to fastladder
// @author miya2000
// @version 1.0.0
// @include http://reader.livedoor.com/reader/
// ==/UserScript==
(function(){
    
    var favicon = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55o2%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BeaNv8AAAAA5JAh%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F5ZQq%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2B66df%2Fihw%2F%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2B%2B9e%2F%2F%2F%2F%2F%2F%2F4ocP%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2BKHD%2F%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BOMGv%2Fnmzj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fut2%2F%2F7LJm%2F%2BywYv%2Fqp0%2F%2F5pk0%2F%2BKJE%2F%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F5I8f%2F%2BmkSf%2Fssmb%2F7LJm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F7rdv%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F6J4%2B%2F%2BB%2FAP%2FgfwD%2F4IEE%2F%2ByxZf%2Fssmb%2F7LJm%2F%2ByyZv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Frq1n%2F4H8A%2F%2BGCBv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F7LJm%2F%2BB%2FAP%2Fhggb%2F7LJm%2F%2ByyZv%2Fssmb%2F7LJm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F7rdv%2F%2ByyZv%2Fssmb%2F7LJm%2F%2FXUqv%2Fssmb%2F7LJm%2F%2ByyZv%2FgfwD%2F4YIG%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2F%2B%2Ffv%2F%2F%2F%2F%2F%2F%2B63b%2F%2Fssmb%2F7LJm%2F%2FTUqf%2F%2F%2F%2F%2F%2F7LJm%2F%2ByyZv%2Fssmb%2F4H8A%2F%2BGCBv%2Fssmb%2F7LJm%2F%2ByyZv%2F11q7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2ByyZv%2Fssmb%2F7LJm%2F%2BB%2FAP%2Fhggb%2F7LJm%2F%2ByyZv%2F117D%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fssmb%2F7LJm%2F%2ByyZv%2FgfwD%2F4IEF%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F4H8A%2F%2BSOHv%2FooUT%2F7LJm%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F7LJm%2F%2ByyZv%2Fssmb%2F6KBC%2F%2BSRJP8AAAAA5JEk%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BB%2FAP%2FgfwD%2F4H8A%2F%2BWTJ%2F8AAAAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA%3D%3D';
    var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAAAYCAMAAAAIy3WQAAAAclBMVEX%2F%2F%2F%2Fm7fKDp76mpqb09PRFfJ5sl7JAQED9%2Ff76%2B%2FswbZPZ2dm0tLTPz8%2Fw8%2FRWVlbDw8N5eXlmZmbl5eVPg6PM2%2BWrxNPr8fWfu83Y4%2Bvz9vl7orpfjqtKSkqHh4eZmZm1y9g6dJi%2F0t7s7OyPsMV1nbdzD1m9AAAAAXRSTlMAQObYZgAAAvVJREFUGNPNj9uSozAMRMXVYMwdHCAEQsL%2B%2Fy%2BuLDAxmZCZrdqpSj9gtdpIxxBdmKECfizOef8m7jDvHtZC%2B3ZclH4EBkQ%2FxQiFEOGvYbi4Po5Qccry7y66v4qxTC%2FTj8CAcvgIDAjUJyzNNIqSbzE6yxwYtG1nYlitiRHUUrbPzF%2Bmu2PBWOq4QogQ3XDBNI0xGNmi8RmjmyvOvaaTUtIj5onzyT6tGMHsYTprDEqxUeN%2FvaosaO3KXzFIiqUslrogH6yOOccYVsVJ1bLo1D9st7dGynmzclgNfs5PGNvexWf4TQfVK48wwopvmnBA%2F7CIsbN428fDn23VvSHHhDP4Cwy1Ny8hyhfvMDbgDSRw1osuwB5DqsEttP6CcVVDLbD%2BLBg3I0UMZa%2Fq55nzCo%2BJ4O02WKfHEQoNrs%2FVtbCglYKxtEQXRfcjjH45qEAMXO%2BT9QnDN1JOTZtsUHHeLhheu8wzp1%2BQiIqMmgl6NsTw9aLGCPCoydeE4WnbEoZnpJxS3yYhhlww6q%2FTAywTsxkrDpaO9yOMDo8T%2BZAwJm2BMLa0IwxuaqbbZ3jxyA3jvjZdURDI%2FQADl3NLL5rovZamQoxJ24QwJhPjTL5%2BhYE7MyqyRzNxLoyNBxhq75X8jTB6zqW2iNEbKWJU2q7aKJ%2Bmj4wVqk5S1bwLEauuYGw4wrA5rzo8u4owGs49bRFjNlLEUPakfg6klMkxRokPT0UkFAVzQ3RigRtVir1hGLIdRoujKtlKtQcxOg85mlrioTASTD25WgCLK3tKbj2e4TEGZOwhFxz8pgXCsFiFBJcHOwyQfBNiwE3XhLGz%2B8s3eIMBGe0qogs1h5VopEy5PIQNw6fiqlbwvp5oEdQV2XYiDKi9Xao5pus6Y8NQb35gQBgJJw4hcVLVzPKCpXm2ZqVwNAVUGgOCWso6gFPjLR5tC9A1Xke2JatTqzlXvd8kZGzb7sDgMDA2BSG8k%2BVpjMcLngYE79IXclz4d1meD58gy%2F5vo%2F4CkoVF40s83AQAAAAASUVORK5CYII%3D';
    
    // Can I set this preference on any page?
    window.Language = 'English';
    
    // simple version of $X
    // $X(exp);
    // $X(exp, context);
    // @source https:/raw.github.com/gist/3242
    function $X (exp, context) {
        context || (context = document);
        var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
            return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
                context.namespaceURI || document.documentElement.namespaceURI || "";
        });

        var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
            switch (result.resultType) {
                case XPathResult.STRING_TYPE : return result.stringValue;
                case XPathResult.NUMBER_TYPE : return result.numberValue;
                case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                    // not ensure the order.
                    var ret = [], i = null;
                    while (i = result.iterateNext()) ret.push(i);
                    return ret;
            }
        return null;
    }
    
    function addStyle(styleStr) {
        var style = document.createElement('style');
        style.type = 'text/css';
        styleStr = '\n' + styleStr.replace(/(^\s*|\s*$)/, '') + '\n';
        if (style.styleSheet) { style.styleSheet.cssText = styleStr; } else { style.textContent = styleStr; }
        var container = document.getElementsByTagName('head')[0];
        if (!container) container = document.body || document.documentElement;
        container.appendChild(style);
        return style;
    }
    
    /** translate script content */
    function translateScript(e) {
        var src = e.element.src;
        var text = e.element.text;
        if (/reader_main\.[\d.]*\.js/.test(src)) {
            text = text.replace('未読 [[feed_count]]フィード', '[[feed_count]] feeds');
            text = text.replace('[[count]]エントリ', '[[count]] items');
            text = text.replace('ランキング', 'Ranking');
            text = text.replace('設定変更', 'Settings');
            text = text.replace('フィードの整理', 'Edit Subscription list');
            text = text.replace('本文の表示 / 非表示の切替', 'Expanded view / List view');
            text = text.replace('新着順 / 旧着順表示の切替', 'Toggle order');
            text = text.replace('全て読んだことにする', 'Mark all feeds as read');
            text = text.replace('既読にしました', 'Marked as read');
            text = text.replace('最後だよ', 'Last dayo');
            text = text.replace('人', 'users');
            text = text.replace('読み込みを中断しました', 'Loading interrupted');
            text = text.replace('ロード中', 'Loading');
            text = text.replace('ロード完了', 'Loading completed.');
            text = text.replace('livedoor Reader ([[count]])', 'Fastladder ([[count]])');
            e.element.text = text;
        }
        if (/reader_widgets\.[\d.]*\.js/.test(src)) {
            text = text.replace('投稿:', 'posted:');
            text = text.replace('更新:', 'updated:');
            text = text.replace('>登録</a>:', '>add</a>');
            text = text.replace('新着', 'Updated');
            text = text.replace('過去', 'Archived');
            text = text.replace('フィード詳細', 'about feed');
            text = text.replace('既読にする', 'mark as read');
            e.element.text = text;
        }
        if (/reader_addon\.[\d.]*\.js/.test(src)) {
            // skip English mode(?) layout adjustment.
            text = text.replace(/Language == 'English'/g, 'false');
            e.element.text = text;
        }
    }
    opera.addEventListener('BeforeScript', translateScript, false);
    
    /** translate DOM element's text content */
    function translateDOM() {
        replaceTextContent($X('//text()[contains(.,"マイフィード")]'), 'マイフィード', 'My feeds'); // "." means "self::node()"
        replaceTextContent($X('//text()[contains(.,"ヘッドラインモード")]'), 'ヘッドラインモード', 'Headline');
        replaceTextContent($X('//text()[contains(.,"更新")]'), '更新', 'Reload');
        replaceTextContent($X('//text()[contains(.,"編集")]'), '編集', 'Edit');
        replaceTextContent($X('//text()[contains(.,"追加")]'), '追加', 'Add');
        replaceTextContent($X('//text()[contains(.,"その他")]'), 'その他', 'Others');
        replaceTextContent($X('//text()[contains(.,"設定変更")]'), '設定変更', 'Settings');
        replaceTextContent($X('//text()[contains(.,"ガイド")]'), 'ガイド', 'Guide');
        replaceTextContent($X('//text()[contains(.,"ログアウト")]'), 'ログアウト', 'Logout');
        replaceTextContent($X('id("welcome")'), 'ようこそ、', 'Welcome ');
        replaceTextContent($X('id("welcome")'), /さん\s+/, '');
        replaceTextContent($X('id("my_menu")'), /\s+｜\s+/g, '｜');
        replaceTextContent($X('//text()[contains(.,"過去記事を表示")]'), '過去記事を表示', 'Older');
        replaceTextContent($X('//text()[contains(.,"新しい記事を表示")]'), '新しい記事を表示', 'Newer');
        replaceTextContent($X('//text()[contains(.,"元記事")]'), '元記事', 'Permalink');
    }
    
    function replaceTextContent(nodes, reg, replace) {
        if (typeof reg == 'string') { reg = new RegExp(reg, 'g'); }
        for (var i = 0, ele; ele = nodes[i]; ++i) {
            if (ele.nodeType == 3) {
                ele.textContent = ele.textContent.replace(reg, replace);
            }
            else if (ele.nodeType == 1) {
                replaceTextContent(ele.childNodes, reg, replace);
            }
        }
    }
    
    /** translate templates */
    function translateTMPL() {
        ItemFormatter.TMPL = Template.get("inbox_items");
    }
    
    var stylesheet = null;
    function main() {
        // <link rel="shortcut icon" href="favicon.ico">
        var link = document.createElement('link');
        link.rel = 'icon';
        link.href = favicon;
        document.querySelector('head').appendChild(link);
        
        // hide header bar.
        stylesheet = addStyle('#header { display: none; } #ads_bottom { background-color: white; } #ads_bottom a { padding-left: 12px; } ');
        document.getElementById('reader_logo').innerHTML = '<a href="/reader/" target="_self"><img src="' + logo + '" alt="livedoor Reader"></a>';
        
        // replace unread count.
        var unread_count = document.getElementById('total_unread_count');
        unread_count.style.cssText = 'font-size:12px; position:absolute; right: 70px; top: 6px;';
        var control_buttons = document.getElementById('control_buttons');
        control_buttons.parentNode.insertBefore(unread_count, control_buttons.nextSibling);
        
        // remove balloon.
        var messageContainer = $X('id("message")/..')[0];
        if (messageContainer) {
            messageContainer.style.border = 'none';
            var leftBalloon = messageContainer.previousElementSibling.querySelector('img');
            if (leftBalloon) {
                leftBalloon.style.display = 'none';
                leftBalloon.parentNode.appendChild(document.createTextNode('<'));
            }
            var rightBalloon = messageContainer.nextElementSibling.querySelector('img');
            if (rightBalloon) {
                rightBalloon.style.display = 'none';
            }
            var stickman = $X('id("loadicon")')[0];
            if (stickman) {
                stickman.style.marginBottom = '6px';
            }
        }
        
        // adjust menu height.
        document.getElementById('menu').style.height = '30px';
        
        translateDOM();
        translateTMPL();
    }
    document.addEventListener('DOMContentLoaded', main, false);
})()

