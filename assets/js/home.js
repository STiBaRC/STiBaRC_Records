// artists //
var artistList = "";
function artist(i, data){
    try{
        var currentKey = (parseInt(i)-1);
        // set vars
        var artistsObj  = data['artists'][currentKey];
        var pfp         = artworkPath + artistsObj['pfp'];
        var name        = artistsObj['name'];
        
        artistList += '<a href="./artist/?id='+currentKey+'"><span class="person"> <img class="pfp" src="'+pfp+'"> <div class="name center">'+name+'</div> </span></a>';
    }catch (err){
        console.log(err);
    }
}
function loadArtists(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = JSON.parse(xhttp.responseText);
		$('artists').innerHTML = '';
        var artistsObj = data['artists'];
        var artistsKeys = Object.keys(artistsObj);
        
		for (var i = 1; i < artistsKeys.length+1; i++) {
			artist(i,data);
        }
        $('artists').innerHTML = artistList;
    };
    xhttp.open("GET", './data.json', true);
    xhttp.send();
}

// releases //
var releaseList = '';
function release(i, data){
    try{
        var releasesObj = data['albums'];
        var currentKey = (parseInt(i)-1);
        var currentRelease = releasesObj[currentKey];
        // set info
        var currentName = currentRelease['name'];
        var currentArtistKey = currentRelease['artist'];
        var artistsObj  = data['artists'];
        var currentArtist = artistsObj[currentArtistKey]['name'];
        var currentCover = artworkPath + currentRelease['artwork']['200px'];
        var currentYear = currentRelease['year'];
        
        releaseList += '<a class="album album-width" href="../album/?id='+currentKey+'" title="'+currentName +' - '+currentArtist+'"> <img class="artwork" src="'+currentCover+'"> <div class="name">'+currentName+'<span class="name-spacer"> - </span><span class="name-artists">'+currentArtist+'</span> <div class="year">'+currentYear+'</div> </div> </a>';
    }catch (err){
        console.log(err);
    }
}
function loadReleases(type){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = JSON.parse(xhttp.responseText);
        
        var releasesObj = data['albums'];
        var releasesKeys = Object.keys(releasesObj);
        
		$('releases').innerHTML = '';
		for (var i = releasesKeys.length; i > 0; i--) {
			release(i,data);
        }
        
        $('releases').innerHTML = releaseList;
    };
    xhttp.open("GET", './data.json', true);
    xhttp.send();
}