/* Define View Attributes
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Model = AbstractModel.extend({
    urlRoot: '/view_attrs',
    name: 'view_attr'
  });
  return Model;
});
