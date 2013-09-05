define([
  'backbone',
  'models/Logic'
], function(Backbone, Logic){
  var Entities = Backbone.Collection.extend({
    model: Logic,
    url: '/logics',
    modelName: 'logic',
    parentKeyId: 'app_id'
  });
  return Entities;
});
