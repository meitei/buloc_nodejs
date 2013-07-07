define([
  'backbone',
  'models/Entity'
], function(Backbone, Entity){
  var Entities = Backbone.Collection.extend({
    model: Entity,
    url: '/entities',
    modelName: 'entity'
  });
  return Entities;
});
