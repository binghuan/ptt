
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
//mongodb://<dbuser>:<dbpassword>@ds051575.mongolab.com:51575/dixen_poc
var url = 'mongodb://dixen:dixen@ds051575.mongolab.com:51575/dixen_poc';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});

/*  Test Fetch Article

lala.fetchArticle("/bbs/sex/M.1420551984.A.3D0.html", function(result){
	console.log(result);
});
*/
