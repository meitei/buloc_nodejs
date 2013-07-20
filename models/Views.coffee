exports.schema = (mongoose) ->
  new mongoose.Schema(
    id:
      type: Number
      default: 0
      required: true

    name: String
    caption: String
    view_type: String
    app_id: Number

    created_at:
      type: Number
      default: Date.now

    updated_at:
      type: Number
      default: Date.now
  )

# to use update filter.
exports.filter =
  name: true
  caption: true
  view_type: true
  app_id: true
