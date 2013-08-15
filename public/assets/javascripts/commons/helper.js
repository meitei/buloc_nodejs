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
      if(_.isUndefined(key)) return (void 0);
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

    this.getUrl = function() {
      // get url attributes.
      if ( _.isUndefined(this._url) ) {
        var url = {};
        var urlPattern = /(\w+):\/\/([\w.:]+)\/(\S+)\/([\w]+)/;
        var result = window.location.href.match(urlPattern);
        if (result != null) {
          url.fullurl = result[0];
          url.protocol = result[1];
          url.host = result[2];
          url.action = result[3];
          url.id = result[4];
          // (url.fullurl, url.protocol, url.host, url.action, url.id) = result;
        }
        console.debug('url =>');
        console.debug(url);
        this._url = url;
      }
      return this._url;
    };

  }
  return Helper;
});
