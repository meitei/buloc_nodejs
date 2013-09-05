/* Define Logic
-------------------------------------------------- */
define([
  'models/AbstractModel'
], function(AbstractModel){
  var Model = AbstractModel.extend({
    urlRoot: '/logics',
    name: 'logic',
    constraints: {name: {required: true, maxLength: 50}}
  });
  return Model;
});
