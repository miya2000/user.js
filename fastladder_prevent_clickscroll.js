// ==UserScript==
// @name fastladder - prevent click scroll.
// @description prevent scroll on click feed.
// @author miya2000
// @namespace http://d.hatena.ne.jp/miya2000/
// @version 1.0.0
// @inclide http://fastladder.com/reader/
// @inclide http://reader.livedoor.com/reader/
// ==/UserScript==
 
(function() {
    var set_focus = function(orgFunc, orgThis, id) {
        var replaced = eval('(' + orgFunc.toString().replace('var sc ', 'if (window.event && window.event.type == "click") return; var sc ') + ')');
        set_focus = function(orgFunc, orgThis, id) {
            replaced.call(orgThis, id);
        };
        set_focus.apply(null, arguments);
    };
    opera.defineMagicFunction('set_focus', function() {
        set_focus.apply(null, arguments);
    });
})()
 
/*
function set_focus(id){
  var el = $("subs_item_"+id);
  if(State.last_element){
    removeClass(State.last_element, "fs-reading");
    touch(State.last_id, "onclose");
  }
  if(el){
    State.last_element = el;
    State.last_id = id;
    switchClass(el, "fs-reading");
    if(Config.view_mode != "flat"){
      var tvroot = QueryCSS.findParent(function(){
        return /^treeview/.test(this.id)
      },el);
      tv = TreeView.get_control(tvroot.id);
      tv && tv.open()
    }
    var sc = $("subs_container");
    sc.scrollTop = el.offsetTop - $("subs_container").offsetTop - 64;
    sc.scrollLeft = 0;
  }
  // window.status = "sid = " + id;
}
*/

