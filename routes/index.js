var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', { title: "Morgl's Blog" });
});


//create routes for each page in posts directory
fs.readdir(__dirname + '/../posts', function(error, directoryContents) {
	if (error){
		throw new Error(error);
	}

	directoryContents.forEach(function(postFileName) {
		var postName = postFileName.replace('.jade', '');
		router.get('/' + postName, function(request, response) {
			response.render('../posts/' + postFileName, {});
		})
	})
})

module.exports = router;
