define([
  'jquery',
  'underscore',
  'commons/helper',
  'views/pc/AbstractDialogView',
  'collections/LogicInOuts',
  'views/pc/LogicInOutView'
], function($, _, Helper, AbstractDialogView, LogicInOuts, LogicInOutView) {
  var LogicDialogView = AbstractDialogView.extend({
    el: '#dialog_logic_inout',
    children: [
      {
        event_id: 'render',
        collection: LogicInOuts,
        view: LogicInOutView
      }
    ],
    events: function() {
      // extend events.
      var addEvents = {
        'click a[data-toggle="tab"]': "showTabOnClick"
      };
      return $.extend({}, this.constructor.__super__.events, addEvents);
    },
    render: function () {
      console.debug('LogicDialogView#render');
      var self = this;
      // init of children.
      _.each(self.children, function(cld) {
        if (cld.event_id == 'render') {
          console.debug(cld);
          var clct = new cld.collection();
          var view = new cld.view({collection: clct});
          view.render(self);
          cld.instance = view;
        }
      });

      // var logicInOuts = new LogicInOuts();
      // var logicInOutView = new LogicInOutView({collection: logicInOuts});
      // logicInOutView.render(this);

    },
    showTabOnClick: function(e) {
      console.debug('LogicDialogView#showTabOnClick');
      e.preventDefault();
      return (!_.isNull(this.model));
    },
    editBeforeOpen: function() {
      console.debug('LogicDialogView#editBeforeOpen');
    },
    showChildView: function(view, dialogView) {
      console.debug('LogicDialogView#showChildView');
      if (!view.isRendered()) {
        var self = this;
        view.render(self);
        view.on('clicked', function(model){
          dialogView.render();
          var options = {};
          if (!_.isUndefined(self.model)) {
            options.edit = function(attr) {
              attr.view_id = self.model.get("id");
              return attr;
            };
          }
          dialogView.openDialog(model, options);
        });
      }
      view.show();
    },
    openDialog: function(model) {
      console.debug('LogicDialogView#openDialog');
      console.debug(model);
      // call super method.
      this.constructor.__super__.openDialog.apply(this, arguments);
      // set tabs enabled.
      var attrTab = this.$('#entity_attr');
      if(this.model) {
        attrTab.removeClass('disabled');
        // $('a', attr_tab).attr('href','#attr_list')
      } else {
        attrTab.addClass('disabled');
        // $('a', attr_tab).attr('href','#')
      }

    }
  });
  return LogicDialogView;
});
