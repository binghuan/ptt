
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

module.exports = router;
