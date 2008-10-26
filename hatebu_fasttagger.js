// ==UserScript==
// @name        hatebu - fasttagger
// @description improve rendering speed on "add" or "edit" bookmark page.
// @author      miya2000
// @namespace   http://d.hatena.ne.jp/miya2000/
// @include     http://b.hatena.ne.jp/add?*
// @include     http://b.hatena.ne.jp/*/edit?*
// ==/UserScript==
/*
 * $Date:: 2008-02-10 10:51:13 +0900#$
 */
(function() {

    // == stress test == //
    var TEST = false;
    var ORG = false;
    if (TEST) {
        document.addEventListener('DOMContentLoaded', function() {
            for (var i = 0; i < 5000; i++) {
                tags.push('hoge' + i);
            }
        }, false);
    }
    if (ORG) return;

    // == options == //
    var ALWAYS_HIDE_USERTAG = true;

    function createTagsElement(tags, idPrefix) {
        var currentTags = window.addedTags;
        var dv = document.createElement('div');
        var s = [];
        for (var i = 0; i < tags.length; i++) {
            var tagName = tags[i];
            var className = 'hatebu_tag';
            for (var j = 0; j < currentTags.length; j++) {
                if (currentTags[j] == tagName) {
                    className += ' hatebu_tag_add';
                    break;
                }
            }
            s.push('<span id="' + idPrefix + i + '" class="' + className + '">' + tags[i] + '</span> ');
        }
        dv.innerHTML = s.join('');
        dv.addEventListener('mousedown', function(e) {
            var t = e.target;
            if (t.nodeName != 'SPAN') return;
            if (isAdded(t.innerHTML)) {
                removeTag(t.innerHTML);
            }
            else {
                addTag(t.innerHTML);
            }
            updateAllTagsLists();
        }, false);
        dv.addEventListener('mouseup', function(e) {
            var t = e.target;
            if (t.nodeName != 'SPAN') return;
            if (window.isMSIEorGecko) {
                if (isAdded(t.innerHTML)) {
                    var pos = commentInput.value.match(/((\[[^\[\]]+?\])*)/)[0].length;
                    moveCaret(commentInput, pos);
                    commentInput.focus();
                }
                else {
                    var pos = commentInput.value.match(/((\[[^\[\]]+?\])*)/)[0].length;
                    moveCaret(commentInput, pos);
                    commentInput.focus();
                }
            }
        }, false);
        return dv;
    }

    window.opera.defineMagicFunction('appendUserTagsList',
        function(orgFunc, orgThis) {
            var tags = window.tags;
            if (tags.length==0) return;
            var div = document.createElement("div");
            with(div.style) {
                width = "100%";
                lineHeight = "140%";
                marginTop = "10";
            }
            var titleDiv = document.createElement("div");
            titleDiv.style.fontSize = "10pt";
            titleDiv.style.fontWeight = "bold";
            if (!ALWAYS_HIDE_USERTAG) {
                titleDiv.appendChild(document.createTextNode("\u30BF\u30B0"));
                div.appendChild(titleDiv);
                var tagsElement = createTagsElement(tags, 'tag');
                div.appendChild(tagsElement);
            }
            else {
                titleDiv.innerHTML = '\u30BF\u30B0 <button style="margin-left: 1em; line-height: 1;">\u8868\u793A</button>';
                div.appendChild(titleDiv);
                var tagsElement = null;
                titleDiv.lastChild.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (!tagsElement) {
                        tagsElement = createTagsElement(tags, 'tag');
                        div.appendChild(tagsElement);
                        return;
                    }
                    if (tagsElement.style.display == 'none') {
                        tagsElement.style.display = '';
                    }
                    else {
                        tagsElement.style.display = 'none';
                    }
                }, false);
            }
            userTagsListDiv.appendChild(div);
        }
    );

    window.opera.defineMagicFunction('appendOtherTagsList',
        function(orgFunc, orgThis) {
            var tags = window.otherTags;
            if (tags.length==0) return;
            var div = document.createElement("div");
            with(div.style) {
                width = "100%";
                lineHeight = "140%";
                marginTop = "10";
            }
            var titleDiv = document.createElement("div");
            titleDiv.style.fontSize = "10pt";
            titleDiv.style.fontWeight = "bold";
            titleDiv.appendChild(document.createTextNode("\u304A\u3059\u3059\u3081\u30BF\u30B0"));
            div.appendChild(titleDiv);
            var tagsElement = createTagsElement(tags, 'otherTag');
            div.appendChild(tagsElement);
            otherTagsListDiv.appendChild(div);
        }
    );

    window.opera.defineMagicFunction('appendKeywordsList',
        function(orgFunc, orgThis) {
            var tags = window.keywords;
            if (tags.length==0) return;
            var div = document.createElement("div");
            with(div.style) {
                width = "100%";
                lineHeight = "140%";
                marginTop = "10";
            }
            var titleDiv = document.createElement("div");
            titleDiv.style.fontSize = "10pt";
            titleDiv.style.fontWeight = "bold";
            titleDiv.appendChild(document.createTextNode("\u30AD\u30FC\u30EF\u30FC\u30C9"));
            div.appendChild(titleDiv);
            var tagsElement = createTagsElement(tags, 'keyword');
            div.appendChild(tagsElement);
            keywordsListDiv.appendChild(div);
        }
    );


    window.opera.defineMagicFunction('updateAllTagsLists',
        function(orgFunc, orgThis) {
            if (updateAddedTags()) {
                var currentTags = window.addedTags;
                var currentElements = document.evaluate('\/\/span[contains(@class,"hatebu_tag_add")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var unselectTargets = [];
                for (var i = 0, len = currentElements.snapshotLength; i < len; i++) {
                    unselectTargets.push(currentElements.snapshotItem(i));
                }
                UNSELECT_LOOP:
                for (var i = 0; i < unselectTargets.length; i++) {
                    var tagName = unselectTargets[i].innerHTML;
                    for (var j = 0; j < currentTags.length; j++) {
                        if (currentTags[j] == tagName) {
                            continue UNSELECT_LOOP;
                        }
                    }
                    unselectTag(unselectTargets[i]);
                }
                for (var i = 0; i < tags.length; i++) {
                    var tagName = tags[i];
                    for (var j = 0; j < currentTags.length; j++) {
                        if (currentTags[j] == tagName) {
                            selectTag(document.getElementById("tag"+i));
                            break;
                        }
                    }
                }
                for (var i = 0; i < otherTags.length; i++) {
                    var tagName = otherTags[i];
                    for (var j = 0; j < currentTags.length; j++) {
                        if (currentTags[j] == tagName) {
                            selectTag(document.getElementById("otherTag"+i));
                            break;
                        }
                    }
                }
                for (var i = 0; i < keywords.length; i++) {
                    var tagName = keywords[i];
                    for (var j = 0; j < currentTags.length; j++) {
                        if (currentTags[j] == tagName) {
                            selectTag(document.getElementById("keyword"+i));
                            break;
                        }
                    }
                }
            }
        }
    );

    window.opera.defineMagicFunction('getNormalizedTags',
        (function() {
            var dv = document.createElement('div');
            return function(orgFunc, orgThis, target) {
                var newTags = new Array();
                for (var i = 0, len = target.length; i < len; i++) {
                    dv.innerHTML = target[i];
                    newTags.push(dv.textContent);
                }
                return newTags;
            }
        })()
    );

    window.opera.defineMagicFunction('unselectTag',
        function(orgFunc, orgThis, tag) {
            if (!tag) return;
            if (/\bhatebu_tag_add\b/.test(tag.className)) {
                tag.className = tag.className.replace(/\bhatebu_tag_add\b/g, '');
            }
        }
    );

    window.opera.defineMagicFunction('selectTag',
        function(orgFunc, orgThis, tag) {
            if (!tag) return;
            if (!/\bhatebu_tag_add\b/.test(tag.className)) {
                tag.className = tag.className + ' hatebu_tag_add';
            }
        }
    );

    window.opera.defineMagicFunction('tag_suggest_init',
        function(orgFunc, orgThis) {

            commentInput = document.getElementById("comment");
            candidatesListDiv = document.getElementById("candidates_list");
            candidatesListDiv.style.height = "40px";
            userTagsListDiv = document.getElementById("tags_list");
            otherTagsListDiv = document.getElementById("othertags_list");
            keywordsListDiv = document.getElementById("keywords_list");
            
            updateAddedTags();
            
            if (window["otherTags"]) {
                otherTags = getNormalizedTags(otherTags);
                appendOtherTagsList();
            }
            if (window["tags"]) {
                tags = getNormalizedTags(tags);
                tags_lower = getLowerTags(tags);
                appendUserTagsList();
            }
            if (window["keywords"]) {
                keywords = getNormalizedTags(keywords);
                appendKeywordsList();
            }
            
            commentInput.setAttribute( "autocomplete", "off" );
            commentInput.onkeydown = onKeyDownHandler;
            commentInput.onkeypress = onKeyPressHandler;
            commentInput.onkeyup = onKeyUpHandler;
            
            var editForm = document.getElementById("edit_form");
            editForm.onsubmit = function() {
                if (candidatesListDiv.firstChild)
                    return false;
                disableSubmit(editForm);
            }
        }
    );

    document.addEventListener('DOMContentLoaded', function(e) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.style.display = 'none';
        style.textContent = [
            '.hatebu_tag       { background-color: white; color: #777777; padding: 1px 4px; font-size: 10pt; font-family: sans-serif; cursor: pointer; }',
            '.hatebu_tag:hover { background-color: #eeeeee; }',
            '.hatebu_tag_add   { background-color: #dddddd !important; color: black; }',
            '.hatebu_tag_add:hover { background-color: #dddddd !important; }',
        ].join('\n');
        document.documentElement.appendChild(style);
    }, false);

})()

