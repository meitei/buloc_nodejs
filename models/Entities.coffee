exports.schema = (mongoose) ->
  new mongoose.Schema(
    id:
      type: Number
      default: 0
      required: true

    name: String
    caption: String
    cached: Boolean
    reflected: Boolean
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
  cached: true
  app_id: true
