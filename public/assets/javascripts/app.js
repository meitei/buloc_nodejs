define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  // app main
  var app = {};

  app.event = {};
  _.extend(app.event, Backbone.Events);

  app.viewParts = [
    {id: 'attribute', view: 'AttributeView', collection: 'Attributes'}
  ];

  // app.views = {};
  // _.each(app.viewParts, function(vp){
  app.createView = function(id) {
    var vp = _.find(app.viewParts, function(vp){ return vp.id == id; });
    if(!vp) return (void 0);
    var C = require('collections/' + vp.collection);
    var V = require('views/pc/' + vp.view);
    return new V({collection: new C()});
  };

  // any process
  app.init = function() {
    var self = this;
    // set event listener.
    _.each(app.viewParts, function(vp){
      this.event.on('open:' + vp.id, function(obj, opt) {
        var view = self.createView(vp.id);
        view.open(opt);
      });
    });
  };

  return app;
});
