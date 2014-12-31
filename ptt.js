var reader;
var progress;
var listView;

var DBG = true;

var willDeleteItem = {};
var mItemArray = [];

$('document').ready(function() {
    if(DBG){console.log('Document Ready !');}

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

    listView = document.getElementById('charadeListView');
    mItemArray = getFavoriteBoards();
    updateFavoriteItemList(mItemArray);

    $('#button_deleteItem').click(deleteItem);
    $('#button_addItem').click(addItem);
});

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
  var templateText = 
  "<li><a href='pttView.html?url=" + boardItem.link  +  "&title=" + boardItem.title + "' data-ajax='false' data-inline='true'>" + 
        "<h3>" + boardItem.title +"</h3><p>" + boardItem.description + "</p></a>" + 
        "<a onclick='fillDataToDeleteConfirmDialog(\"" + boardItem.title + "\",\"" + boardItem.description + "\",\"" + boardItem.link + "\")' href='#deleteDialog' data-icon='minus' data-inline='true' data-rel='popup' data-position-to='window' data-transition='pop'></a>"+
        "</li>";
  return templateText;
}



function updateFavoriteItemList(itemsArray) {
    if(DBG){console.log(">>> updateFavoriteItemList: " + itemsArray.length);}
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

