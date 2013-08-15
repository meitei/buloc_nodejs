exports.schema = (mongoose) ->
  new mongoose.Schema(
    id:
      type: Number
      default: 0
      required: true

    view_id: Number
    attr_id: Number
    label: String
    caption: String
    control_type: String
    max_length: Number
    attr_format: String
    choices_id: Number

    created_at:
      type: Number
      default: Date.now

    updated_at:
      type: Number
      default: Date.now
  )

# to use update filter.
exports.filter =
  view_id: true
  attr_id: true
  label: true
  caption: true
  control_type: true
  max_length: true
  attr_format: true
  choices_id: true
