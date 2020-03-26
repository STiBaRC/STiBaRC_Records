var albumID = parseInt(getAllUrlParams().id);

function loadAlbumInfo(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        
        var data = JSON.parse(xhttp.responseText);
        $('load').style.display = 'none';
        $('album-top').style.display = '';
        
        var cover       = artworkPath + data['albums'][albumID]['artwork']['500px'];
        var type        = data['albums'][albumID]['type'];
        var title       = data['albums'][albumID]['name'];
        var artistId    = parseInt(data['albums'][albumID]['artist']);
        
        var artist      = data['artists'][artistId]['name'];
        var year        = data['albums'][albumID]['year'];
        
        var songCount   = Object.keys(data['albums'][albumID]['songs']).length;
        
        var songs       = '<tr><th>#</th><th>TITLE</th></tr> ';
        
        for (let i = 0; i < songCount; i++){
            var currentSong = data['albums'][albumID]['songs'][i];
            songs += '<tr><td>'+(i+1)+'</td><td>'+data['songs'][currentSong]['name']+'</td></tr>';
        }
        
        var linkKeys   = Object.keys(data['albums'][albumID]['links']);
        var links       = '';
        
        for (let i = 0; i < linkKeys.length; i++){
            var currentKey = linkKeys[i];
            var currentLink = data['albums'][albumID]['links'][currentKey];
            links += '<a href="'+currentLink+'" class="button square outline" title="'+currentKey+'" target="_blank"><i class="fa fa-'+currentKey.toLowerCase()+' fa-2x"></i></a>';
        }
        
        $('mainCover').src = cover;
        $('type').innerHTML = type;
        $('title').innerHTML = title;
        document.title = title + ' - STiBaRC Records';
        $('artist').innerHTML = artist
        $('year').innerHTML = year;
        $('count').innerHTML = songCount;
        $('songs').innerHTML =  songs;
        $('links').innerHTML = links;
        
    };
    xhttp.open("GET", '/data.json', true);
    xhttp.send();
}

loadAlbumInfo();