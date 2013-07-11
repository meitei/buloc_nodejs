
/**
 * Module dependencies.
 */

var express = require('express')
  , resource = require('express-resource')
  , mongoose = require('mongoose')
  , MongoStore = require('connect-mongo')(express)
  , routes = require('./routes')
  // , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// connect to mongodb.
mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', function(err){
  console.error('mongoose connection error!!');
  console.error(err);
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: "secret of buloc.",
  store: new MongoStore({
    mongoose_connection : mongoose.connection,
    // db: 'test',
    // host: 'localhost',
    clear_interval: 60 * 60
  }),
  cookie: {
    httpOnly: false,
    maxAge: new Date(Date.now() + 60 * 60 * 1000)
  }
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/users', user.list);

app.resource('appsettings', require('./routes/appsettings'), { id: 'id' });
var attributes = require('./routes/attributes');
app.resource('attributes', attributes(mongoose), { id: 'id', format: 'json' });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
