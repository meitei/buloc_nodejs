/* Define Contents View
-------------------------------------------------- */
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var ContentsView = Backbone.View.extend({
    el: '#contents',
    events: {
      // "click #lnk_attribute": "editAttributeOnClick"
    },
    initialize: function() {
      // this.input = this.$('#name');
      // this.list = this.$("#list");
    },
    render: function() {
      var subViews = ['attribute','view', 'display', 'entity'];
      var contents = this.$el;
      $.each(subViews, function(){
        var elm = $('<div id="' + this + 'View"></div>');
        contents.append(elm);
        elm.hide();
      });
    },
    showChildView: function(view, dialogView) {
      // hide active view.
      if(this.activeView) this.activeView.hide();

      if (!view.isRendered()) {
        view.render();
        view.on('clicked', function(model){
          dialogView.render(view);
          dialogView.openDialog(model);
        });
      }
      view.show();
      // save active view.
      this.activeView = view;
    }
  });
  return ContentsView;
});