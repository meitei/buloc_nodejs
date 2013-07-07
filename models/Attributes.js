exports.getModel = function(mongoose) {
  var modelName = 'Attributes',
      modelClass;

  if (modelName in mongoose.models) {
    modelClass = mongoose.model(modelName);
  } else {
    var schema = new mongoose.Schema({
      name: String,
      caption: String,
      data_type: String,
      length: Number,
      decimal: Number,
      app_id: Number
    });
    modelClass = mongoose.model(modelName, schema);
  }
  return modelClass;
};
//module.exports = Attributes;
