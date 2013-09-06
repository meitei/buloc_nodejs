define([
  'jquery',
  'underscore',
  'backbone',
  'views/pc/AbstractListView'
], function($, _, Backbone, AbstractListView) {
  var LogicView = AbstractListView.extend({
    el: '#logicView',
    title: 'logic',
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("LogicView#render");
      var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', 'ロジック名', '作成日', '更新日'],
        colModel:[
          {name:'id'},
          {name:'name'},
          {name:'created_at', formatter:'date', formatoptions: dateFormatOps},
          {name:'updated_at', formatter:'date', formatoptions: dateFormatOps}
        ],
        multiselect: false,
        caption: 'ロジック一覧',
        scrollrows: true
      });

    }
  });
  return LogicView;
});
