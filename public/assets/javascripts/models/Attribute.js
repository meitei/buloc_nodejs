/* Define Attribute
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Model = AbstractModel.extend({
    urlRoot: '/attributes',
    name: 'attribute',
    constraints: {name: {required: true, maxLength: 30}}
  });
  return Model;
});
