'use strict'
require.config({
  baseUrl: '/assets/javascripts',
  paths: {
    'jquery': 'lib/jquery-1.10.2',
    'jquery.ui': "lib/jquery-ui-1.10.3.custom",
    'grid.locale-ja': "lib/i18n/grid.locale-ja",
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
      deps: ['jquery', 'jquery.ui', 'grid.locale-ja']
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

var viewParts = [
  {
    id: 'attribute',
    el: '#attributeView',
    view: 'AttributeView',
    collection: 'Attributes',
    isRoute: true,
    hasElement: false,
    children: ['attributeDialog'],
    eventIds: {
      'newBtn': 'show:attributeDialog',
      'updBtn': 'show:attributeDialog'
    },
    necessary: ['app_id']
  },
  {
    id: 'attributeDialog',
    el: '#dialog_attribute',
    view: 'AttributeDialogView',
    // collection: 'Attributes',
    isRoute: false,
    hasElement: false,
    necessary: ['app_id'],
    edit: ['app_id']
  }
];

var modules = [
  'jquery',
  'backbone',
  'bootstrap',
  'routers/appsettings.pc',
  'commons/helper',
  'app',

  'views/pc/ContentsView',
  'views/pc/MenuView',


  'collections/Views',
  'views/pc/ViewView',
  'views/pc/ViewDialogView',

  'collections/Displays',
  'views/pc/DisplayView',
  'views/pc/DisplayDialogView',

  'collections/Logics',
  'views/pc/LogicView',
  'views/pc/LogicDialogView',

  'collections/Entities',
  'views/pc/EntityView',
  'views/pc/EntityDialogView'

  // 'collections/Attributes',
  // 'views/pc/AttributeView',
  // 'views/pc/AttributeDialogView'

];

// require(['underscore'], function(_) {
//   _.each(viewParts, function(vp){
//     console.debug('追加したがな。');
//     modules.push('views/pc/' + vp.view);
//     modules.push('collections/' + vp.collection);
//   });
// });
// var addModules = [];
viewParts.forEach(function(vp) {
  modules.push('views/pc/' + vp.view);
  if (vp.collection) modules.push('collections/' + vp.collection);
});

require(modules,
  function($, Backbone, Bootstrap, Router, Helper, app,
    ContentsView, MenuView,
    // Attributes, AttributeView, AttributeDialogView,
    Views, ViewView, ViewDialogView,
    Displays, DisplayView, DisplayDialogView,
    Logics, LogicView, LogicDialogView,
    Entities, EntityView, EntityDialogView){

  $(function() {
    // $("#menu").menu();
    $("#dialog_find").hide(); // hide a common find dialog.
    $("#dialog_view_attr").hide(); // hide child dialog.
    $("#dialog_entity_attr").hide(); // hide child dialog.
    $("#dialog_logic").hide(); // hide child dialog.

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

    // initialize app
    app.init(viewParts);

    var contentsView = new ContentsView();
    contentsView.render();

    // def attributes
    // var attributes = new Attributes();
    // var attributeView = new AttributeView({collection: attributes});
    // var attributeDialogView = new AttributeDialogView({collection: attributes});

    // console.debug(AttributeDialogView.prototype);

    // def views
    var views = new Views();
    var viewView = new ViewView({collection: views});
    var viewDialogView = new ViewDialogView({collection: views});

    // def display
    var displays = new Displays();
    var displayView = new DisplayView({collection: displays});
    var displayDialogView = new DisplayDialogView({collection: displays});

    // def logic
    var logics = new Logics();
    var logicView = new LogicView({collection: logics});
    var logicDialogView = new LogicDialogView({collection: logics});

    // def entity
    var entities = new Entities();
    var entityView = new EntityView({collection: entities});
    var entityDialogView = new EntityDialogView({collection: entities});

    // routes settings
    // var router = new Router();
    var router = app.router;

    // router.on("route:show_attribute", function() {
    //   console.debug("called show attribute.");
    //   // contentsView.showChildView(attributeView, attributeDialogView);
    //   app.event.trigger('show:attribute');
    // });
    router.on("route:show_view", function() {
      console.debug("called show view.");
      contentsView.showChildView(viewView, viewDialogView);
    });
    router.on("route:show_display", function() {
      console.debug("called show display.");
      contentsView.showChildView(displayView, displayDialogView);
    });
    router.on("route:show_logic", function() {
      console.debug("called show logic.");
      contentsView.showChildView(logicView, logicDialogView);
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
