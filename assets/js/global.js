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
var devMode = false;

var devBaseUrl = "/";
// old url: https://stibarc.github.io/STiBaRC_Records/
var baseUrl = "/";

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


// func to show or hide a page part //
function pagePartsDisplay(d){
    const allPages = document.querySelectorAll(".page-part");
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = d;
    }
}
// get url params //
function getAllUrlParams(url) {
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
	var obj = {};
	if (queryString) {
		queryString = queryString.split('#')[0];
		var arr = queryString.split('&');
		for (var i = 0; i < arr.length; i++) {
			var a = arr[i].split('=');
			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function (v) {
				paramNum = v.slice(1, -1);
				return '';
			});
			var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
			paramName = paramName;
			paramValue = paramValue;
			if (obj[paramName]) {
				if (typeof obj[paramName] === 'string') {
					obj[paramName] = [obj[paramName]];
				}
				if (typeof paramNum === 'undefined') {
					obj[paramName].push(paramValue);
				}
				else {
					obj[paramName][paramNum] = paramValue;
				}
			}
			else {
				obj[paramName] = paramValue;
			}
		}
	}
	return obj;
}