define([
  'jquery',
  'underscore',
  'views/pc/AbstractDialogView'
], function($, _, AbstractDialogView) {
  var DisplayDialogView = AbstractDialogView.extend({
    el: '#dialog_display',
    events: function() {
      // extend events.
      var addEvents = {
        'click a[data-toggle="tab"]': "showTabOnClick"
      };
      return $.extend({}, this.constructor.__super__.events, addEvents);
    },
    render: function () {
      console.debug('DisplayDialogView#render');
    },
    showTabOnClick: function(e) {
      console.debug('DisplayDialogView#showTabOnClick');
      e.preventDefault();
      return (!_.isNull(this.model));
    },
    editBeforeOpen: function() {
      console.debug('DisplayDialogView:openDialog');

      // var viewAttrs = new ViewAttrs();
      // var viewAttrView = new ViewAttrView({collection: viewAttrs});
      // var viewAttrDialogView = new ViewAttrDialogView({collection: viewAttrs});
      // this.showChildView(viewAttrView, viewAttrDialogView);
      // // set instance field.
      // this.childCollection = viewAttrs;

    },
    showChildView: function(view, dialogView) {
      console.debug('DisplayDialogView:showChildView');
      if (!view.isRendered()) {
        var self = this;
        console.debug(self);
        view.render(self);
        view.on('clicked', function(model){
          dialogView.render();
          var options = {};
          if (!_.isUndefined(self.model)) {
            options.edit = function(data) {
              data.view_id = self.model.get("_id");
            };
          }
          dialogView.openDialog(model, options);
        });
      }
      view.show();
    },
    openDialog: function(model) {
      // call super method.
      this.constructor.__super__.openDialog.apply(this, arguments);
      // set tabs enabled.
      var attrTab = this.$('#display_attr');
      if(this.model) {
        attrTab.removeClass('disabled');
      } else {
        attrTab.addClass('disabled');
      }
    }
  });
  return DisplayDialogView;
});
