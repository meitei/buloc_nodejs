/* Router
-------------------------------------------------- */
define([
  'backbone'
], function(Backbone){
  var Router = Backbone.Router.extend({
    routes: {
      "attribute": "show_attribute",
      "view": "show_view",
      "display": "show_display",
      "entity": "show_entity",
      "logic": "show_logic"
    }
  });
  return Router;
});
