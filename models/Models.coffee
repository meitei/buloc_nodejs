exports.getModel = (mongoose, modelName) ->
  modelClass = undefined
  if modelName of mongoose.models
    modelClass = mongoose.model(modelName)
  else
    modelDefine = require("./" + modelName)
    schema = modelDefine.schema(mongoose)
    schema.pre "save", (next) ->
      return next()  unless @isNew
      model = this
      model.db.db.executeDbCommand
        findAndModify: "sequence"
        query:
          name: model.collection.name

        update:
          $set:
            name: model.collection.name

          $inc:
            sequence: 1

        new: true # 更新したデータを受け取るかどうか
        upsert: true # 見つからなかったら挿入するかどうか
      , (err, data) ->
        if not err and data.documents[0].ok
          
          # model.id に取得した値をセット
          model.id = data.documents[0].value.sequence
          next()
        else
          next err or new Error(data.documents[0].errmsg)

    # add filter method to schema.
    filter = modelDefine.filter
    schema.statics.filter = (params) ->
      result = {}
      for key of filter
        result[key] = params[key]  if filter[key]
      result

    modelClass = mongoose.model(modelName, schema)
  modelClass
  