define([
  'backbone',
  'models/Display'
], function(Backbone, Display){
  var Displays = Backbone.Collection.extend({
    model: Display,
    url: '/displays',
    modelName: 'display'
  });
  return Displays;
});
