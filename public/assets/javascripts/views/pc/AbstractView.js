define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var View = Backbone.View.extend({
    events: {},
    title: 'no name',
    initialize: function() {
    },
    render: function(parent) {
      console.debug("AbstractView#render");
      this.parent = parent;
    }
  });
  return View;
});
