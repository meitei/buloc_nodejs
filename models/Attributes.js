exports.schema = function(mongoose) {
  return new mongoose.Schema({
    name: String,
    caption: String,
    data_type: String,
    length: Number,
    decimal: Number,
    app_id: String
  });
};
