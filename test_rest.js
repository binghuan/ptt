var http = require('http');
//var lala = require('./routes/fetch.js');
var pageNum = process.argv[2];
console.log(pageNum);

var options = {
	hostname : 'localhost',
	port : 3000,
	path : '/api/articlelist/'+encodeURIComponent("/bbs/Gossiping/index.html")+'/'+pageNum,
	method : 'GET'
};

var option2 = {
	hostname : 'localhost',
	port : 3000,
	path : '/api/article/'+encodeURIComponent("/bbs/sex/M.1420551984.A.3D0.html"),
	method : 'GET'
};

var option3 = {
	hostname : 'localhost',
	port : 3000,
	path : '/api/hotboard',
	method : 'GET'
};
var httpReq = http.request(option3, function(res) {
	res.on('data',(chunk) => {
		console.log("ddd" + chunk);
	});
	res.on('end', (c) => {
		console.log(c);
	});
});
httpReq.end();

/*
lala.fetchArticleList("/bbs/Gossiping/index.html", pageNum, function(result){
	console.log(result);
});*/


/*  Test Fetch Article
/article/:url
lala.fetchArticle("/bbs/sex/M.1420551984.A.3D0.html", function(result){
	console.log(result);
});
*/
