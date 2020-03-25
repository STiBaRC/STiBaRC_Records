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
        var year = item['year'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        releaseList += '<a class="album album-width" href="../album/?id='+(parseInt(id)-1)+'"> <img class="artwork" src="'+artwork+'" title="'+name +' - '+artists+'"> <div class="name">'+name+'<span class="name-spacer"> - </span><span class="name-artists">'+artists+'</span> <div class="year">'+year+'</div> </div> </a>';
    }catch (err){
        console.log(err);
    }
}
function loadReleases(type){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var tmp = JSON.parse(xhttp.responseText);
		$('releases').innerHTML = '';
		for (var i = Object.keys(tmp).length; i > 0; i--) {
			release(i,tmp[i]);
        }
        $('releases').innerHTML = releaseList;
    };
    xhttp.open("GET", releasesUrl, true);
    xhttp.send();
}

/* page load */
