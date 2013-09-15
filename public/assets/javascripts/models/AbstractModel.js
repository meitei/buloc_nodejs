/* AbstractModel
-------------------------------------------------- */
define([
  'backbone',
  'commons/validater'
], function(Backbone, Validater){
  var AbstractModel = Backbone.Model.extend({
    validate: function(attrs) {
      console.debug("AbstractModel#validate");
      console.debug("model cid =>" + this.cid);
      // call the validate on add, update and callback(after server response).
      var validater = new Validater();
      validater.check(this.constraints, attrs);
      if(validater.hasError()) {
        this.trigger("error", this, validater.errors);
        return 'error';
      }
    }
  });
  return AbstractModel;
});
