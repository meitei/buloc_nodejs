define([
  'jquery',
  'underscore',
  'backbone',
  'commons/helper',
  'views/pc/AbstractListView'
], function($, _, Backbone, Helper, AbstractListView) {
  var View = AbstractListView.extend({
    el: '#logicInOutView',
    editable: true,
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("LogicInOutView#render");
      // var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      // var dateFormatOps = {srcformat: 'ISO8601Long',newformat: 'Y/m/d h:i:s'};

      // var epochDateFormatter = function (cellval, opts) {
      // };
      // var helper = new Helper();
      var dateFormatter = this.helper.format.epochDateFormatter($);

      function autocomplete_element(value, options) {
          // create input element
        var $ac = $('<input type="text" style="width:100px" />');
        // setting value to the one passed from jqGrid
        $ac.val(value);
        // creating autocomplete
        $ac.autocomplete(
          {
            source: ["1:社員コード", "2:社員名", "3:住所１", "4:住所２"]
            
          }
        );
        // returning element back to jqGrid
        return $ac.get(0); 

      }
     
      function autocomplete_value(elem, op, v) {
        if (op == 'set') {
          $(elem).val(v);
        }
        return $(elem).val();
      }

      this.list.jqGrid({
        data: [],
        width: 750,
        datatype: "local",
        colNames:['コード', '順序', 'IN/OUT', '属性コード','属性名', '作成日', '更新日'],
        colModel:[
          {name:'id', width: 80},
          {name:'seq', width: 50},
          {
            name:'inout',
            editable:true,
            width: 90,
            edittype:'select',
            // cellattr: function(rowId, val, rawObject, cm, rdata, name){
            //   return 'style="vertical-align: middle"';
            // },
            editoptions:{
              value:'1:IN;2:OUT',
              dataInit: function(el) {
                $(el).width(60);
              }
            }
          },
          {name:'attr_id', width: 100},
          {
            name:'attr_name',
            width:150,
            editable:true,
            edittype:'custom',
            editoptions:{
              // dataInit: function(el) {
              //   $(el).width(100);
              // }
              'custom_element': autocomplete_element, 
              'custom_value': autocomplete_value
            }
          },
          {name:'created_at', formatter:dateFormatter},
          {name:'updated_at', formatter:dateFormatter}
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
