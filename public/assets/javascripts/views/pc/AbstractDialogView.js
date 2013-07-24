define([
  'underscore',
  'backbone',
  'jquery.deserialize',
  'jquery.serialize'
], function(_, Backbone) {
  var AbstractDialogView = Backbone.View.extend({
    events: {
      "click #dialog_regist": "registOnClick",
      "click #dialog_close": "closeOnClick"
    },
    initialize: function() {
      this.form = this.$('form');
      (this.$el).hide();
    },
    render: function(){},
    editError: function(model, errors) {
      console.debug('AbstractDialogView#editError');
      console.debug(model);
      // console.debug(errors);
      var self = this;
      _.each(errors.errors, function(messages, id){
        var parent = self.$('#' + id).parent();
        parent.parent().addClass('error');
        parent.children('span.help-inline').html(messages.join('<br />'));
      });
    },
    registOnClick: function(e) {
      console.debug('AbstractDialogView#registOnClick');
      e.preventDefault();
      console.debug('click regist button.');
      // console.debug(this.form);
      var formObj = this.form.serializeForm();
      console.debug('form data => ');
      console.debug(formObj);
      // ** FIXME **
      var registData = this.options.edit(formObj);
      console.debug('regist data => ');
      console.debug(registData);

      if (this.model) {
        console.debug('model exists. run update.');
        // model exists.
        if (!this.model.save(registData, {wait: true})) {
          console.debug('validate failed.');
          return;
        }
        console.debug('model updated!.');
      } else {
        console.debug('model not exists. run insert.');
        var model = new this.collection.model(registData, {validate: false});
        this.listenTo(model, 'error', this.editError);
        if (!model.isValid) return;
        var newModel = this.collection.create(
          model,
          {wait: true},
          {success: function(response){
            console.debug('success update.');
            console.debug(response);
            //create child collection.
            // if(!_.isEmpty(this.childCollection.models)) {
            //   this.childCollection.createAll(new_model);
            // }
          },
          error: function(msg) {
            console.debug(msg);
            // alert('err');
          }
        });
        // console.debug(new_item);
        if (newModel.validationError) {
          console.debug('validate failed.');
          // alert(new_model.validationError);
          return;
        }
      }
      this.closeDialog();
    },
    closeOnClick: function(e) {
      console.debug('AbstractDialogView#closeOnClick');
      e.preventDefault();
      console.debug('click close button.');
      this.closeDialog();
    },
    closeDialog: function() {
      console.debug('AbstractDialogView#closeDialog');
      // clear form.
      this.form[0].reset();
      this.$('.uneditable-input').html('');
      // clear error
      this.$('div.error').removeClass('error');
      this.$('span.help-inline').html('');
      // clear instance fields.
      this.model = this.options = void 0;
      //close window.
      (this.$el).dialog('close');
    },
    openDialog: function(model, options) {
      console.debug('AbstractDialogView:openDialog');
      console.debug(model);
      console.debug(options);
      var self = this;
      // console.debug(options);
      this.model = model;
      this.options = ((_.isNull(options) || _.isUndefined(options)) ? {} : options);
      if(_.isUndefined(this.options.edit)) {
        this.options.edit = function(args){return args;};
      }
      if (this.model) {
        this.form.deserialize(model);
        this.listenTo(this.model, 'error', this.editError);
      }
      if(!_.isUndefined(this.editBeforeOpen)) this.editBeforeOpen();
      (this.$el).dialog({
        show: {effect: "clip"},
        hide: {effect: "clip"},
        width: "auto",
        modal: true,
        close: function(e) {
          self.closeDialog();
        }
      });

    }
  });
  return AbstractDialogView;
}); 
