define([
  'jquery',
  'underscore',
  'commons/helper',
  'views/pc/AbstractDialogView',
  'collections/ViewAttrs',
  'views/pc/ViewAttrView',
  'views/pc/ViewAttrDialogView'
], function($, _, Helper, AbstractDialogView, ViewAttrs, ViewAttrView, ViewAttrDialogView) {
  var ViewDialogView = AbstractDialogView.extend({
    el: '#dialog_view',
    events: function() {
      // extend events.
      var addEvents = {
        'click a[data-toggle="tab"]': "showTabOnClick"
      };
      return $.extend({}, this.constructor.__super__.events, addEvents);
    },
    render: function () {
      console.debug('ViewDialogView#render');
      // var self = this;
      // this.$('#ui-tab').tabs();

      // move to showTabOnClick
      // this.$('a[data-toggle="tab"]').click(function (e) {
      //   e.preventDefault();
      //   console.debug('tab clicked.');
      //   if(self.model) $(this).tab('show');
      //   return false;
      // })

    },
    showTabOnClick: function(e) {
      console.debug('ViewDialogView#showTabOnClick');
      e.preventDefault();
      return (!_.isNull(this.model));
    },
    editBeforeOpen: function() {
      console.debug('ViewDialogView:openDialog');

      var viewAttrs = new ViewAttrs();
      var viewAttrView = new ViewAttrView({collection: viewAttrs});
      var viewAttrDialogView = new ViewAttrDialogView({collection: viewAttrs});
      this.showChildView(viewAttrView, viewAttrDialogView);
      // set instance field.
      this.childCollection = viewAttrs;

    },
    showChildView: function(view, dialogView) {
      console.debug('ViewDialogView:showChildView');
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
      var attrTab = this.$('#view_attr');
      if(this.model) {
        attrTab.removeClass('disabled');
        // $('a', attr_tab).attr('href','#attr_list')
      } else {
        attrTab.addClass('disabled');
        // $('a', attr_tab).attr('href','#')
      }

    }
  });
  return ViewDialogView;
});
