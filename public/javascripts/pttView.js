function getQSParam(paramName) {
    var QS = window.location.toString();
    var indSta = QS.indexOf(paramName + "=");
    if (indSta===-1 || paramName==="") {
		return;
    }
    var indEnd=QS.indexOf('&',indSta);
    if (indEnd==-1) {
		indEnd=QS.length;
    }
    var valore = unescape(QS.substring(indSta+paramName.length+1,indEnd));
    return valore;
}




$("document").ready(function() {

    document.getElementById('pageFrame').style.height = (window.innerHeight-40)+"px";
    window.onresize = function(event) {
        document.getElementById('pageFrame').style.height = (window.innerHeight-40)+"px";
    };

	console.log("Document is ready");
	var height = $(window).height();
    //$('pageFrame').css('height', height);

	var boardInfo = {title: "", url: ""};
	boardInfo.url = getQSParam("url");
	boardInfo.title = getQSParam("title");
	var isAlreayInFavorite = isExistedInFavoriteBoards(boardInfo.url);

	document.getElementById('boardTitle').innerHTML = "看板 [" + boardInfo.title + "]";
	console.log("showBoard: " + boardInfo.title);

	var framePage = document.getElementById("pageFrame");
	framePage.src = boardInfo.url;

	console.log("done");
});
