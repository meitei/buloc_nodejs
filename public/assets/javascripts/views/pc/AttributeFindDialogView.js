/* Common Dialogs
-------------------------------------------------- */
define([
  'jquery',
  'underscore',
  'commons/helper',
  'views/pc/AbstractFindDialogView'
], function($, _, Helper, AbstractFindDialogView) {
  var AttributeFindDialogView = AbstractFindDialogView.extend({
    el: "#dialog_find",
    render: function() {
      // _.isUndefined(data) && (data = [])
      console.debug("AttributeFindDialogView#render");
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', '属性名', '説明'],
        colModel:
        [
          {name:'_id'},
          {name:'name'},
          {name:'caption'}
        ],
        multiselect: false,
        caption: '属性一覧',
        scrollrows: true
      });
    }
  });
  return AttributeFindDialogView;
});
