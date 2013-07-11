module.exports = (mongoose) ->
  models = require("../models/Models")
  Attributes = models.getModel(mongoose, "Attributes")

  index:
    json: (req, res) ->
      Attributes.find {}, (err, models) ->
        console.log "find models."
        res.send JSON.stringify(models)

  new:
    html: (req, res) ->

  create:
    json: (req, res) ->
      params = Attributes.filter(req.body)
      attribute = new Attributes(params)
      attribute.save (err) ->
        console.error err  if err
        res.send JSON.stringify(attribute)

  show:
    json: (req, res) ->
      console.log "receive show request."
      Attributes.findOne
        id: req.params.id
      , (err, doc) ->
        console.log "find model."
        res.send JSON.stringify(doc)

  edit:
    html: (req, res) ->

  update:
    json: (req, res) ->
      console.log "receive update request."
      params = Attributes.filter(req.body)
      console.log req.params.id
      console.log params
      Attributes.update
        id: req.params.id
      , params, (err, affected, raw) ->
        if err
          res.send err, 500
        else
          Attributes.findOne
            id: req.params.id
          , (err, doc) ->
            console.log "search after update."
            console.log doc
            res.send JSON.stringify(doc)

  destroy:
    json: (req, res) ->
      console.log "receive delete request."
      Attributes.remove
        id: req.params.id
      , (err) ->
        console.error err  if err

      res.send "deleted."
