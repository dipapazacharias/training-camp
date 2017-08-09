var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/nodeblog');
var multer = require('multer');
var upload = multer({ dest: './public/images' });


router.get('/show/:id', function(req, res, next) {
	var posts = db.get('posts');
	posts.findOne({ _id: req.params.id })
	.then(function(post){
		console.log(post)
		res.render('show', {
			'post': post
		});	
	})
	.catch((err)=> {
		console.log(err);
	});
});

router.get('/add', function(req, res, next) {
	var categories = db.get('categories');
	categories.find({}, {}, function(err, categories){
		res.render('addpost', {
			'title': 'Add post',
			'categories': categories
		});	
	})
  
});

router.post('/add', upload.single('mainimage'), function(req, res, next) {
	var title = req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body.author;
	var date = new Date();

	// Check image upload
	if(req.file){
		var mainimage = req.file.filename;
	} else {
		var mainimage = 'noimage.jpeg';
	}

	// Form Validation
	req.checkBody('title', 'Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check errors
	var errors = req.validationErrors();
	if(errors){
		res.render('addpost', { "errors": errors });
	} else {
		var posts = db.get('posts')
		posts.insert({
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"author": author,
			"mainimage": mainimage
		}, function(err, post){
			if(err){
				res.send(err);
			} else {
				req.flash('success', 'Post Added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

router.post('/addcomment', function(req, res, next) {
	var postid = req.body.postid;	
	var name = req.body.name;
	var email = req.body.email;
	var body = req.body.body;
	var commentdate = new Date();

	// Form Validation
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required but never displayed').notEmpty();
	req.checkBody('email', 'Email has not proper format').isEmail();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check errors
	var errors = req.validationErrors();
	if(errors){
		var posts = db.get('posts');
		posts.findOne({ _id: postid })
		.then(function(post){
			res.render('show', {
				'errors': errors,
				'post': post
			});	
		})
		.catch((err)=> {
			console.log(err);
		});
	} else {
		var comment = {
			"name": name,
			"email": email,
			"body": body,
			"commentdate": commentdate
		}

		var posts = db.get('posts');
		posts.update({
			"_id": postid
		}, {
			$push: {
				"comments": comment
			}
		}, function(err, doc){
			if(err){
				throw err;
			} else {
				req.flash('success', 'Comment Added');
				res.location('/posts/show/'+postid);
				res.redirect('/posts/show/'+postid);
			}
		});
	}
});

module.exports = router;