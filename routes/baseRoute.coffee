class BaseRoute
  constructor: (@app, @db) ->

  add: (routePath, modelName) ->
    console.log "add routePath: #{routePath}"

    models = require("../models/Models")
    Model = models.getModel(@db, modelName)

    route = this.getRoute(Model)

    @app.resource routePath, route,
      id: "id"
      format: "json"

  getRoute: (Model) ->
    index:
      json: (req, res) ->
        Model.find {}, (err, models) ->
          console.log "find models."
          res.send JSON.stringify(models)

    new:
      html: (req, res) ->

    create:
      json: (req, res) ->
        params = Model.filter(req.body)
        model = new Model(params)
        model.save (err) ->
          console.error err if err
          res.send JSON.stringify(model)

    show:
      json: (req, res) ->
        console.log "receive show request."
        Model.findOne
          id: req.params.id
        , (err, doc) ->
          console.log "find model."
          res.send JSON.stringify(doc)

    edit:
      html: (req, res) ->

    update:
      json: (req, res) ->
        console.log "receive update request."
        params = Model.filter(req.body)
        # console.log req.params.id
        # console.log params
        Model.update
          id: req.params.id
        , params, (err, affected, raw) ->
          if err
            res.send err, 500
          else
            Model.findOne
              id: req.params.id
            , (err, doc) ->
              console.log "search after update."
              console.log doc
              res.send JSON.stringify(doc)

    destroy:
      json: (req, res) ->
        console.log "receive delete request."
        Model.remove
          id: req.params.id
        , (err) ->
          console.error err  if err

        res.send "deleted."

module.exports = BaseRoute
