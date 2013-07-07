/* Define Entity Attribute
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var EntityAttr = AbstractModel.extend({
    urlRoot: '/entity_attrs',
    name: 'entity_attr',
    constraints: {attr_id: {required: true}}
  });
  return EntityAttr;
});
