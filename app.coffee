
###
Module dependencies.
###
express = require("express")
resource = require("express-resource")
mongoose = require("mongoose")
MongoStore = require("connect-mongo")(express)
i18n = require("i18n")
routes = require("./routes")

# , user = require('./routes/user')
http = require("http")
path = require("path")
app = express()

# connect to mongodb.
mongoose.connect "mongodb://localhost/test"
mongoose.connection.on "error", (err) ->
  console.error "mongoose connection error!!"
  console.error err

# i18n
i18n.configure({
    locales:['ja', 'en'],
    defaultLocale: 'ja',
    cookie: 'buloc_i18n',
    directory: './locales'
});

# all environments
app.set "port", process.env.PORT or 3000
app.set "views", __dirname + "/views"
app.set "view engine", "ejs"
app.disable 'x-powered-by'
app.use express.favicon()
app.use express.logger("dev")
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.cookieParser()
app.use express.session(
  secret: "secret of buloc."
  store: new MongoStore(
    mongoose_connection: mongoose.connection
    
    # db: 'test',
    # host: 'localhost',
    clear_interval: 60 * 60
  )
  cookie:
    httpOnly: false
    maxAge: new Date(Date.now() + 60 * 60 * 1000)
)
app.use i18n.init
app.use require("./routes/prerender")
app.use app.router
app.use express.static(path.join(__dirname, "public"))

# development only
app.use express.errorHandler()  if "development" is app.get("env")

# default page
app.get "/", routes.index


app.resource "appsettings", require("./routes/appsettings"),
  id: "id"

# attributes = require("./routes/attributes")

# routes
BaseRoute = require("./routes/baseRoute")
route = new BaseRoute(app, mongoose)

route.add("attributes", "Attributes")
route.add("views", "Views")
route.add("entities", "Entities")



http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")
