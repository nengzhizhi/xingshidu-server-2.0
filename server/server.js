var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var bodyParser = require('body-parser');

var app = module.exports = loopback();

//path for angular client
app.use(loopback.static(path.resolve(__dirname, '../client/backend/app')));
//path for bower_components
app.use(loopback.static(path.resolve(__dirname, '../client/backend/')));
// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.set('views', path.join(__dirname, '../client/share-page'));
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
