exports.getModel = function(mongoose, modelName) {
  var modelClass;
  if (modelName in mongoose.models) {
    modelClass = mongoose.model(modelName);
  } else {
    var modelDefine = require('./' + modelName);
    var schema = modelDefine.schema(mongoose);
    schema.pre('save', function(next) {
        if(!this.isNew) return next();
     
        var model = this;
     
        model.db.db.executeDbCommand({
            findAndModify: 'sequence', // 'コマンド名': '対象のコレクション名'
            query: { name: model.collection.name }, // 検索オプション
            update: { $set: { name: model.collection.name }, $inc: { sequence: 1 } },
            new: true, // 更新したデータを受け取るかどうか
            upsert: true // 見つからなかったら挿入するかどうか
        }, function(err, data) {
            if(!err && data.documents[0].ok) {
                // model.id に取得した値をセット
                model.id = data.documents[0].value.sequence;
                next();
            } else {
                next(err || new Error(data.documents[0].errmsg));
            }
        });
    });
    // add filter method to schema.
    var filter = modelDefine.filter;
    schema.statics.filter = function(params) {
      var result = {};
      for (var key in filter) {
        if (filter[key]) result[key] = params[key];
      }
      return result;
    };
    modelClass = mongoose.model(modelName, schema);
  }
  return modelClass;
};
