define([
  'underscore'
], function(_) {
  // setting of underscore.js
  _.templateSettings.evaluate = /<#([\s\S]+?)#>/g;
  _.templateSettings.interpolate = /<#=([\s\S]+?)#>/g;
  _.templateSettings.escape = /<#-([\s\S]+?)#>/g;

  var JST = {};
  JST['listView'] = _.template('<p><#= title #></p><table id="list"></table><br /><button id="btn_new" class="btn">追加</button><button id="btn_upd" class="btn">修正</button><button id="btn_del" class="btn">削除</button>');
  return JST;
});
