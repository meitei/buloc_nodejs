/* Define View
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Model = AbstractModel.extend({
    urlRoot: '/views',
    name: 'view'
  });
  return Model;
});
