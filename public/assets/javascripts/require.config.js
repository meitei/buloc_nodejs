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
  },

  {
    id: 'entity',
    el: '#entityView',
    view: 'EntityView',
    collection: 'Entities',
    isRoute: true,
    hasElement: false,
    children: ['entityDialog'],
    eventIds: {
      'newBtn': 'show:entityDialog',
      'updBtn': 'show:entityDialog'
    },
    necessary: ['app_id']
  },
  {
    id: 'entityDialog',
    el: '#dialog_entity',
    view: 'EntityDialogView',
    isRoute: false,
    hasElement: false,
    subView: ['entityAttr'],
    children: ['entityAttr'],
    necessary: ['app_id'],
    edit: ['app_id']
  },

  {
    id: 'entityAttr',
    el: '#entityAttrs',
    view: 'EntityAttrView',
    collection: 'EntityAttrs',
    isRoute: false,
    hasElement: false,
    children: ['entityAttrDialog'],
    eventIds: {
      'newBtn': 'show:entityAttrDialog',
      'updBtn': 'show:entityAttrDialog'
    },
    necessary: ['id']
  },
  {
    id: 'entityAttrDialog',
    el: '#dialog_entity_attr',
    view: 'EntityAttrDialogView',
    isRoute: false,
    hasElement: false,
    necessary: ['id'],
    // edit: [{id: 'entity_id'}]
    edit: {id: 'entity_id'}
  },

  //view settings
  {
    id: 'view',
    el: '#viewView',
    view: 'ViewView',
    collection: 'Views',
    isRoute: true,
    hasElement: false,
    children: ['viewDialog'],
    eventIds: {
      'newBtn': 'show:viewDialog',
      'updBtn': 'show:viewDialog'
    },
    necessary: ['app_id']
  },
  {
    id: 'viewDialog',
    el: '#dialog_view',
    view: 'ViewDialogView',
    isRoute: false,
    hasElement: false,
    subView: ['viewAttr'],
    children: ['viewAttr'],
    necessary: ['app_id'],
    edit: ['app_id']
  },

  {
    id: 'viewAttr',
    el: '#viewAttrs',
    view: 'ViewAttrView',
    collection: 'ViewAttrs',
    isRoute: false,
    hasElement: false,
    children: ['viewAttrDialog'],
    eventIds: {
      'newBtn': 'show:viewAttrDialog',
      'updBtn': 'show:viewAttrDialog'
    },
    necessary: ['id']
  },
  {
    id: 'viewAttrDialog',
    el: '#dialog_view_attr',
    view: 'ViewAttrDialogView',
    isRoute: false,
    hasElement: false,
    necessary: ['id'],
    // edit: [{id: 'entity_id'}]
    edit: {id: 'entity_id'}
  },

  //display settings
  {
    id: 'display',
    el: '#displayView',
    view: 'displayView',
    collection: 'Displays',
    isRoute: true,
    hasElement: false,
    children: ['displayDialog'],
    eventIds: {
      'newBtn': 'show:displayDialog',
      'updBtn': 'show:displayDialog'
    },
    necessary: ['app_id']
  },
  {
    id: 'displayDialog',
    el: '#dialog_display',
    view: 'DisplayDialogView',
    isRoute: false,
    hasElement: false,
    necessary: ['app_id'],
    edit: ['app_id']
  },

  //logic settings
  {
    id: 'logic',
    el: '#logicView',
    view: 'LogicView',
    collection: 'Logics',
    isRoute: true,
    hasElement: false,
    children: ['logicDialog'],
    eventIds: {
      'newBtn': 'show:logicDialog',
      'updBtn': 'show:logicDialog'
    },
    necessary: ['app_id']
  },
  {
    id: 'logicDialog',
    el: '#dialog_logic',
    view: 'LogicDialogView',
    isRoute: false,
    hasElement: false,
    subView: ['logicInOut'],
    children: ['logicInOut'],
    necessary: ['app_id'],
    edit: ['app_id']
  },

  {
    id: 'logicInOut',
    el: '#logicInOut',
    view: 'LogicInOutView',
    collection: 'LogicInOuts',
    isRoute: false,
    hasElement: false,
    // children: ['viewAttrDialog'],
    // eventIds: {
    //   'newBtn': 'show:viewAttrDialog',
    //   'updBtn': 'show:viewAttrDialog'
    // },
    necessary: ['id']
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

];

viewParts.forEach(function(vp) {
  modules.push('views/pc/' + vp.view);
  if (vp.collection) modules.push('collections/' + vp.collection);
});

require(modules,
  function($, Backbone, Bootstrap, Router, Helper, app, ContentsView, MenuView) {

  $(function() {
    // $("#menu").menu();
    $("#dialog_find").hide(); // hide a common find dialog.

    // get url attributes.
    var helper = new Helper();
    helper.getUrl();

    // initialize app
    app.init(viewParts);

    var contentsView = new ContentsView();
    contentsView.render();

    var menuView = new MenuView();
    menuView.render();

    Backbone.history.start();


  });
});
