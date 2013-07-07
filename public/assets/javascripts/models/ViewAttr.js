/* Define View Attributes
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var ViewAttr = AbstractModel.extend({
    urlRoot: '/view_attrs',
    name: 'view_attr'
  });
  return ViewAttr;
});
