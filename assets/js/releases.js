/* releases */
var releaseList = "";
function release(id, item){
    try{
        var name = item['name'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var artists = item['artists']['1']['username'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var artwork = item['artwork']['full'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        releaseList += '<a class="album album-width" href="#"> <img class="artwork" src="'+artwork+'"> <div class="name">'+name+' - '+artists+'</div> </a>';
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
        $('releases').innerHTML = releaseList;
    };
    xhttp.open("GET", releasesUrl, true);
    xhttp.send();
}