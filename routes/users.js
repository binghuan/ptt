
var express = require('express');
var fetchHot = require('./fetch.js');

var router = express.Router();
/* GET users listing. */
router.get('/hotboard', function(req, res) {
	console.log("api : hotboard");
	res.setHeader('Content-Type', 'application/json');
	fetchHot.fetchHotBoard(function(content){
		res.send(content);
	});
});

router.get('/articlelist/:url', function(req, res) {
	console.log("api : articlelist");
	console.log("params : " + req.params.url);
	res.setHeader('Content-Type', 'application/json');
	fetchHot.fetchArticleList("/" + req.params.url, function(content){
		res.send(content);
	});
});

module.exports = router;
