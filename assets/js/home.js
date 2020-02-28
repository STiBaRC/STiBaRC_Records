/* artists */
var artistList = "";
function artist(id, item){
    try{
        var username = item['username'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var pfp = pfpPath + item['pfp'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        artistList += '<a class="person" href="#"> <img class="pfp" src="'+pfp+'"> <div class="name center">'+username+'</div> </a>';
    }catch (err){
        console.log(err);
    }
}
function loadArtists(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var tmp = JSON.parse(xhttp.responseText);
		$('artists').innerHTML = '';
		for (var i = 1; i < Object.keys(tmp).length+1; i++) {
			artist(i,tmp[i]);
        }
        $('artists').innerHTML = artistList;
    };
    xhttp.open("GET", artistsUrl, true);
    xhttp.send();
}

/* releases */
var releaseList = "";
function release(id, item){
    try{
        var name = item['name'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var artists = "";
        for(var i = 1; i < Object.keys(item['artists']).length+1; i++){
            if(i > 1){
                artists += ', ';
            }
            artists += item['artists'][i]['username'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        var artwork = artworkPath + item['artwork']['500px'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        releaseList += '<a class="album album-width" href="#" title="'+name +' - '+artists+'"> <img class="artwork" src="'+artwork+'"> <div class="name">'+name+' - '+artists+'</div> </a>';
    }catch (err){
        console.log(err);
    }
}
function loadReleases(type){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var tmp = JSON.parse(xhttp.responseText);
		$('releases').innerHTML = '';
		for (var i = 1; i < Object.keys(tmp).length+1; i++) {
			release(i,tmp[i]);
        }
        $('releases').innerHTML = releaseList + '<span id="release-more-btn" class="album-button album-width" style="display: none;"> <a class="button big" href="./releases/">View All</a> </span>';
        if(Object.keys(tmp).length >= 4){
            $('release-more-btn').style.display = "inline-block";
        }else{
            $('release-more-btn').style.display = "none";
        }
    };
    xhttp.open("GET", releasesUrl, true);
    xhttp.send();
}