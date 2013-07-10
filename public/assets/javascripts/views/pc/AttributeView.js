define([
  'underscore',
  'jquery.jqGrid',
  'views/pc/AbstractView'
], function(_, $, AbstractView) {
  var AttributeView = AbstractView.extend({
    el: '#attributeView',
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("AttributeView#render");
      var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', '属性名', '説明', '作成日', '更新日'],
        colModel:[
          {name:'id'},
          {name:'name'},
          {name:'caption'},
          {name:'created_at', formatter:'date', formatoptions: dateFormatOps},
          {name:'updated_at', formatter:'date', formatoptions: dateFormatOps}
        ],
        multiselect: false,
        caption: '属性一覧',
        scrollrows: true
      });

    }
  });
  return AttributeView;
});
