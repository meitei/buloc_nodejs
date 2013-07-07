define([
  'jquery',
  'underscore',
  'collections/Attributes'
], function($, _, Attributes) {

  function Helper() {

    if ( arguments.callee._singletonInstance )
      return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    this.attributes = new Attributes();
    this.getAttributeName = function(key, options) {
      console.debug('Helper#getAttributeName');
      var params = {id: key};
      var model = this.attributes.findWhere(params);
      var edit = options.edit;
      if(_.isUndefined(model)) {
        this.attributes.fetch({
          data: {params: params},
          success: function(collection, res, options){
            console.debug("search success!!");
            model = collection.findWhere(params);
            edit(model);
          }
        });
      } else {
        edit(model);
      }
      // return (_.isUndefined(model)) ? (void 0) : model.get('name');
    };
    this.createSelect = function(view, selector, data) {
      // data_type list.
      var select = view.$(selector);
      select.empty();
      $.each(data, function(id, value){
        var option = $('<option>').html(value).val(id);
        select.append(option);
      });
    };
  }
  return Helper;
});
