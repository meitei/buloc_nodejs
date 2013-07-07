module.exports = function(mongoose) {
  return {
    index: function(req, res) {
      var model = require('../models/Attributes');
      var Attributes = model.getModel(mongoose);
      Attributes.find({}, function(err, models) {
        console.log('find models.');
        res.send(JSON.stringify(models));
      });
    }
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