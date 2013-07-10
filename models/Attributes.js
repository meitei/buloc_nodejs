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
