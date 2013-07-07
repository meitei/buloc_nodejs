/* Define Entity
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Entity = AbstractModel.extend({
    urlRoot: '/entities',
    name: 'entity',
    constraints: {name: {required: true, maxLength: 30}}
  });
  return Entity;
});
