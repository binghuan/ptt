var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var co = require('co');
var assert = require('assert');

var router = express.Router();

router.post('/comment', function(req, res) {
	console.log("api : create comment");
	res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body);
	co(function*() {
  		// Connection URL
  		var db = yield MongoClient.connect('mongodb://dixen:dixen@ds051575.mongolab.com:51575/dixen_poc');
  		console.log("Connected correctly to server");
		// Insert a single document
		var r = yield db.collection('inserts').insertOne(req.body);
		assert.equal(1, r.insertedCount);
		console.log(r);
  		// Close connection
  		db.close();
	}).catch(function(err) {
	  console.log(err.stack);
	});
    res.end("");
});

module.exports = router;
