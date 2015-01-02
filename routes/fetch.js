var https = require('https');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

iconv.extendNodeEncodings();
module.exports = {
	fetchHotBoard : function(callback){
		try{	
			var options = { 
			    hostname : 'www.ptt.cc',
			    port : 443,
			    path : '/hotboard.html',
			    method : 'GET'
			};
			var rawHTML;
			var httpReq = https.request(options, function(outsideRes) {
				outsideRes.setEncoding('big5');
			  	outsideRes.on('data', function (chunk) {
			  		rawHTML += chunk;
			  	});
			  	outsideRes.on('end', function(){
			  		var result = [];
			  		var doms = cheerio.load(rawHTML);
			  		doms("#prodlist > dl > dd").each(function(idx, elm){
			  			var resultObj = {};
			  			doms(elm).children().children().children().each(function(i, e){
			  				if(i == 0){
			  					resultObj.hotness = parseInt(doms(e).text().match('-*[0-9]+')[0]);
			  				}else if(i == 1){
			  					resultObj.boardName = doms(e).text();
			  					resultObj.link = doms(e).children('a').attr('href');
			  				}else if(i == 2){
								resultObj.boardCap = doms(e).text();
			  				}
			  			});
			  			result.push(resultObj);
			  			console.log(JSON.stringify(resultObj));
			  		});
			  		callback(JSON.stringify(result));
			  	})
			});
			httpReq.end();	
		}catch(e){
			console.log(e.message);
			callback(e.message);
		}
	},
	fetchArticle : function(){
		return "under construction";
	}
}
