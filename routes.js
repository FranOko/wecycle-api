require('./models');

module.exports = function (app) {

//default route
    app.get('/', function(req, res) {
        res.send('Welcome to the wecycle-api, please visit this link : : to view our documentation');
    });


//get users
    app.get('/users', function(req, res){
        var query = User.where({});
        query.find(function (err, users){
            res.send(users);
            if(err) {
                res.status(404);
                res.send({
                    message: "There was an error with getting the list of users"
                });
                console.log(err);
            }
        });
    });

    app.get('/users/:user_id', function(req, res){
        var query = User.where({_id: req.params.user_id});
        query.find(function (err, users){
            res.send(users);
            if(err) {
                res.status(404);
                res.send({
                    message: "There was an error with getting the user by the users id"
                });
                console.log(err)
            }
        });
    });

//Get item posted by user
    app.get('/users/:user_id/items', function (req, res) {
        Item.find({_creator: req.params.user_id}).populate('items').populate('users').exec(function (err, item) {
            console.log(item);
            if(err) {
                console.log(err);
                res.status(400);
                res.send({
                    message: "There was an error getting the users item"
                })
            }
            res.send(item);
        });
    });

//Get items posted by user
    app.get('/users/:user_id/items/:item_id', function (req, res) {
        Item.find({_creator: req.params.user_id}).populate('items').populate('users').exec(function (err, item) {
            console.log(item);
            if(err) {
                console.log(err);
                res.status(400);
                res.send({
                    message: "There was an error getting the users item"
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
                res.status(404);
                res.send({
                    message: "There was an error"
                })
            } else {
                res.status(201);
                res.send({
                    message: "User successfully created and added"
                });
            }
        });

    });


    /**
     * Items
     */

//get items
    app.get('/items', function(req, res) {
        var query = Item.where({});
        query.find(function (err, items) {
            res.status(200);
            res.send(items);
            if(err){
                console.log(err);
                res.status(404);
                res.send({
                    message: "The was an error getting the list of items"
                })
            }
        });
    });

    app.get('/items/:item_id', function(req, res){
        var query = Item.where({_id: req.params.item_id});
        query.find(function (err, items){
            res.status(200);
            res.send(items);
            if(err){
                console.log(err);
                res.status(404);
                res.send({
                    message: "There was an error with getting your item by item id"
                })
            }
        });
    });

//post items
    app.post('/items', function(req, res){

        if (req.body.name == undefined || req.body.name == "") {
            res.status(404);
            res.send({
                message:" No name defined "
            });
        }

        if (req.body.url == undefined || req.body.url == "") {
            res.status(404);
            res.send({
                message:"Please give url of photos of items"
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
                        message: "Something went wrong with trying to post your item"
                    })
                } else {
                    console.log(newItem);
                    res.status(201);
                    res.send({
                        message: "item successfully created and added"
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
                    message: "Please enter the correct username"
                })
            }

            item.save(function (err) {
                if (!err) {
                    console.log("updated successfully");
                    res.status(200);
                    res.send({
                        message: "updated successfully"
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
                    message:"item not deleted"
                });
                console.log(err);
            } else {
                res.status(200);
                res.send({
                    message:"item deleted"
                });
            }
        });
    });
};

