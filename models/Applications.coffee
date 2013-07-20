exports.schema = (mongoose) ->
  new mongoose.Schema(
    id:
      type: Number
      default: 0
      required: true

    name: String
    caption: String
    tags: String
    group: String
    public: Boolean
    owner: Number

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
  tags: true
  group: true
  public: true
