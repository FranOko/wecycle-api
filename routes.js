require('./models');

module.exports = function (app) {

//default route
    app.get('/', function(req, res) {
        res.send('default route');
    });



//get users
    app.get('/users', function(req, res){
        var query = User.where({});
        query.find(function (err, users){
            res.send(users);
        });
    });

    app.get('/users/:user_id', function(req, res){
        var query = User.where({_id: req.params._id});
        query.find(function (err, users){
            res.send(users);
        });
    });


    app.get('/users/:user_id/items', function (req, res) {
        Item.find({_creator: req.params.user_id}).populate('items').populate('users').exec(function (err, item) {
            console.log(item);
            console.log(err);
            res.send(item);
        });
    });


//post users
    app.post('/users', function(req, res){
        //console.log("Params: " + req.params.email + "");
        var user = new User({
            // _id:req.params._id,
            email: req.params.email,
            password: req.params.password,
            phone_number: req.params.phone_number,
            name: req.params.name
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


    /**
     * Items
     */

//get items
    app.get('/items', function(req, res) {
        var query = Item.where({});
        query.find(function (err, items) {
            res.send(items);
        });
    });

    app.get('/items/:item_id', function(req, res){
        var query = Item.where({_id: req.params.item_id});
        query.find(function (err, items){
            res.send(items);
        });
    });


//put items

    app.put('/items/:item_id', function(req, res){

        var query = Item.where({_id: req.params.item_id});
        query.find({_id: req.params.item_id}, function (err, items)
        {
            item.name = req.body.name;
            item.description = req.body.description;
            item.url = req.body.url;
            req.item.save(function (err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                res.send(204, item);
            });
        });
    });

//post items
    app.post('/items', function(req, res){

        if (req.params.name == undefined || req.params.name == "") {
            res.status(404);
            res.send({
                message:" No name defined "
            });
        }

        if (req.params.user_email == undefined || req.params.user_email == "") {
            res.status(404);
            res.send({
                message:" Please give name and contact details "
            });
        }

        if (req.params.url == undefined || req.params.url == "") {
            res.status(404);
            res.send({
                message:"Please give url of photos of items"
            });
        }

        var query = User.findOne({email: req.params.user_email});
        query.exec(function (err, user) {
            var item = new Item({
                name: req.params.name,
                description: req.params.description,
                url: req.params.url.split(", "),
                _creator: user._id
            });
            console.log(user)
            item.save(function (err, newItem) {
                if (err) {
                    res.status(404);
                    console.error(err);
                    res.send({
                        message: "Something went wrong"
                    })
                } else {
                    console.log(newItem);
                    res.status(200);
                    res.send({
                        message: "item successfully added"
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