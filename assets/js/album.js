// get album ID from URL //
var albumID = parseInt(getAllUrlParams().id);

// func to show or hide a page part //
function pagePartsDisplay(d){
    const allPages = document.querySelectorAll(".page-part");
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = d;
    }
}

// puts album info by album ID into page //
function loadAlbumInfo(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // request for data is done
        var data = JSON.parse(xhttp.responseText);
        
        // hide load spinner
        $('load').style.display = 'none';
        // show page parts
        pagePartsDisplay('');
        
        // set vars
        var cover       = artworkPath + data['albums'][albumID]['artwork']['500px'];
        var type        = data['albums'][albumID]['type'];
        var title       = data['albums'][albumID]['name'];
        var artistId    = parseInt(data['albums'][albumID]['artist']);
        // get artist from artist ID
        var artist      = data['artists'][artistId]['name'];
        var year        = data['albums'][albumID]['year'];
        // get song count
        var songCount   = Object.keys(data['albums'][albumID]['songs']).length;
        
        // table header
        var songs       = '<tr> <th>#</th> <th>TITLE</th> <th>ARTIST</th> </tr>';
        // create song table
        for (let i = 0; i < songCount; i++){
            var currentSong = data['albums'][albumID]['songs'][i];
            // prep to get artists for song
            var artistsKeys = Object.keys(data['songs'][currentSong]['artists']);
            var artists = '';
            // for artists in song
            for (let i = 0; i < artistsKeys.length; i++){
                var currentKey = parseInt(artistsKeys[i]);
                if(currentKey > 0){
                    artists += ', ';
                }
                var currentArtistKey = data['songs'][currentSong]['artists'][currentKey];
                artists += data['artists'][currentArtistKey]['name'];
            }
            songs += '<tr> <td>'+(i+1)+'</td> <td>'+data['songs'][currentSong]['name']+'</td> <td>'+artists+'</td> </tr>';
        }
        
        // prep to get links
        var linkKeys   = Object.keys(data['albums'][albumID]['links']);
        var links      = '';
        // create link buttons
        for (let i = 0; i < linkKeys.length; i++){
            var currentKey = linkKeys[i];
            var currentLink = data['albums'][albumID]['links'][currentKey];
            links += '<a href="'+currentLink+'" class="button square outline" title="'+currentKey+'" target="_blank"><i class="fa fa-'+currentKey.toLowerCase()+' fa-2x"></i></a>';
        }
        
        // all other info is set
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
    //send request for all data
    xhttp.open("GET", '/data.json', true);
    xhttp.send();
}

// puts info into page //
loadAlbumInfo();
