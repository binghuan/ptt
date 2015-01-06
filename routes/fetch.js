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
	fetchArticleList : function(url, callback){
		try{
			var options = { 
			    hostname : 'www.ptt.cc',
			    headers : {Cookie : 'over18=1'},
			    port : 443,
			    path : url,
			    method : 'GET'
			};
			var rawHTML;
			var httpReq = https.request(options, function(outsideRes) {
			  	outsideRes.on('data', function (chunk) {
			  		rawHTML += chunk;
			  	});
			  	outsideRes.on('end', function(){
			  		var result = [];
			  		var doms = cheerio.load(rawHTML);
			  		doms(".r-list-container > .r-ent").each(function(idx, e){
			  			var tmpObj = {};
			  			//tmpObj.link = "dd";
			  			tmpObj.link = doms(e).children('.title').children().attr('href');
			  			tmpObj.title = doms(e).children('.title').text();
			  			tmpObj.nrec = doms(e).children('.nrec').text();
			  			tmpObj.date = doms(e).children('.meta').children('.date').text();
			  			tmpObj.author = doms(e).children('.meta').children('.author').text();
			  			result.push(tmpObj);
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
