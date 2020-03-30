var artistID = parseInt(getAllUrlParams().id);

function loadArtistInfo(){
     
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // request for data is done
        var data = JSON.parse(xhttp.responseText);
        
        // hide load spinner
        $('load').style.display = 'none';
        $('releasesLoad').style.display = 'none';
        // show page parts
        pagePartsDisplay('');
        
        // set vars
        var artistsObj  = data['artists'][artistID];
        var pfp         = artworkPath + artistsObj['pfp'];
        var name        = artistsObj['name'];
        var title       = name;
        
        // get releases keys from artist
        var releasesObj = data['albums'];
        var releasesKeys = Object.keys(releasesObj);
        var artistReleasesCount = 0;
        var artistReleasesKeys = [];
        for(let i = 0; i < releasesKeys.length; i++){
            var currentRelease = releasesObj[i];
            if(currentRelease['artist'] == artistID){
                artistReleasesCount++;
                artistReleasesKeys.push(i);
            }
        }
        // turn keys into somthing useful
        var artistReleases = '';
        for(let i = 0; i < artistReleasesCount; i++){
            var currentKey = artistReleasesKeys[i];
            currentRelease = releasesObj[currentKey];
            // set info
            var currentName = currentRelease['name'];
            var currentArtistKey = currentRelease['artist'];
            var currentArtist = artistsObj['name'];
            var currentCover = artworkPath + currentRelease['artwork']['200px'];
            var currentYear = currentRelease['year'];
            artistReleases +=  '<a class="album album-width" href="../album/?id='+parseInt(currentKey)+'" title="'+currentName+' - '+currentArtist+'"> <img class="artwork" src="'+currentCover+'"> <div class="name">'+currentName+'<span class="name-spacer"> - </span><span class="name-artists">'+currentArtist+'</span> <div class="year">'+currentYear+'</div> </div> </a>';
        }
        // if no releases, show somthing
        if(artistReleases == ''){
            artistReleases = '<center><h3 class="oop">No releases yet</h3></center>';
        }
        
        
        // prep to get links
        var linksObj    = artistsObj['links'];
        var links       = '';
        if(!linksObj == ''){
            // create link button
            var linkData = linksObj['email'];
            var linkHref = 'mailto:'+linkData;
            var currentIcon = 'envelope';
            links += '<a href="'+linkHref+'" class="button square outline" title="'+linkData+'" target="_blank"><i class="fa fa-'+currentIcon+' fa-2x"></i></a>';
        }
        
        // all other info is set
        $('pfp').src = pfp;
        $('name').innerHTML = name;
        document.title = title + ' on STiBaRC Records';
        $('links').innerHTML = links;
        $('releases').innerHTML = artistReleases;
        
    };
    //send request for all data
    xhttp.open("GET", '../data.json', true);
    xhttp.send();
}


loadArtistInfo();