define([
  'jquery',
  'underscore',
  'backbone',
  'views/pc/AbstractListView'
], function($, _, Backbone, AbstractListView) {
  var View = AbstractListView.extend({
    el: '#logicInOutView',
    editable: true,
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("LogicInOutView#render");
      var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', '順序', 'IN/OUT', '属性名', '作成日', '更新日'],
        colModel:[
          {name:'id'},
          {name:'seq'},
          {
            name:'inout',
            editable:true,
            width: 100,
            edittype:'select',
            editoptions:{value:'1:IN;2:OUT'}
          },
          {name:'attr_name', editable:true},
          {name:'created_at', formatter:'date', formatoptions: dateFormatOps},
          {name:'updated_at', formatter:'date', formatoptions: dateFormatOps}
        ],
        multiselect: false,
        caption: '入出力一覧',
        scrollrows: true,
        cellEdit: true,
        cellsubmit: 'clientArray',
        grouping: true,
        groupingView : { 
          groupField : ['inout'],
          groupSummary : [true]
        }

      });

    }
  });
  return View;
});
