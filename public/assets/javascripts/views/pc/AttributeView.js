define([
  'jquery',
  'underscore',
  'views/pc/AbstractListView'
], function($, _, AbstractListView) {
  var AttributeView = AbstractListView.extend({
    el: '#attributeView',
    title: 'attribute',
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("AttributeView#render");
      // var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      // var epochDateFormatter = function (cellval, opts) {
      //     var date = new Date(cellval);
      //     opts = $.extend({}, $.jgrid.formatter.date, opts);
      //     return $.jgrid.parseDate("", date, 'Y/m/d H:i:s', opts);
      // };
      var dateFormatter = this.helper.format.epochDateFormatter($);

      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', '属性名', '説明', '作成日', '更新日'],
        colModel:[
          {name:'id'},
          {name:'name'},
          {name:'caption'},
          {name:'created_at', formatter:dateFormatter},
          {name:'updated_at', formatter:dateFormatter}
        ],
        multiselect: false,
        caption: '属性一覧',
        scrollrows: true
      });

    }
  });
  return AttributeView;
});
