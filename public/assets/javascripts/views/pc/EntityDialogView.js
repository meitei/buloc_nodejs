define([
  'jquery',
  'underscore',
  'commons/helper',
  'views/pc/AbstractDialogView',
  'collections/EntityAttrs',
  'views/pc/EntityAttrView',
  'views/pc/EntityAttrDialogView'
], function($, _, Helper, AbstractDialogView, EntityAttrs, EntityAttrView, EntityAttrDialogView) {
  var EntityDialogView = AbstractDialogView.extend({
    el: '#dialog_entity',
    events: function() {
      // extend events.
      var addEvents = {
        'click a[data-toggle="tab"]': "showTabOnClick"
      };
      return $.extend({}, this.constructor.__super__.events, addEvents);
    },
    render: function () {
      console.debug('EntityDialogView#render');
    },
    showTabOnClick: function(e) {
      console.debug('EntityDialogView#showTabOnClick');
      e.preventDefault();
      // this.$(e.target).tab('show');

      // this.$('li.active').removeClass('active');
      // var objTarget = this.$(e.target);
      // var href = objTarget.attr('href');
      // objTarget.parent().addClass('active');
      // this.$('div.active in').removeClass('active in');
      // console.debug('href > ' + href);
      // this.$(href).addClass('active in');

      // console.debug(this.$(e.target));
      return (!_.isNull(this.model));
    },
    editBeforeOpen: function() {
      console.debug('EntityDialogView#editBeforeOpen');
      var entityAttrs = new EntityAttrs();
      var entityAttrView = new EntityAttrView({collection: entityAttrs});
      var entityAttrDialogView = new EntityAttrDialogView({collection: entityAttrs});
      this.showChildView(entityAttrView, entityAttrDialogView);
    },
    showChildView: function(view, dialogView) {
      console.debug('EntityDialogView#showChildView');
      if (!view.isRendered()) {
        var self = this;
        view.render(self);
        view.on('clicked', function(model){
          dialogView.render();
          var options = {};
          if (!_.isUndefined(self.model)) {
            options.edit = function(attr) {
              attr.view_id = self.model.get("id");
            };
          }
          dialogView.openDialog(model, options);
        });
      }
      view.show();
    },
    openDialog: function(model) {
      console.debug('EntityDialogView#openDialog');
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
  return EntityDialogView;
});
