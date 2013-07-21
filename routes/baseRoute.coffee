jade = require("jade")
glob = require("glob")
fs = require("fs")

class BaseRoute
  constructor: (@app, @db) ->

  precompile: ->

    # @templates = undefined
    @templates = {}
    # compile templates
    # app.set "templates", {}
    glob "**/*.jade", null, (err, files) =>
      # obj = {}
      for file in files
        console.log "compile ... #{file}"
        # fs.readFile file, 'utf8', (ferr, fdata) ->
        fdata = fs.readFileSync file, 'utf8'
        # console.log "finished to read file, #{file}"
        fn = jade.compile fdata,
          filename: file
          client: true
          pretty: false
          compileDebug: false
        # templates = app.get "templates"
        key = file.split('.').shift().split('/').pop()
        # console.log templates
        @templates[key] = fn
        console.log "template =>"
        console.log @templates
      # app.set "templates", templates
      # @templates = obj

  add: (routePath, modelName) ->
    console.log "add routePath: #{routePath}"

    if modelName
      models = require("../models/Models")
      Model = models.getModel(@db, modelName)

      route = this.getRoute(Model)

      @app.resource routePath, route,
        id: "id"
        format: "json"
    else
      # app = @app
      # templates = @templates
      # console.log @templates
      # jade = @jade
      wr =
        html: (req, res) =>
          # for k,v of @templates
          #   console.log "template key => #{k}"
          # if routePath of @templates
          #   console.log "find ;) compiled template."
          #   fn = @templates[routePath]
          #   res.send fn()
          # else
          #   console.log "not find X) compiled template."
          #   res.render routePath
          res.render routePath

      route =
        index: wr
        show: wr

      # set route to path.
      @app.resource routePath, route,
        id: "id"

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
