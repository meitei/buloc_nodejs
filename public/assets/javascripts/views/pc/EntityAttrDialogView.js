define([
  'jquery',
  'underscore',
  'commons/helper',
  'views/pc/AbstractDialogView',
  'collections/Attributes',
  'views/pc/AttributeFindDialogView'
], function($, _, Helper, AbstractDialogView, Attributes, AttributeFindDialogView) {
  var EntityAttrDialogView = AbstractDialogView.extend({
    el: '#dialog_entity_attr',
    events: function() {
      var addEvents = {
        "click #dialog_show_find_dialog_attr": "showFindDialogAttrOnClick"
      };
      return $.extend({}, this.constructor.__super__.events, addEvents);
    },
    render: function() {
      // control_type list.
      // var items = {1: 'input', 2: 'select', 3: 'textarea', 4: 'checkbox', 5: 'radio', 6: 'file'};
      // create_select('select#control_type', items);
    },
    showFindDialogAttrOnClick: function(e) {
      e.preventDefault();
      var attrs = new Attributes();
      var findDialog = new AttributeFindDialogView({collection: attrs});
      findDialog.render();
      findDialog.openDialog(null, {
        'id': this.$('#attr_id'),
        'name': this.$('#attr_name')
      });
    },
    openDialog: function(model, options) {
      console.debug('EntityAttrDialogView#openDialog');
      // call super method.
      this.constructor.__super__.openDialog.apply(this, arguments);

      if (!_.isNull(model)) {
        // set attribute name.
        var helper = new Helper();
        var attr_id = model.get('attr_id');
        var attr_name = this.$('#attr_name');
        helper.getAttributeName(attr_id, {
          edit: function(model){
            attr_name.html(model.get('name'));
          }
        });
      }
    }
  });
  return EntityAttrDialogView;
});
