/* Define View
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var View = AbstractModel.extend({
    urlRoot: '/views',
    name: 'view'
  });
  return View;
});
