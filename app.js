const express = require('express');
const app = express();
const port = process.env.PORT || 7902;
const bodyParser = require('body-parser');

// setup MongoDB Atlas
require('./models/db.js');

// routes setup
var routes = require('./routes/routes.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// set the view engine
app.set('view engine', 'pug');

// test express where the static files are kept
app.use(express.static(__dirname + '/public'));

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use('/',routes);

// home page
app.get('/', function(req,res){
  res.render('map');
});

app.listen(port, function(){
  console.log("Listening on port " + port);
});
