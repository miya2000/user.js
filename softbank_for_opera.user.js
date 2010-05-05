// ==UserScript==
// @name           Softbank for Opera users.
// @version        1
// @include        http://mb.softbank.jp/*
// ==/UserScript==
SBM.plugin.history.sync = function(hash) {
    if (hash == this.hash) return false;
    this.hash = hash;
    if (location.hash.slice(1) == hash) return false;
    location.hash = hash;
    return true;
}
