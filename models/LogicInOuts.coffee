exports.schema = (mongoose) ->
  new mongoose.Schema(
    id:
      type: Number
      default: 0
      required: true

    attr_id: Number
    inout: String
    required: Boolean
    validator: String
    type: String

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
  inout: true
  required: true
  validator: true
  type: true
  caption: true
  app_id: true
