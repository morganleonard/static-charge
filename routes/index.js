var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');


//create variable for path to posts directory
var postsDir = __dirname + "/../posts/";

//read contents of posts directory
fs.readdir(postsDir, function(error, directoryContents) {
	if (error){
		throw new Error(error);
	}

	//create 'posts' object containing parsed metadata and markdown contents for each post
	var posts = directoryContents.map(function(filename) {
		var postName = filename.replace('.md', '');
		
		//read entire contents of file
		var nonParsedContents = fs.readFileSync(postsDir + filename, {encoding: 'utf-8'});
		
		//split off metadata with '---' delimiter
		var splitContents = nonParsedContents.split('---')
		//console.log(splitContents)

		//split up metadata keys
		var metaData = splitContents[1].split('\n')
		console.log("***metaData: " + metaData)
	
		//pull out 'date' info from metaData array
		var date = metaData[1].replace('Date: ', '')
		//var date = splitContents[1];
		console.log("***Date: " + date);

		//pull out 'title' info from metaData array
		var title = metaData[2].replace('Title: ', '')
		//var date = splitContents[1];
		console.log("***Title: " + title);
		
		//pull out 'contents' from split file
		var contents = splitContents[2];
	
		return {postName: postName, contents: marked(contents), date: date, title: title};
	});

	// console.log(posts)


	//sort 'posts' object by date, oldest to newest
	posts.sort(function(post1, post2) {
		if (post1.date > post2.date) {
			return -1
		}
		if (post1.date < post2.date) {
			return 1
		}
		return 0;
	})

	 // console.log("Posts after sort: ");
	 // console.log(posts)

	//loop to add previousPost and nextPost key values to each post in posts
	for(i = 0; i < posts.length; i++) {
		
		//set previousPost if there is one
		if(i != 0) {
			posts[i].previousPost = posts[i-1].postName
		} else {
			posts[i].previousPost = ''
		}

		//set nextPost if there is one
		if(i < (posts.length - 1)) {
			posts[i].nextPost = posts[i+1].postName
		} else {
			posts[i].nextPost = ''
		}

	}	

	// console.log("Posts after adding previousPost and nextPost: ");
	// console.log(posts)


	//create route for index page
	router.get('/', function(request, response) {
		response.render('index', {posts:posts, title: 'All My Sh!t, Look At It!'})
	});


	//loop through posts object and create route to each post page
	posts.forEach(function(post) {
		router.get('/' + post.postName, function(request, response) {
			response.render('post', {post: post})
			//response.render('post', {postContents: post.contents, date: post.date, prevPost: post.previousPost, nextPost: post.nextPost, title: post.title})
		})
	})

})


module.exports = router;




/************************************ OLD CODE ******************************************/



// /*******************************BEGIN NEW LOOP *****************************************/

// 	//wrapper function
// 	function makeRouteForPost(i, posts) {
// 		var currentI = i;
// 		var makeRoute = function() {
// 			router.get('/' + posts[currentI].postName, function(request, response, posts) {
// 			response.render('post', {postContents: posts[currentI].contents, date: posts[currentI].date, prevPost: posts[currentI-1], nextPost: post[currentI+1]}) 
// 			})
// 		console.log(post[currentI]);
// 		console.log("current I: " + currentI);
// 		}
// 		return makeRoute;
// 	}

// 	for(i = 0; i < posts.length; i++) {
// 		{
// 			console.log(i);
// 			makeRouteForPost(i, posts);
// 			// router.get('/' + posts[i].postName, function(request, response, posts) {
// 			// response.render('post', {postContents: posts[i].contents, date: posts[i].date, prevPost: posts[i-1], nextPost: post[i+1]}) 
// 			// })
// 			// console.log(post[i]);
// 		}
// 	}	


// /*******************************END NEW LOOP *****************************************/



///*******************************BEGIN OLD LOOP *****************************************/
// 	//original loop through posts object and create route to each post page
// 	posts.forEach(function(post) {
// 		router.get('/' + post.postName, function(request, response) {
// 			response.render('post', {postContents: post.contents, date: post.date, prevPost: 'PreviousPost', nextPost: 'NextPost'})
// 			//response.render('post', {postContents: post.contents, date: post.date})
// 		})
// 	})
///*******************************END OLD LOOP *****************************************/



// /* GET home page. */
// router.get('/', function(request, response, next) {
//   response.render('index', { title: "Morgl's Blog" });
// });


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


