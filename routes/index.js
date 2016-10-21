var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get the helloworld page
router.get('/helloworld', function(req, res){
	res.render('helloworld', {title : 'Hello, World!'});
});

// Get userlist page
router.get('/userlist', function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/newuser', function(req,res){
	res.render('newuser', {title: 'Add new user'});
});

// POST to add user
router.post('/adduser', function(req,res){
	var db = req.db;

	var username = req.body.username;
	var email = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({
		"username": username,
		"email": email
	}, function(err,doc){
		if (err){
			res.send("There was a problem adding the information to the database.");
		}
		else{
			res.redirect("userlist");
		}
	});
});

module.exports = router;
