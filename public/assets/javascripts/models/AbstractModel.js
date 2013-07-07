/* AbstractModel
-------------------------------------------------- */
define([
  'backbone',
  'commons/validater'
], function(Backbone, Validater){
  var AbstractModel = Backbone.Model.extend({
    validate: function(attrs) {
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
