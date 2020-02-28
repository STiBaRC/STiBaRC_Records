function $(id){  //less typing
    if(id.startsWith(".")){
        return document.getElementsByClassName(id.substring(1));
    }else{
        return document.getElementById(id);
    }
}

// set devMode to false in production //
var devMode = false;

var devBaseUrl = "/";
var baseUrl = "https://stibarc.github.io/STiBaRC_Records/";

if(devMode){
    baseAPI = devBaseUrl;
}else{
    baseAPI = baseUrl;
}

var releasesUrl = baseAPI+"releases.json";
var artistsUrl = baseAPI+"artists.json";
