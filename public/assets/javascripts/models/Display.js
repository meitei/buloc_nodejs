/* Define Display
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Model = AbstractModel.extend({
    urlRoot: '/displays',
    name: 'display',
    constraints: {name: {required: true, maxLength: 30}}
  });
  return Model;
});
