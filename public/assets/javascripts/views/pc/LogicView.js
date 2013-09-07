define([
  'jquery',
  'underscore',
  'backbone',
  'views/pc/AbstractListView',
  'jquery.jqGrid'
], function($, _, Backbone, AbstractListView) {
  var LogicView = AbstractListView.extend({
    el: '#logicView',
    title: 'logic',
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("LogicView#render");
      var epochDateFormatter = function (cellval, opts) {
          var date = new Date(cellval);
          opts = $.extend({}, $.jgrid.formatter.date, opts);
          return $.jgrid.parseDate("", date, 'Y/m/d H:i:s', opts);
      };
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', 'ロジック名', '作成日', '更新日'],
        colModel:[
          {name:'id'},
          {name:'name'},
          {name:'created_at', formatter:epochDateFormatter},
          {name:'updated_at', formatter:epochDateFormatter}
        ],
        multiselect: false,
        caption: 'ロジック一覧',
        scrollrows: true
      });

    }
  });
  return LogicView;
});
