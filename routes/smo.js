var express = require('express');
var router = express.Router();

router.post('/comment', function(req, res) {
	console.log("api : hotboard");
	res.setHeader('Content-Type', 'application/json');
	fetchHot.fetchHotBoard(function(content){
		res.send(content);
	});
});
