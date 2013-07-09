define([
  'backbone',
  'models/View'
], function(Backbone, View){
  var Views = Backbone.Collection.extend({
    model: View,
    url: '/views',
    modelName: 'view',
    parentKeyId: 'app_id'
  });
  return Views;
});
