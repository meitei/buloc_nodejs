'use strict'
require.config({
  baseUrl: '/assets/javascripts',
  paths: {
    'jquery': 'lib/jquery-1.10.2',
    'jquery.ui': "lib/jquery-ui-1.10.3.custom",
    'jquery.jqGrid': "lib/jquery.jqGrid", 
    'jquery.deserialize': "lib/jquery.deserialize", 
    'jquery.serialize': "lib/jquery.serialize", 
    'bootstrap': "lib/bootstrap",
    'underscore': "lib/underscore",  
    'backbone': "lib/backbone",
    'json2': "lib/json2"
  },
  waitSeconds: 15,
  shim: {
    'jquery': {
      exports: '$'
    },
    'jquery.ui': {
      deps: ['jquery']
    },
    'jquery.jqGrid': {
      deps: ['jquery', 'jquery.ui']
    },
    'jquery.deserialize': {
      deps: ['jquery']
    },
    'jquery.serialize': {
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      exports: 'Backbone',
      deps: ['jquery', 'underscore', 'json2']
    },
    'bootstrap': ['jquery']

  }
});

require([
  'jquery',
  'backbone',
  'bootstrap',
  'routers/appsettings.pc',
  'commons/helper',

  'views/pc/ContentsView',
  'views/pc/MenuView',

  'collections/Attributes',
  'views/pc/AttributeView',
  'views/pc/AttributeDialogView',

  'collections/Views',
  'views/pc/ViewView',
  'views/pc/ViewDialogView',

  'collections/Displays',
  'views/pc/DisplayView',
  'views/pc/DisplayDialogView',

  'collections/Entities',
  'views/pc/EntityView',
  'views/pc/EntityDialogView'

], function($, Backbone, Bootstrap, Router, Helper,
    ContentsView, MenuView,
    Attributes, AttributeView, AttributeDialogView,
    Views, ViewView, ViewDialogView,
    Displays, DisplayView, DisplayDialogView,
    Entities, EntityView, EntityDialogView){

  $(function() {
    // $("#menu").menu();
    $("#dialog_find").hide(); // hide a common find dialog.
    $("#dialog_view_attr").hide(); // hide child dialog.
    $("#dialog_entity_attr").hide(); // hide child dialog.

    // // get url attributes.
    // var url = {};
    // var urlPattern = /(\w+):\/\/([\w.:]+)\/(\S+)\/([\w]+)/;
    // var result = window.location.href.match(urlPattern);
    // if (result != null) {
    //   url.fullurl = result[0];
    //   url.protocol = result[1];
    //   url.host = result[2];
    //   url.action = result[3];
    //   url.id = result[4];
    // }

    // var appInfo = {url: url};

    // get url attributes.
    var helper = new Helper();
    helper.getUrl();

    var contentsView = new ContentsView();
    contentsView.render();

    // def attributes
    var attributes = new Attributes();
    var attributeView = new AttributeView({collection: attributes});
    var attributeDialogView = new AttributeDialogView({collection: attributes});

    // console.debug(AttributeDialogView.prototype);

    // def views
    var views = new Views();
    var viewView = new ViewView({collection: views});
    var viewDialogView = new ViewDialogView({collection: views});

    // def display
    var displays = new Displays();
    var displayView = new DisplayView({collection: displays});
    var displayDialogView = new DisplayDialogView({collection: displays});

    // def entity
    var entities = new Entities();
    var entityView = new EntityView({collection: entities});
    var entityDialogView = new EntityDialogView({collection: entities});

    // routes settings
    var router = new Router();
    router.on("route:show_attribute", function() {
      console.debug("called show attribute.");
      contentsView.showChildView(attributeView, attributeDialogView);
    });
    router.on("route:show_view", function() {
      console.debug("called show view.");
      contentsView.showChildView(viewView, viewDialogView);
    });
    router.on("route:show_display", function() {
      console.debug("called show display.");
      contentsView.showChildView(displayView, displayDialogView);
    });
    router.on("route:show_entity", function() {
      console.debug("called show entity.");
      contentsView.showChildView(entityView, entityDialogView);
    });

    // var menuView = new MenuView();
    var menuView = new MenuView();
    menuView.render();

    Backbone.history.start();


  });
});
