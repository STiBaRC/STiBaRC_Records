var artistID = parseInt(getAllUrlParams().id);

function loadArtistInfo(){
     
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // request for data is done
        var data = JSON.parse(xhttp.responseText);
        
        // hide load spinner
        $('load').style.display = 'none';
        // show page parts
        pagePartsDisplay('');
        
        // set vars
        var artistsObj  = data['artists'][artistID];
        var pfp         = artworkPath + artistsObj['pfp'];
        var name        = artistsObj['name'];
        var title       = name;
        
        // releases from artist //
        
        
//        if(artistsObj.hasOwnProperty('links')){
//            var email = artistsObj['email'];
//        }
//
//        // get song count
//        var songCount   = Object.keys(artistsObj['songs']).length;
//        
//        // table header
//        var songs       = '<tr> <th>#</th> <th>TITLE</th> <th>ARTIST</th> </tr>';
//        // create song table
//        for (let i = 0; i < songCount; i++){
//            var currentSong = artistsObj['songs'][i];
//            // prep to get artists for song
//            var artistsKeys = Object.keys(data['songs'][currentSong]['artists']);
//            var artists = '';
//            // for artists in song
//            for (let i = 0; i < artistsKeys.length; i++){
//                var currentKey = parseInt(artistsKeys[i]);
//                if(currentKey > 0){
//                    artists += ', ';
//                }
//                var currentArtistKey = data['songs'][currentSong]['artists'][currentKey];
//                artists += data['artists'][currentArtistKey]['name'];
//            }
//            songs += '<tr> <td>'+(i+1)+'</td> <td>'+data['songs'][currentSong]['name']+'</td> <td>'+artists+'</td> </tr>';
//        }

        
        // prep to get links
        var linksObj    = artistsObj['links'];
        var links       = '';
        if(!linksObj == ''){
            // create link button
            var linkData = linksObj['email'];
            var linkHref = 'mailto:'+linkData;
            var currentIcon = 'envelope';
            links += '<a href="'+linkHref+'" class="button square outline" title="'+linkData+'" target="_blank"><i class="fa fa-'+currentIcon+' fa-2x"></i></a>';
        }
        
        // all other info is set
        $('pfp').src = pfp;
        $('name').innerHTML = name;
        document.title = title + ' on STiBaRC Records';
        $('links').innerHTML = links;
        
    };
    //send request for all data
    xhttp.open("GET", '/data.json', true);
    xhttp.send();
}


loadArtistInfo();