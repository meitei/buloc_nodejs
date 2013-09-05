/* Define LogicInOut
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Model = AbstractModel.extend({
    urlRoot: '/logicInOuts',
    name: 'logicInOut',
    constraints: {attr_id: {required: true}}
  });
  return Model;
});
