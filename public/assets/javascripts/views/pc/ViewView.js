define([
  'jquery',
  'underscore',
  'backbone',
  'views/pc/AbstractView'
], function($, _, Backbone, AbstractView) {
  var ViewView = AbstractView.extend({
    el: '#viewView',
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("ViewView#render");
      var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', 'ビュー名', '作成日', '更新日'],
        colModel:[
          {name:'_id'},
          {name:'name'},
          {name:'created_at', formatter:'date', formatoptions: dateFormatOps},
          {name:'updated_at', formatter:'date', formatoptions: dateFormatOps}
        ],
        multiselect: false,
        caption: 'ビュー一覧',
        scrollrows: true
      });

    }
  });
  return ViewView;
});
