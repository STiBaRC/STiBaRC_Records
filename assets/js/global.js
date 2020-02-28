function $(id){  //less typing
    if(id.startsWith(".")){
        return document.getElementsByClassName(id.substring(1));
    }else{
        return document.getElementById(id);
    }
}

var releasesUrl = "https://bunnbuns.net/~tmp/releases.json";
var artistsUrl = "https://bunnbuns.net/~tmp/artists.json";
