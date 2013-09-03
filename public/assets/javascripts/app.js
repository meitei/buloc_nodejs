define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  // app main
  var app = {};

  // any process
  app.init = function() {

  }

  // app views
  app.views = {};

  var Attributes = require('collections/Attributes');
  var AttributeView = require('views/pc/AttributeView');
  app.collections.attributes = new Attributes();
  app.views.attribute = new AttributeView({collection: app.collections.attributes});

  return app;
});
