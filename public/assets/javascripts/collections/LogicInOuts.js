define([
  'backbone',
  'models/LogicInOut'
], function(Backbone, LogicInOut){
  var Entities = Backbone.Collection.extend({
    model: LogicInOut,
    url: '/logicInOuts',
    modelName: 'logicInOut',
    parentKeyId: 'logic_id'
  });
  return Entities;
});
