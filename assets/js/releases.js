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
        var artwork = item['artwork']['500px'].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
/* view options */
var getViewOption = sessionStorage.getItem('viewOption');
if(getViewOption == null){
    // view option not set, so use module view
    console.log('view option not set, so setting to module_view');
    var viewOption = "view_module";
    $('releases').classList.add(viewOption);
    // set storage to use module view
    sessionStorage.setItem('viewOption', 'view_module');
}else{
    // view option is set, so use it
    var viewOption = getViewOption;
    $('releases').classList.add(getViewOption);
    if(viewOption == "view_list"){
        
        $('view-option').innerHTML = "view_module";
        
    }else{
        
        $('view-option').innerHTML = "view_list";
        
    }
}
function changeView(){
    $('releases').classList.remove(viewOption);
    
    if(viewOption == "view_list"){
        
        viewOption = "view_module";
        $('view-option').innerHTML = "view_list";
        
    }else{
        
        viewOption = "view_list";
        $('view-option').innerHTML = "view_module";
        
    }
    $('releases').classList.add(viewOption);
    sessionStorage.setItem('viewOption', viewOption);
}
$("view-option").addEventListener("click", changeView);



/* page load */
