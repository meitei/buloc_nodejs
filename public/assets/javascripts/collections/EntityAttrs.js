define([
  'backbone',
  'models/EntityAttr'
], function(Backbone, EntityAttr){
  var EntityAttrs = Backbone.Collection.extend({
    model: EntityAttr,
    url: '/entity_attrs',
    modelName: 'entity_attr'
    // createAll: function (parentModel) {
    //     var self = this;
    //     var parent_id = parentModel.get('id');
    //     $.each(self.models, function() {
    //       var model = this;
    //       model.set({entity_id: parent_id});
    //     });
    //     options = {
    //         success: function(models) {
    //             self.reset(models);
    //         }
    //     };
    //     return this.sync('create', this, options);
    // }
  });
  return EntityAttrs;
});
