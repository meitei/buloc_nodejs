define([
  'underscore',
  'backbone',
  'views/pc/AbstractView',
  'jst/appsettings.pc'
], function(_, Backbone, AbstractView, JST) {
  var View = AbstractView.extend({
    events: {
      "click #btn_new": "newBtnOnClick",
      "click #btn_upd": "updBtnOnClick",
      "click #btn_del": "deleteOnClick"
    },
    addMode: false,
    editable: false,
    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'change', this.changeOne);
      this.listenTo(this.collection, 'remove', this.removeOne);
    },
    render: function(parent) {
      console.debug("AbstractView#render");
      // console.debug(parent);
      // console.debug(this.$el);
      this.$el.html(JST['listView']({title: this.title}));
      this.list = this.$("#list");
      this.parent = parent;
      this.fetch();
      this.rendered = true;
    },
    fetch: function() {
      this.collection.fetch();
    },
    show: function() {
      this.$el.show();
    },
    hide: function() {
      this.$el.hide();
    },
    isRendered: function() {
      return this.rendered;
    },
    addOne: function(model) {
      console.debug(model.attributes);
      this.list.addRowData(model.cid, model.attributes);
    },
    changeOne: function(model) {
      this.list.setRowData(model.cid, model.attributes);
    },
    removeOne: function(model) {
      this.list.delRowData(model.cid);
    },
    newBtnOnClick: function() {
      if (this.editable) {
        this.list.addRowData(undefined, {});
      } else {
        this.trigger('clicked', null);
      }
    },
    updBtnOnClick: function() {
      var rowid = this.list.getGridParam("selrow");
      if(!rowid) return false;
      var rowData = this.list.getRowData(rowid);
      // var model = this.collection.where({_id: rowData._id}).shift();
      var model = this.collection.get(rowData.id);
      this.trigger('clicked', model);
    },
    deleteOnClick: function() {
      var rowid = this.list.getGridParam("selrow");
      if(!rowid) return false;
      var rowData = this.list.getRowData(rowid);
      // var model = this.collection.where({_id: rowData._id}).shift();
      var model = this.collection.get(rowData.id);
      console.debug('remove model.');
      console.debug(model);
      this.collection.remove(model);
      model.destroy();
    }
  });
  return View;
});
