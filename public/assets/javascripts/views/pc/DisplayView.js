define([
  'jquery',
  'underscore',
  'backbone',
  'views/pc/AbstractListView'
], function($, _, Backbone, AbstractListView) {
  var DisplayView = AbstractListView.extend({
    el: '#displayView',
    title: 'display',
    render: function() {
      this.constructor.__super__.render.apply(this);
      console.debug("DisplayView#render");
      // var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      var epochDateFormatter = function (cellval, opts) {
          var date = new Date(cellval);
          opts = $.extend({}, $.jgrid.formatter.date, opts);
          return $.jgrid.parseDate("", date, 'Y/m/d H:i:s', opts);
      };
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', '画面名', '作成日', '更新日'],
        colModel:[
          {name:'id'},
          {name:'name'},
          {name:'created_at', formatter:epochDateFormatter},
          {name:'updated_at', formatter:epochDateFormatter}
        ],
        multiselect: false,
        caption: '画面一覧',
        scrollrows: true
      });

    }
  });
  return DisplayView;
});
