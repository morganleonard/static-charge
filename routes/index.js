var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');

// /* GET home page. */
// router.get('/', function(request, response, next) {
//   response.render('index', { title: "Morgl's Blog" });
// });

//create routes for each page in posts directory
var postsDir = __dirname + "/../posts/";
fs.readdir(postsDir, function(error, directoryContents) {
	if (error){
		throw new Error(error);
	}

	var posts = directoryContents.map(function(filename) {
		var postName = filename.replace('.md', '');
		var contents = fs.readFileSync(postsDir + filename, {encoding: 'utf-8'});
		return {postName: postName, contents: marked(contents)};
	});

	router.get('/', function(request, response) {
		response.render('index', {posts:posts, title: 'all posts'})
	});

	posts.forEach(function(post) {
		router.get('/' + post.postName, function(request, response) {
			response.render('post', {postContents: post.contents})
		})
	})
})


// 	directoryContents.forEach(function(postFileName) {
// 		var postName = postFileName.replace('.md', '');
// 		fs.readFile(postsDir + postFileName, {encoding: 'utf-8'}, function(error, fileContents) {
// 			if(error) {
// 				throw new Error(error);
// 			}

// 			var renderedPost = marked(fileContents);
		
// 			router.get('/' + postName, function(request, response) {
// 				response.render('post', {postContents: renderedPost});
// 			})

// 		})
// 	})
// })

module.exports = router;
