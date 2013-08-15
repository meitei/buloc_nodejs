define([
  'jquery',
  'underscore',
  'backbone',
  'commons/helper',
  'views/pc/AbstractView'
], function($, _, Backbone, Helper, AbstractView) {
  var ViewAttrView = AbstractView.extend({
    el: '#viewAttrs',
    render: function(parent) {
      // this.parent = parent;
      console.debug('ViewAttrView#render');
      console.debug('arguments =>');
      console.debug(arguments);
      this.constructor.__super__.render.apply(this, arguments);
      // console.debug("ViewAttrView#render");
      console.debug(parent);
      var dateFormatOps = {srcformat: 'Y-m-dTH:i:s',newformat: 'Y/m/d h:i:s'};
      this.list.jqGrid({
        data: [],
        width: 650,
        datatype: "local",
        colNames:['コード', '属性名', 'コントロール', '作成日', '更新日'],
        colModel:[
          {name:'id'},
          {name:'attr_name'},
          {name:'control_type'},
          {name:'created_at', formatter:'date', formatoptions: dateFormatOps},
          {name:'updated_at', formatter:'date', formatoptions: dateFormatOps}
        ],
        multiselect: false,
        caption: 'ビュー内の属性一覧',
        scrollrows: true
      }); 
    },
    fetch: function() {
      console.debug("ViewAttrView#fetch");
      if (!_.isEmpty(this.parent.model)) {
        console.debug(this.parent.model);
        var parent_id = this.parent.model.get('_id');
        console.debug('parent_id->' + parent_id);
        var conds = {view_id: parent_id};
        this.collection.fetch({
          data: {params: conds},
          // reset: true,
          success: function(collection, res, options){
            console.debug("search success!!");

            collection.each(function(model){
              var helper = new Helper();
              console.debug('attr_id=>');
              console.debug(model.get('attr_id'));
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
  return ViewAttrView;
});
