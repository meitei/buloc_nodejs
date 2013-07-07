/* Define Attribute
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Attribute = AbstractModel.extend({
    urlRoot: '/attributes',
    name: 'attribute',
    constraints: {name: {required: true, maxLength: 30}}
  });
  return Attribute;
});
