  /* Define MenuView
  -------------------------------------------------- */
define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var MenuView = Backbone.View.extend({
    el: '#menuView',
    events: {
      "click #lnk_attribute": "editAttributeOnClick",
      "click #lnk_view": "editViewOnClick",
      "click #lnk_display": "editDisplayOnClick",
      "click #lnk_logic": "editLogicOnClick",
      "click #lnk_entity": "editEntityOnClick"
    },
    initialize: function() {
      // this.input = this.$('#name');
      this.list = this.$("#list");
    },
    setActive: function(e) {
      this.$('li.active').removeClass('active');
      this.$(e.target).parent('li').addClass('active');
    },
    editAttributeOnClick: function(e) {
      e.preventDefault();
      console.info('clicked attribute button!');
      Backbone.history.navigate('/attribute', true);
      this.setActive(e);
    },
    editViewOnClick: function(e) {
      e.preventDefault();
      console.info('clicked view button!');
      Backbone.history.navigate('/view', true);
      this.setActive(e);
    },
    editDisplayOnClick: function(e) {
      e.preventDefault();
      console.info('clicked display button!');
      Backbone.history.navigate('/display', true);
      this.setActive(e);
    },
    editLogicOnClick: function(e) {
      e.preventDefault();
      console.info('clicked logic button!');
      Backbone.history.navigate('/logic', true);
      this.setActive(e);
    },
    editEntityOnClick: function(e) {
      e.preventDefault();
      console.info('clicked entity button!');
      Backbone.history.navigate('/entity', true);
      this.setActive(e);
    }
  });
  return MenuView;
});
