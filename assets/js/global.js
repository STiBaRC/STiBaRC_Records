function $(id){  //less typing
    if(id.startsWith(".")){
        return document.getElementsByClassName(id.substring(1));
    }else{
        return document.getElementById(id);
    }
}

/* nav mobile menu & button */
document.addEventListener("click", function(event) {
    var isClickInside = $('mobile-btn').contains(event.target);
    var navLinks = $('nav-links').contains(event.target);
    
    if($("nav-links").style.display == "none" || $("nav-links").style.display == ""  || navLinks){
        $('nav-links').style.display = "block";
    }else{
        $("nav-links").style.display = "none";
    }
    if (!isClickInside && !navLinks) {
        //the click was outside the nav dropdown
        $("nav-links").style.display = "none";
    }
});
// set devMode to false in production //
var devMode = true;

var devBaseUrl = "/";
var baseUrl = "https://stibarc.github.io/STiBaRC_Records/";

if(devMode){
    baseAPI = devBaseUrl;
    baseUrl = devBaseUrl;
}else{
    baseAPI = baseUrl;
}

var releasesUrl = baseAPI+"releases.json";
var artistsUrl = baseAPI+"artists.json";
var artworkPath = baseUrl+"assets/images/";
var pfpPath = baseUrl+"assets/images/";
