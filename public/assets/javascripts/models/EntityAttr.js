/* Define Entity Attribute
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Model = AbstractModel.extend({
    urlRoot: '/entity_attrs',
    name: 'entity_attr',
    constraints: {attr_id: {required: true}}
  });
  return Model;
});
