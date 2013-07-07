
/* Validater Object
-------------------------------------------------- */
define([
  'underscore',
  'commons/errors'
], function(_, Errors) {
  function Validater() {
    this.messages = {
      // required: '%1は必須項目です。',
      // length: '%1は最大文字列数(%2)を超えています。'
      required: '%1 is required.',
      maxLength: '%1 is over max length(%2)',
      numeric: '%1 is numeric.'
    };
    this.errors = new Errors();
    this.check = function(cons, attrs){
      var self = this;
      console.debug('Validater#check');
      // console.debug(cons);
      // console.debug(attrs);
      if(cons == null) return true;
      _.each(attrs, function(value, id){
        if(id in cons) {
          _.each(cons[id], function(v, c){
            // var result = true;
            // console.debug('c =>');
            // console.debug(c);
            if(c === 'required' && v && !self.checkRequired(value)) {
              self.errors.add(id, self.getMessage(c, id));
            }
            else if(c === 'maxLength' && !self.checkLength(value,v)) {
              self.errors.add(id, self.getMessage(c, id, v));
            // } else {
            //   throw "error:unknown constraint type. (" + c + ")";
            }
          });
        }
      });
    };
    this.checkLength = function(value,len) {
      console.debug('check length > ' + value + '(' + len + ')');
      // if(!isNaN(value)) value = new String(value);
      var vlen = (value == null) ? 0 : value.length;
      return (vlen <= len);
    };
    this.checkRequired = function(value) {
      console.debug('check required > [' + value + ']');
      return !(value == null || value.length === 0);
    };
    this.hasError = function(){
      return this.errors.hasError();
    };
    this.getMessage = function(messageId, reps) {
      console.debug('Validater#getMessage');
      if (!_.has(this.messages, messageId)) return null;
      var message = this.messages[messageId];
      reps = _.rest(arguments);
      if (!_.isEmpty(reps)) {
        var funcRep = function(s) {
          var pos = parseInt(s.substring(1),10);
          if (reps.length >= pos) {
            return reps[(pos - 1)];
          }
        };
        return message.replace(/(%{1}([1-9]{1}(?!\d+)|\d{2,}))/g, funcRep);
      }
      return null;
    };
  }
  return Validater;
});
