define([
  'backbone',
  'models/ViewAttr'
], function(Backbone, ViewAttr){
  var ViewAttrs = Backbone.Collection.extend({
    model: ViewAttr,
    url: '/view_attrs',
    modelName: 'view_attr'
    // createAll: function (parentModel) {
    //     var self = this;
    //     var parent_id = parentModel.get('id');
    //     $.each(self.models, function() {
    //       var model = this;
    //       model.set({view_id: parent_id});
    //     });
    //     options = {
    //         success: function(models) {
    //             self.reset(models);
    //         }
    //     };
    //     return this.sync('create', this, options);
    // }
  });
  return ViewAttrs;
});
