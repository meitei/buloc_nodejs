exports.schema = (mongoose) ->
  new mongoose.Schema(
    id:
      type: Number
      default: 0
      required: true

    name: String
    caption: String
    template_id: Number
    html: String
    css: String
    display_type: Number
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
  template_id: true
  html: true
  css: true
  display_type: true
  app_id: true
