define([
  'underscore',
  'backbone',
  'commons/helper'
], function(_, Backbone, Helper) {
  var View = Backbone.View.extend({
    events: {},
    title: 'no name',
    initialize: function() {
    },
    render: function(parent) {
      console.debug("AbstractView#render");
      this.parent = parent;
    },
    helper: new Helper()
  });
  return View;
});
