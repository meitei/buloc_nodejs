define([
  'backbone',
  'models/Attribute'
], function(Backbone, Attribute){
  var Attributes = Backbone.Collection.extend({
    model: Attribute,
    url: '/attributes',
    modelName: 'attribute',
    parentKeyId: 'app_id'
  });
  return Attributes;
});
