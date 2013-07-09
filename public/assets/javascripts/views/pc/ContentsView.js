/* Define Contents View
-------------------------------------------------- */
define([
  'jquery',
  'underscore',
  'backbone',
  'commons/helper'
], function($, _, Backbone, Helper) {
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
          var helper = new Helper();
          var parentId = helper.getUrl().id;
          console.debug('get parent id =>' + parentId);
          var parentKeyId = view.collection.parentKeyId;
          if (parentKeyId) {
            dialogView.openDialog(model, {edit: function(data) {
              data[parentKeyId] = parentId;
              return data;
            }});
          } else {
            dialogView.openDialog(model);
          }
        });
      }
      view.show();
      // save active view.
      this.activeView = view;
    }
  });
  return ContentsView;
});