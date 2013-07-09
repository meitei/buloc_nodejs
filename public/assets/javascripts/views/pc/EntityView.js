define([
  'jquery',
  'underscore',
  'backbone',
  'views/pc/AbstractView'
], function($, _, Backbone, AbstractView) {
  var EntityView = AbstractView.extend({
    el: '#entityView',
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("EntityView#render");
      var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', 'エンティティ名', '作成日', '更新日'],
        colModel:[
          {name:'_id'},
          {name:'name'},
          {name:'created_at', formatter:'date', formatoptions: dateFormatOps},
          {name:'updated_at', formatter:'date', formatoptions: dateFormatOps}
        ],
        multiselect: false,
        caption: 'エンティティ一覧',
        scrollrows: true
      });

    }
  });
  return EntityView;
});
