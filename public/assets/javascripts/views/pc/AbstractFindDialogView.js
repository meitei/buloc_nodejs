define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var AbstractFindDialogView = Backbone.View.extend({
    events: {
      "click #dialog_find": "findOnClick",
      "click #dialog_fix": "fixOnClick",
      "click #dialog_close": "closeOnClick"
    },
    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.reset);
      this.conds = this.$('#cond :input');
      this.list = this.$("#list");

      // this.collection = new Attributes();
      (this.$el).hide();
    },
    addOne: function(model) {
      this.list.addRowData(model.cid, model.attributes);
    },
    reset: function(collection) {
      console.debug("reset.");
      // console.debug(collection.models);
      var self = this;
      // var jsonData = collection.toJSON();
      // console.debug(jsonData);
      this.list.clearGridData().trigger('reloadGrid');

      // this.list.setGridParam({
      //   datatype: "local",
      //   data: jsonData,
      //   rowNum: jsonData.length 
      // }).trigger('reloadGrid');

      // this.list.jqGrid('setGridParam',
      // {
      //   datatype: 'local',
      //   data: jsonData,
      //   rowNum: jsonData.length 
      // }).trigger('reloadGrid');
      
      // this_view.list.GridUnload();
      // this_view.list.gridData = [];
      // this_view.list.gridData = collection.models;
      // this_view.render(collection.models);

      $.each(collection.models, function(){
        var model = this;
        console.debug(model.attributes);
        self.list.addRowData(model.cid, model.attributes);
      });

      // this_view.list.trigger("reloadGrid");
      // this_view.list[0].addJSONData(collection.toJSON());
    },
    findOnClick: function(e) {
      e.preventDefault();
      console.debug('click find button.');
      var self = this;
      var conds = {};
      $.each (this.conds, function() {
        var elm = this;
        // console.debug("id:" + elm.id + ", val=");
        // console.debug(this_view.$("#" + elm.id));
        var value = self.$("#" + elm.id).val();
        if(!_.isEmpty(value)) {
          conds[elm.id] = value;
        }
      });
      console.debug(conds);
      this.collection.fetch({
        data: {params: conds},
        reset: true,
        success: function(collection, res, options){
          console.debug("search success!!");
        }
      });
    },
    fixOnClick: function(e) {
      e.preventDefault();
      console.debug('click fix button.');

      var rowid = this.list.getGridParam("selrow");
      if(!rowid) return false;
      var rowData = this.list.getRowData(rowid);
      var model = this.collection.get({id: rowData.id});
      console.debug(this.response);
      $.each(this.response, function(name, elm){
        // console.debug(elm.val());
        // console.debug(model.get(name));
        if(model.has(name)) {
          // console.debug(elm[0].tagName);
          if(elm[0].tagName == 'INPUT') {
            // console.debug('input!');
            elm.val(model.get(name));
          } else {
            // console.debug('not input!');
            elm.html(model.get(name));
          }
        }
      });
      this.closeDialog();
    },
    closeOnClick: function(e) {
      e.preventDefault();
      console.debug('click close button.');
      this.closeDialog();
    },
    closeDialog: function() {
      var self = this;
      $.each(this.conds, function() {
        self.$("#" + this.id).val('');
      });
      this.list.clearGridData().trigger('reloadGrid');
      (this.$el).dialog('close');
    },
    openDialog: function(params, response) {
      this.params = params;
      this.response = response;
      (this.$el).dialog({
        show: {effect: "clip"},
        hide: {effect: "clip"},
        width: "auto",
        modal: true
      });

    }
  });
  return AbstractFindDialogView;
});
