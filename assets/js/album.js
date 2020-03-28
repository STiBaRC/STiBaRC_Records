// get album ID from URL //
var albumID = parseInt(getAllUrlParams().id);

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
        var albumObj    = data['albums'][albumID];
        var cover       = artworkPath + albumObj['artwork']['500px'];
        var type        = albumObj['type'];
        var title       = albumObj['name'];
        var artistId    = parseInt(albumObj['artist']);
        // get artist from artist ID
        var artist      = data['artists'][artistId]['name'];
        var artistLink  = '../artist/?id='+artistId;
        var year        = albumObj['year'];
        
        var songsObj = albumObj['songs'];
        // get song count
        var songCount   = Object.keys(songsObj).length;
        
        // table header
        var songs       = '<tr> <th>#</th> <th>TITLE</th> <th>ARTIST</th> </tr>';
        // create song table
        for (let i = 0; i < songCount; i++){
            var currentSong = songsObj[i];
            // prep to get artists for song
            var currentSongObj = data['songs'][currentSong];
            var artistsObj = currentSongObj['artists'];
            var artistsKeys = Object.keys(artistsObj);
            var artists = '';
            // for artists in song
            for (let i = 0; i < artistsKeys.length; i++){
                var currentKey = parseInt(artistsKeys[i]);
                var separator = '';
                if(currentKey > 0){
                    separator = '<span class="sep">, </span>';
                }
                var currentArtistKey = currentSongObj['artists'][currentKey];
                var currentArtistName = data['artists'][currentArtistKey]['name'];
                artists += separator+'<a class="artist-link" href="../artist/?id='+currentArtistKey+'">'+currentArtistName+'</a>';
            }
            var currentSongName = currentSongObj['name'];
            songs += '<tr> <td>'+(i+1)+'</td> <td>'+currentSongName+'</td> <td>'+artists+'</td> </tr>';
        }
        
        // prep to get links
        var linksObj = albumObj['links'];
        var linkKeys   = Object.keys(linksObj);
        var links      = '';
        // create link buttons
        for (let i = 0; i < linkKeys.length; i++){
            var currentKey = linkKeys[i];
            var currentLink = linksObj[currentKey];
            var currentIcon = currentKey.toLowerCase();
            links += '<a href="'+currentLink+'" class="button square outline" title="'+currentKey+'" target="_blank"><i class="fa fa-'+currentIcon+' fa-2x"></i></a>';
        }
        
        // all other info is set
        $('mainCover').src = cover;
        $('type').innerHTML = type;
        $('title').innerHTML = title;
        document.title = title + ' on STiBaRC Records';
        $('artist').innerHTML = artist;
        $('artist').href = artistLink;
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
