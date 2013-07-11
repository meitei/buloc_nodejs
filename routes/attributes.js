module.exports = function(mongoose) {

  var models = require('../models/Models');
  var Attributes = models.getModel(mongoose, 'Attributes');

  return {
    index: {
      json: function(req, res) {
        Attributes.find({}, function(err, models) {
          console.log('find models.');
          res.send(JSON.stringify(models));
        });
      }
    },
    new: {
      html: function(req, res) {}
    },
    create: {
      json: function(req, res) {
        var params = Attributes.filter(req.body);
        var attribute = new Attributes(params);
        attribute.save(function(err) {
          if (err) console.error(err);
          res.send(JSON.stringify(attribute));
        });
      }
    },
    show: {
      json: function(req, res) {
        console.log('receive show request.');
        Attributes.findOne({id: req.params.id}, function(err, doc) {
          console.log('find model.');
          res.send(JSON.stringify(doc));
        });
      }
    },
    edit: {
      html: function(req, res) {}
    },
    update: {
      json: function(req, res) {
        console.log('receive update request.');
        var params = Attributes.filter(req.body);
        console.log(req.params.id);
        console.log(params);
        Attributes.update({id: req.params.id}, params, function(err, affected, raw) {
          if (err) {
            res.send(err, 500);
          } else {
            Attributes.findOne({id: req.params.id}, function(err, doc) {
              console.log('search after update.');
              console.log(doc);
              res.send(JSON.stringify(doc));
            });
          }
        });
      }
    },
    destroy: {
      json: function(req, res) {
        console.log('receive delete request.');
        Attributes.remove({id: req.params.id}, function(err) {
          if (err) console.error(err);
        });
        res.send('deleted.');
      }
    },
  };
};
