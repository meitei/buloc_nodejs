define([
  'jquery',
  'underscore',
  'backbone',
  'commons/helper',
  'views/pc/AbstractListView'
], function($, _, Backbone, Helper, AbstractListView) {
  var EntityAttrView = AbstractListView.extend({
    el: '#entityAttrs',
    render: function(parent) {
      console.debug('EntityAttrView#render');
      this.constructor.__super__.render.apply(this, arguments);
      var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', '属性名', '作成日', '更新日'],
        colModel:[
          {name:'id'},
          {name:'attr_name'},
          {name:'created_at', formatter:'date', formatoptions: dateFormatOps},
          {name:'updated_at', formatter:'date', formatoptions: dateFormatOps}
        ],
        multiselect: false,
        caption: 'エンティティ内の属性一覧',
        scrollrows: true
      }); 
    },
    fetch: function() {
      console.debug("EntityAttrView#fetch");
      if (!_.isEmpty(this.parent.model)) {
        var parent_id = this.parent.model.get('id');
        var conds = {entity_id: parent_id};
        this.collection.fetch({
          data: {params: conds},
          // reset: true,
          success: function(collection, res, options){
            console.debug("search success!!");

            collection.each(function(model){
              var helper = new Helper();
              helper.getAttributeName(model.get('attr_id'), {
                edit: function(attr){
                  model.set('attr_name', attr.get('name'));
                }
              });
            });
          }
        });
      }
    }
  });
  return EntityAttrView;
});
