define([
  'jquery',
  'underscore',
  'backbone',
  'views/pc/AbstractListView'
], function($, _, Backbone, AbstractListView) {
  var EntityView = AbstractListView.extend({
    el: '#entityView',
    title: 'entity',
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
          {name:'id'},
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
