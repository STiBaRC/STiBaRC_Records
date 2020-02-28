function $(id){  //less typing
    if(id.startsWith(".")){
        return document.getElementsByClassName(id.substring(1));
    }else{
        return document.getElementById(id);
    }
}

var baseUrl = "https://stibarc.github.io/STiBaRC_Records/";

var releasesUrl = baseUrl+"releases.json";
var artistsUrl = baseUrl+"artists.json";
