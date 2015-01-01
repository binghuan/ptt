var DBG = true;

var items = [];
var willDeleteItem = {
	title: "",
	link:"",
	description: "",
	index: -1
};

var willAddItem = {
	title: "",
	link:"",
	description: "",
	index: -1
};


var i;
for(i=0; i< pttBoardList.length; i++) {
	var item = pttBoardList[i];
	//console.log(pttBoardList[i]);

	var boardInfo = {
		title: item[0],
		description: item[1],
		link: item[2],
		dataIndex: i
	};

	//console.info(boardInfo);
    items.push(boardInfo);
}

$('document').ready(function() {

	if(DBG)console.log("document is ready!");

	if(navigator.userAgent.toLowerCase().indexOf("trident") === -1) {
		var pinButton = document.getElementById("pinButton");
		if(pinButton != null) {
			pinButton.style.visibility = "hidden";
		}
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

	$('#button_deleteItem').click(deleteItem);
	$('#button_addItem').click(addItem);
	listItem(true);
});

function flashItem(target) {
	var duration = 500;
	$(target).fadeOut(duration).fadeIn(duration);
}

function recoverSearchResult(targetItem) {
	$("#itemlistview").hide()
	listItem();
	var backupSearchKey = $("input[data-type='search']").val();
	$("input[data-type='search']").val("---").keyup();
	setTimeout(function(){
		$("input[data-type='search']").val(backupSearchKey).keyup();
		setTimeout(function() {
			flashItem($("#itemlistview").find(':contains("' + targetItem.title +'")'));
		}, 200);
	}, 300);
	$("#itemlistview").show()
}

function addItem() {
	var itemText = $('#inputItemText').val();
	addFavoriteItems(willAddItem);
	$("#itemlistview").find(':contains("' + willAddItem.title +'")').remove()
	recoverSearchResult(willAddItem);
}

function deleteItem() {
	if(DBG)console.log(">>> deleteItem : " + willDeleteItem.link);
	deleteFavoriteItems(willDeleteItem);
	$("#itemlistview").find(':contains("' + willAddItem.title +'")').remove()
	recoverSearchResult(willDeleteItem);
}

function getItemTemplate(boardItem , isForAdded) {
	var templateText =
	"<li><a href='pttView.html?url=" + boardItem.link  +  "&title=" + boardItem.title + "' data-ajax='false' data-inline='true'>" +
        "<h3>" + boardItem.title +"</h3><p>" + boardItem.description + "</p></a>";
        if(isForAdded === true) {
			templateText += "<a onclick='fillDataToAddConfirmDialog(\"" + boardItem.title + "\",\"" + boardItem.description + "\",\"" + boardItem.link + "\",\"" + boardItem.dataIndex + "\")' href='#addDialog' data-icon='plus' data-inline='true' data-rel='popup' data-position-to='window' data-transition='pop'></a>";
        } else {
			templateText += "<a onclick='fillDataToDeleteConfirmDialog(\"" + boardItem.title + "\",\"" + boardItem.description + "\",\"" + boardItem.link + "\",\"" + boardItem.dataIndex + "\")' href='#deleteDialog' data-icon='minus' data-inline='true' data-rel='popup' data-position-to='window' data-transition='pop'></a>";
        }

        templateText = templateText + "</li>";
  return templateText;
}

function fillDataToDeleteConfirmDialog(boardTitle, boardDesc, boardUrl, dataIndex) {
  if(DBG)console.log('delete: ' + boardUrl);
  willDeleteItem = {link: boardUrl, title: boardTitle, description: boardDesc};
  $("#deleteItemText").text("看板: " + boardTitle);
}

function fillDataToAddConfirmDialog(boardTitle, boardDesc, boardUrl, dataIndex) {
	var index = -1;
	if( (typeof dataIndex) === "string") {
		index = parseInt(dataIndex, 10);
	}
  if(DBG)console.log('fillDataToAddConfirmDialog: ' + boardUrl);
  willAddItem = {link: boardUrl, title: boardTitle, description: boardDesc, index: index};
  document.getElementById("addItemText").innerHTML = "看板: " + boardTitle;
}

function listItem(isOnInit) {

	var itemTempalte = "";
	$('#itemlistview').html("");

	var i;

	var favoriteBoarsArray = getFavoriteBoards();

	for(i=0; i< items.length; i++) {
		/*
		itemTempalte +=
		"<li class='ui-li ui-li-static ui-btn-up-c'" +
		"<div class='ui-btn-inner ui-li'><div class='ui-btn-text'>"+
		"<h2 class='ui-li-heading'>" + items[i].title + "</h2>"+
		"<p class='ui-li-desc'><strong>" + items[i].description + "</strong></p>"+
		"<a data-ajax='false' class='ui-li-desc' href='pttView.html?url=" + items[i].link  +  "&title=" + items[i].title  + "'>" + items[i].link + "</a>" +
		"</li>";
		*/

		var j;
		var hit = false;
		for(j=0; j< favoriteBoarsArray.length; j++) {
			if(favoriteBoarsArray[j].link === items[i].link) {
				hit = true;
				break;
			}
		}

		itemTempalte += getItemTemplate(items[i], !hit);
	}


	$("#itemlistview").html(itemTempalte);
	$("#itemlistview").listview("refresh");
}
