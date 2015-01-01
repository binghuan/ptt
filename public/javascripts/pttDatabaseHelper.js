function restoreDefaultFavoriteBoards() {
    storeCharadeItems(getDefaultCharadeItems());
}

function getFavoriteBoards() {
    if((localStorage.MY_PTT_BOARS == null) ||
        (localStorage.MY_PTT_BOARS == undefined) ||
        (localStorage.MY_PTT_BOARS == "")) {
        
        var defaultValue = [{"link":"http://www.ptt.cc/bbs/Tech_Job/index.html","title":"Tech_Job","description":"[科技版] !科技業也要關心服貿!"},{"link":"http://www.ptt.cc/bbs/Soft_Job/index.html","title":"Soft_Job","description":"軟體工作：微加班費"},{"link":"http://www.ptt.cc/bbs/Gossiping/index.html","title":"Gossiping","description":"[八卦] 天佑台灣"}];
        storeFavoriteItems(defaultValue);
    }
    
    return JSON.parse(localStorage.MY_PTT_BOARS);
}

function isExistedInFavoriteBoards(boardLink) {
    var dataArray = getFavoriteBoards();
    var i;
    var hit =false;
    for(i=0; i< dataArray.length ; i++) {
        if(boardLink === dataArray[i].link) {
            hit = true;
            break;
        }
    }

    console.log("isExistedInFavoriteBoards: " + hit, boardLink);
    return hit;
}

function storeFavoriteItems(value) {
    localStorage.MY_PTT_BOARS = JSON.stringify(value);
}

function deleteFavoriteItems(value) {
    var dataArray = getFavoriteBoards();

    var i;
    var hit = false;
    for(i=0; i< dataArray.length ; i++) {
        if(dataArray[i].link === value.link) {
            hit = true;
            dataArray.splice(i, 1);
            break;
        }
    }

    storeFavoriteItems(dataArray);
    
}

function addFavoriteItems(value) {
    var dataArray = getFavoriteBoards();
    var i;
    var hit = false;
    for(i=0; i< dataArray.length ; i++) {
        if(dataArray[i].link === value.link) {
            hit = true;
            break;
        }
    }

    if(hit === false) {
        dataArray.push(value);
        storeFavoriteItems(dataArray);    
    }
    
}
