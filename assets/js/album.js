var albumID = parseInt(getAllUrlParams().id);

loadAlbumInfo();


var data;

function loadAlbumInfo(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        
        data = JSON.parse(xhttp.responseText);
        $('load').style.display = 'none';
        $('album-top').style.display = '';
        
//		for (var i = 1; i < Object.keys(tmp).length+1; i++) {
//			artist(i,tmp[i]);
//        }
        
        $('mainCover').src = artworkPath + data['albums'][albumID]['artwork']['500px'];
        $('type').innerHTML = data['albums'][albumID]['type'];
        $('title').innerHTML = data['albums'][albumID]['name'];
        $('artist').innerHTML = data['artists'][parseInt(data['albums'][albumID]['artist'])]['name'];
        $('year').innerHTML = data['albums'][albumID]['year'];
        $('count').innerHTML = Object.keys(data['albums'][albumID]['songs']).length;
        
    };
    xhttp.open("GET", '/data.json', true);
    xhttp.send();
}