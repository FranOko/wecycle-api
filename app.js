var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://heroku_app33373738:k0cja96r943p0h5p5rdbjok3sn@ds033831.mongolab.com:33831/heroku_app33373738');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.send('<h1>Hello, Welcome to WE-CYCLE!</h1>');
});

app.get('/items', function(req, res) {
    res.send('<h1>Welcome to the Items page</h1>');
});

app.get('/users', function(req, res){
    res.send('list of users')
});

var User = mongoose.model('User', {
    email: String,
    password: String
});

var items = mongoose.model('items', {
    title: String,
    description: String
});


app.post('/users', function(req, res){
    console.log("Params: " + req.body.email + "");
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    console.log("About to save user");
    user.save(function (err, newUser) {
        if (err)
            return console.error(err);
        res.send({
            message: "User successfully added"
        });
    });
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});