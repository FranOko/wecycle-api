require('./models');

module.exports = function (app) {

//default route
    app.get('/', function(req, res) {
        res.send('Welcome to the wecycle-api, please visit this link : : to view our documentation');
    });


//get all users
    app.get('/users', function(req, res){
        var query = User.where({});
        query.find(function (err, users){
            res.send(users);
            if(err) {
                res.status(404);
                res.send({
                    Error: "There was an error getting the list of users, please enter the correct URI."
                });
                console.log(err);
            }
        });
    });

//get a user 
   app.get('/users/:user_id', function(req, res){
        var query = User.where({_id: req.params.user_id});
        query.find(function (err, users){
            res.send(users);
            if(err) {
                res.status(404);
                res.send({
                    Error: "There was an error getting the user, please provide the correct user ID."
                });
                console.log(err)
            }
        });
    });

//Get items posted by user
    app.get('/users/:user_id/items', function (req, res) {
        Item.find({_creator: req.params.user_id}).populate('items').populate('users').exec(function (err, item) {
            console.log(item);
            if(err) {
                console.log(err);
                res.status(404);
                res.send({
                    Error: "There was an error getting the user's items, please provide the correct user ID"
                })
            }
            res.send(item);
        });
    });

//Get an item posted by user - (been trying to get route to work but unable to get it working) 
    app.get('/users/:user_id/items/:item_id', function (req, res) {
        Item.find({_creator: req.params.user_id}).populate('items').populate('users').exec(function (err, item) {
            console.log(item);
            if(err) {
                console.log(err);
                res.status(404);
                res.send({
                    Error: "There was an error getting the item, please provide the correct item ID or correct user ID"
                })
            }
            res.send(item);
        });
    });
    
//post users
    app.post('/users', function(req, res){
        //console.log("Params: " + req.params.email + "");
        var user = new User({
            // _id:req.params._id,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            name: req.body.name
        });

        //console.log("Params: " + req.params.email + "");

        console.log("About to save user");
        user.save(function (err, newUser) {
            if (err) {
                console.error(err);
                res.status(400);
                res.send({
                    Error: "Unable to add new user, please check the data you entered is correct."
                })
            } else {
                res.status(201);
                res.send({
                    Message: "User successfully created and added"
                });
            }
        });

    });

//update user 
    app.put('/users/:user_id', function (req, res){
        User.findById(req.params.user_id, function (err, user) {
            
            //console.log(req.body.name);
            
            var data = JSON.parse(req.body);
            user.name = data.name;
            user.email = data.email;
            user.password = data.password;
            user.phone_number = data.phone_number;

            user.save(function (err) {
                
                if (err) {
                    console.log("error");
                    res.status(404);
                    res.send({
                        Error: "Please provide the correct user ID"
                    })
                } else {
                    res.status(200);
                    res.send({
                    Message: "User successfully created and added"
                });      
            }
        });
    });
});

//delete users 
  app.del('/users/:user_id', function (req, res) {

        var query = User.where({_id: req.params.user_id});
        query.remove(function (err) {
            if(err){
                res.status(404);
                res.send({
                    Error: "Please provide the correct user ID."
                });
                console.log(err);
            } else {
                res.status(200);
                res.send({
                    Message:"User successfully deleted."
                });
            }
        });
    });


/******  Items   ******/

//get all items
    app.get('/items', function(req, res) {
        var query = Item.where({});
        query.find(function (err, items) {
            res.status(200);
            res.send(items);
            if(err){
                console.log(err);
                res.status(404);
                res.send({
                    Error: "There was an error getting the list of items, please enter the correct URI"
                })
            }
        });
    });

//get an item
    app.get('/items/:item_id', function(req, res){
        var query = Item.where({_id: req.params.item_id});
        query.find(function (err, items){
            res.status(200);
            res.send(items);
            if(err){
                console.log(err);
                res.status(404);
                res.send({
                    Error: "There was an error getting the item, please provide the correct item ID."
                })
            }
        });
    });

//post items
    app.post('/items', function(req, res){

        if (req.body.name == undefined || req.body.name == "") {
            res.status(400);
            res.send({
                Error:" No name defined "
            });
        }

        if (req.body.url == undefined || req.body.url == "") {
            res.status(400);
            res.send({
                Message:"Please give url of the photos for the item"
            });
        }

        var query = User.findOne({email: req.body.user_email});
        query.exec(function (err, user) {
            var item = new Item({
                name: req.body.name,
                description: req.body.description,
                url: req.body.url.split(", "),
                _creator: user._id
            });
            console.log(user);
            item.save(function (err, newItem) {
                if (err) {
                    res.status(404);
                    console.error(err);
                    res.send({
                        Error: "Something went wrong with trying to create the item, please check the data you entered is correct."
                    })
                } else {
                    console.log(newItem);
                    res.status(201);
                    res.send({
                        Message: "Item successfully created and added"
                    })
                }
            });
        });
    });

//update item
    app.put('/items/:item_id', function (req, res){
        Item.findById(req.params.item_id, function (err, item) {
            console.log(req.body.name);

            var data = JSON.parse(req.body);
            item.name = data.name;
            item.description = data.description;
            item.url = data.url;
            item._creator = data._creator;

            if(item._creator != User._id){
                res.status(404);
                res.send({
                    Error: "Please provide the correct item ID."
                })
            }

            item.save(function (err) {
                if (!err) {
                    console.log("updated successfully");
                    res.status(200);
                    res.send({
                        Message: "Item updated successfully"
                    })
                } else {
                    console.log(err);
                }
                res.send(item);
            });
        });
    });

//delete item
    app.del('/items/:item_id', function (req, res) {

        var query = Item.where({_id: req.params.item_id});
        query.remove(function (err) {
            if(err){
                res.status(404);
                res.send({
                    Error:"Please provide the correct item ID."
                });
                console.log(err);
            } else {
                res.status(200);
                res.send({
                    Message:"Item successfully deleted."
                });
            }
        });
    });
}