exports.schema = function(mongoose) {
  return new mongoose.Schema({
    id: {type: Number, default: 0, required: true},
    name: String,
    caption: String,
    data_type: String,
    length: Number,
    decimal: Number,
    app_id: String,
    created_at: {type: Number, default: Date.now},
    updated_at: {type: Number, default: Date.now}
  });
};

// to use update filter.
exports.filter = {
  name: true,
  caption: true,
  data_type: true,
  length: true,
  decimal: true,
  app_id: true
}
