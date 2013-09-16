define([
  'require',
  'jquery',
  'underscore',
  'backbone',
  'routers/appsettings.pc',
  'commons/helper'
], function(require, $, _, Backbone, Router, Helper) {

  var app = {};

  app.event = {};
  _.extend(app.event, Backbone.Events);

  var helper = new Helper();

  app.router = new Router();

  app.createView = function(obj, id) {
    // console.log('app.createView');
    // console.log(obj);
    // console.log(id);
    var vp = _.find(app.viewParts, function(vp){ return vp.id == id; });
    if(!vp) return (void 0);
    var V = require('views/pc/' + vp.view);
    // It is default. if vp.collection is undefined, use parent collection.
    var collection = void 0;
    if (!_.isUndefined(vp.collection)) {
      var C = require('collections/' + vp.collection);
      collection = new C();
    } else {
      if (obj) {
        collection = obj.collection;
      } else {
        throw 'You must specify either vp.collection and parent collection.';
      }
    }
    return new V({collection: collection, el: vp.el});
    // return view;
  };

  // any process
  app.init = function(viewParts) {
    var self = this;
    // set event listener.
    self.viewParts = viewParts;
    _.each(self.viewParts, function(vp){

      // hide view.
      $(vp.el).hide();

      // these are settings of route. (use pushState)
      if(vp.isRoute) {
        console.log('isroute '+vp.id);
        self.router.on("route:show_" + vp.id, function() {
          console.log('fire route:show_' + vp.id);
          if(self.activeView) self.activeView.$el.hide();
          self.event.trigger('show:' + vp.id);
        });
      }

      // these are settings of show view.
      self.event.on('show:' + vp.id, function(obj, opt) {
        console.debug('fire event -> show:' + vp.id);
        console.debug('option =>');
        console.debug(opt);
        var view = self.createView(obj, vp.id);
        // console.debug('create view cid=' + view.cid);
        if (!view) return;
        if (vp.isRoute) self.activeView = view;
        view.parent = obj;
        view.eventIds = vp.eventIds;
        view.render();

        if (!_.isEmpty(vp.children)) {
          _.each(vp.children, function(child){
            // define show event of view.
            self.event.listenTo(view, 'show:' + child, function(obj, opt) {
              self.event.trigger('show:' + child, obj, opt);
            });
          });
        }

        if (_.isUndefined(opt) || _.isNull(opt)) opt = {};
        opt.necessary = {};
        _.each(vp.necessary, function(nc) {
          if(nc === 'app_id') {
            opt.necessary.app_id = helper.getUrl().id;
          } else {
            if (obj && obj.parent && obj.parent.model) {
              // var model = obj.parent.model;
              var model = obj.model;
              // console.debug('necessary model =>');
              // console.debug(model);
              if (_.has(model.attributes, nc)) {
                opt.necessary[nc] = model.attributes[nc];
              } else {
                console.warning(vp.id + ' -> necessary is defined, but parent dont have it. (' + nc + ')');
              }
            }
          }
        });
        if (!_.isUndefined(vp.edit)) {
          var editItems = {};
          _.each(vp.edit, function(v, k) {
            var kf,kt;
            if (_.isArray(vp.edit)) {
              kf = kt = v;
            } else {
              kf = k;
              kt = v;
            }
            if (_.has(opt.necessary, kf)) {
              editItems[kt] = opt.necessary[kf];
            } else {
              console.error('create edit object, but value is not exists.');
            }

          });
          if (!_.isEmpty(editItems)) {
            opt.edit = function(data) {
              _.each(editItems, function(v,k) {
                data[k] = v;
              });
              return data;
            };
          }
        }
        view.options = opt;
        if (opt.model) {
          view.model = opt.model;
          // ** FIXME **
          self.event.listenTo(view.model, 'error', view.editError);
        }
        // extend clean function.
        view.cleanUp = function() {
          console.log(' ** cleanUp ** view(' + view.cid + ')');
          self.event.stopListening(view);
          view.undelegateEvents();
        };

        view.show();
        // view.open(opt);

        // When sub views has exist, render sub views.
        if (vp.subView) {
          _.each(vp.subView, function(v) {
            view.trigger('show:' + v, view, {model: opt.model});
          });
        }


      });

    });
  };

  return app;
});
