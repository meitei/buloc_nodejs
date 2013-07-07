/* Errors Object
-------------------------------------------------- */
define([
  'underscore'
], function(_) {
  function Errors() {
    this.errors = {};
    this.add = function(id, message) {
      if(_.isUndefined(this.errors[id])) this.errors[id] = [];
      this.errors[id].push(message);
    };
    this.hasError = function(){
      return (!_.isEmpty(this.errors));
    };
  }
  return Errors;
});
