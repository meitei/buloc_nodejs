exports.schema = (mongoose) ->
  new mongoose.Schema(
    id:
      type: Number
      default: 0
      required: true

    attr_id: Number
    caption: String

    created_at:
      type: Number
      default: Date.now

    updated_at:
      type: Number
      default: Date.now
  )

# to use update filter.
exports.filter =
  attr_id: true
  caption: true
