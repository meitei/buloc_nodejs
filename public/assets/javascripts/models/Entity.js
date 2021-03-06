/* Define Entity
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Model = AbstractModel.extend({
    urlRoot: '/entities',
    name: 'entity',
    constraints: {name: {required: true, maxLength: 30}}
  });
  return Model;
});
