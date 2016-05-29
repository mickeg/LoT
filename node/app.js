//Use nodemon app.js to track changes..

var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 8081;



var testdata = require('./testdata/data_small.json');


app.set('views', __dirname + '/views')
app.set('view engine', 'html');
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/testdata', function(req, res) {
        res.setHeader("Content-Type", "application/json");
        res.json(testdata); 
    });

app.listen(port, function() {
  console.log('Listening on port ' + port)
})

