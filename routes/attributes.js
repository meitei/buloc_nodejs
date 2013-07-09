module.exports = function(mongoose) {

  var models = require('../models/Models');
  var Attributes = models.getModel(mongoose, 'Attributes');

  return {
    index: {
      json: function(req, res) {
        // var models = require('../models/Models');
        // var Attributes = models.getModel(mongoose, 'Attributes');
        Attributes.find({}, function(err, models) {
          console.log('find models.');
          res.send(JSON.stringify(models));
        });
      }
    },
    new: {
      json: function(req, res) {

      }
    },
    create: {
      json: function(req, res) {
        // console.log(req);
        var attribute = new Attributes(req.body);
        attribute.save(function(err) {
          if (err) console.error(err);
          res.send(JSON.stringify(attribute));
        });
      }
    },
    show: {
      json: function(req, res) {

      }
    },
    edit: {
      json: function(req, res) {

      }
    },
    update: {
      json: function(req, res) {

      }
    },
    destroy: {
      json: function(req, res) {

      }
    },
  };
};

// exports.index = {
//   json: function(req, res) {
//     var model = require('../models/Attributes');
//     var Attributes = model.getModel(mongoose);
//     Attributes.find({}, function(err, models) {
//       console.log('find models.');
//       res.send(models.toJSON());
//     });
//   }
// };