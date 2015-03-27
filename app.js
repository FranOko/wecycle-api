var restify = require('restify');
var app = restify.createServer();
var mongoose = require('mongoose');
var http = require('http');



app
    .use(restify.fullResponse())
    .use(restify.bodyParser({ mapParams: false }));


require('./routes')(app);
models = require('./models');

//connection to mongodb
mongoose.connect('mongodb://heroku_app33373738:k0cja96r943p0h5p5rdbjok3sn@ds033831.mongolab.com:33831/heroku_app33373738');



//listening @ localhost port
app.listen((process.env.PORT || 5000), function() {
    console.log("Node app is running at localhost");
});

User = models.User;
Item = models.Items;