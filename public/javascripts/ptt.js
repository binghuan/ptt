
var listView;
var DBG = true;
var willDeleteItem = {};
var mItemArray = [];
var parameters = {};
var articleLink;

$(document).ready(function() {
    if(DBG){
      console.log('Document Ready !');
    }
    window.applicationCache.addEventListener('updateready', function(e) {
      if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        // Browser downloaded a new app cache.
        // Swap it in and reload the page to get the new hotness.
        window.applicationCache.swapCache();
        window.location.reload();
      } else {
        console.log("Manifest didn't changed. Nothing new to server.");
      }
    }, false);

    mItemArray = getFavoriteBoards();
    updateFavoriteItemList(mItemArray);

    $('#button_deleteItem').click(deleteItem);
    $('#button_addItem').click(addItem);
});

$(document).on("pageshow", "#hot_page", function(){
  $.get( "/api/hotboard", function(data) {
      markHotBoards(data);
      var newHtml = "";
      for(var i=0; i<data.length; i++){
        var icon;
        if(data[i].isAdded){
          icon = "minus";
        }else{
          icon = "plus";
        }
        var paras = "\"" + data[i].boardName + "\",\"" + data[i].boardCap + "\",\"" + data[i].link +"\"";
        newHtml += "<li>" + "<a href='#' onclick='showArticleList("+ paras +", \"#hot_page\")' data-ajax='false' data-inline='true'>" +
          "<h3>" + data[i].boardName +"</h3> <p>" + data[i].boardCap + "</p></a>" +
          "<a href='#' data-icon='"+ icon+"' data-inline='true' data-rel='popup' data-position-to='window' data-transition='pop'></a>" +
          "</li>";
      }
      $("#hotBoardListView").empty();
      $("#hotBoardListView").html(newHtml);
      $("#hotBoardListView").listview("refresh");
  });
});

$(document).on("pageshow", "#fav_page", function(){
  updateFavoriteItemList(mItemArray);
});

$(document).on("pageshow", "#article_list_page", function(){
  console.log("on page init, the parameters : " + JSON.stringify(parameters));
  $("#article_list_page div h1").text("["+ parameters.boardTitle+"] "+ parameters.boardCap);
  $("#article_list_page div a").attr('href', parameters.ref);
  if(parameters.ref.indexOf('fav') != -1){
    $("#article_list_page div a").text("回我的最愛");
  }else{
    $("#article_list_page div a").text("回熱門看板");
  }
  $.get( "/api/articlelist/" + encodeURIComponent(parameters.boardUrl)+"/1", function(articles) {
      var newHtml = "";
      for(var i=0; i<articles.length; i++){
        var pushCount = articles[i].nrec ? articles[i].nrec : 0 ;
        newHtml += "<li>" + "<a href='#' onclick='showArticle(\""+ articles[i].link +"\")' data-ajax='false' data-inline='true' data-icon='arror-r'>" +
          "<span class='ui-li-count'>" + pushCount + "</span>" +
          "<h3>" + articles[i].title +"</h3> " + 
             "<p class='ui-li-aside'>" + articles[i].date + "</p>" +
             "<p>" + articles[i].author + "</p>" +
          "</a>" + "</li>";
      }
      $("#articlesListView").empty();
      $("#articlesListView").html(newHtml);
      $("#articlesListView").listview("refresh");
  });
});

$(document).on("pageinit", "#article_page", function(){
  console.log("get : " + articleLink);
  $.get( "/api/article/" + encodeURIComponent(articleLink), function(article) {
      $("#mainContent").append(article.rawData);
  });
});

function showArticleList(boardTitle, boardCap, boardUrl, ref){
   parameters.boardTitle = boardTitle;
   parameters.boardCap = boardCap;
   parameters.boardUrl = boardUrl;
   parameters.ref = ref;
   console.log('ready to show :' + JSON.stringify(parameters));
   $.mobile.changePage("#article_list_page");
}

function showArticle(link){
   console.log("show Article");
   articleLink = link;
   $.mobile.changePage("#article_page");
}

function addItem() {
  var itemText = $('#inputItemText').val();
  mItemArray.push(itemText);
  appendCharadeItemList(itemText, (mItemArray.length -1));
}

function deleteItem() {
  if(DBG)console.log(">>> deleteItem : " + willDeleteItem.link);
  deleteFavoriteItems(willDeleteItem); 
  updateFavoriteItemList(getFavoriteBoards());
  $("#itemListView").listview("refresh");
}

function appendCharadeItemList(itemText, index) {
    if(DBG){console.log(">>> appendCharadeItemList");}
    storeCharadeItems(mItemArray);
    var itemHtml = getItemTemplate(itemText, index);

    $("#itemListView").append(itemHtml);
    $("#itemListView").listview("refresh");
}

function getItemTemplate(boardItem, index) {
  var paras = "\"" + boardItem.title + "\",\"" + boardItem.description + "\",\"" + boardItem.link +"\"";
  var templateText = 
  "<li><a href='#' onclick='showArticleList("+ paras +", \"#fav_page\")' data-ajax='false' data-inline='true'>" + 
        "<h3>" + boardItem.title +"</h3><p>" + boardItem.description + "</p></a>" + 
        "<a onclick='fillDataToDeleteConfirmDialog(" + paras + ")' href='#deleteDialog' data-icon='minus' data-inline='true' data-rel='popup' data-position-to='window' data-transition='pop'></a>"+
        "</li>";
  return templateText;
}

function updateFavoriteItemList(itemsArray) {
    if(DBG){console.log(">>> updateFavoriteItemList: " + itemsArray.length);}
    console.log(itemsArray);
    //storeFavoriteItems(mItemArray);
    var listHtml = "", i;
    for(i=0; i< itemsArray.length; i++) {
      listHtml += getItemTemplate(itemsArray[i], i);
    }

    $("#itemListView").html(listHtml);
    $("#itemListView").listview("refresh");
}

function fillDataToDeleteConfirmDialog(boardTitle, boardDesc, boardUrl) {
  if(DBG)console.log('delete: ' + boardUrl);
  willDeleteItem = {link: boardUrl, title: boardTitle, description: boardDesc};
  $("#deleteItemText").text("看板: " + boardTitle);
}

