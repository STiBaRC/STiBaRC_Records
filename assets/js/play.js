var imagesBase = '../assets/images/';

// get album ID from URL //
var albumID = parseInt(getAllUrlParams().album);

//playlist vars
var playlist = [];
var playingNow = 0;
var playing = false;

function updateSongList(){
    const songElements = document.querySelectorAll(".song-row");
    for (var i = 0; i < songElements.length; i++) {
        songElements[i].classList.remove('current-song');
    }
    songElements[playingNow].classList.add('current-song');
}
function pause(){
    $('audio').pause();
    playing = false;
}
function play(){
    $('audio').play();
    playing = true;
}
function updatePlayBtn(){
    if(playing && !$('audio').paused){
        $('main-play').innerHTML = 'Pause';
    }else if(!playing && $('audio').paused){
        $('main-play').innerHTML = 'Play';
    }else{
        $('main-play').innerHTML = 'Play';
    }
}
function updateStuff(){
    updateSongList();
    updatePlayBtn();
}
function playAll(startIndex){
    playing = true;
    playingNow = startIndex;
    $('audio').src = playlist[playingNow];
    $('audio').play();
    updateStuff();
}
function nextSong(){
    if(playingNow == playlist.length-1){
        playingNow = 0;
    }else{
        playingNow++;
    }
    playAll(playingNow);
}
function backSong(){
    if(playingNow == 0){
       playingNow = playlist.length-1;
    }else{
        playingNow--;
    }
    playAll(playingNow);
}

function load(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // request for data is done
        var data = JSON.parse(xhttp.responseText);
        
        // hide load spinner
        $('load').style.display = 'none';
        // show page parts
        pagePartsDisplay('');
        
        // set vars
        var albumObj    = data['albums'][albumID];
        var cover       = imagesBase + albumObj['artwork']['500px'];
        var type        = albumObj['type'];
        var title       = albumObj['name'];
        var artistId    = parseInt(albumObj['artist']);
        // get artist from artist ID
        var artist      = data['artists'][artistId]['name'];
        var artistLink  = '../artist/?id='+artistId;
        var playLink    = '../play/?album='+albumID;
        var year        = albumObj['year'];
        
        var songsObj = albumObj['songs'];
        // get song count
        var songCount   = Object.keys(songsObj).length;
        
        // table header
        var songs       = '<tr> <th>#</th> <th>TITLE</th> <th>ARTIST</th> </tr>';
        // create song table
        for (let i = 0; i < songCount; i++){
            var currentSong = songsObj[i];
            // prep to get artists for song
            var currentSongObj = data['songs'][currentSong];
            var artistsObj = currentSongObj['artists'];
            var artistsKeys = Object.keys(artistsObj);
            var artists = '';
            // for artists in song
            for (let i = 0; i < artistsKeys.length; i++){
                var currentKey = parseInt(artistsKeys[i]);
                var separator = '';
                if(currentKey > 0){
                    separator = '<span class="sep">, </span>';
                }
                var currentArtistKey = currentSongObj['artists'][currentKey];
                var currentArtistName = data['artists'][currentArtistKey]['name'];
                artists += separator+'<a class="artist-link" href="../artist/?id='+currentArtistKey+'">'+currentArtistName+'</a>';
            }
            var currentSongName = currentSongObj['name'];
            var currentSongKey = (i+1);
            var currentPlayLink = playLink+'&song='+currentSongKey;
            // get song file
            var songPath = '../assets/music/';
            var currentSongFile = songPath + albumID + '/' + currentSongName + '.mp3';
            songs += '<tr class="song-row"> <td><a href="'+currentPlayLink+'" class="play"><i class="fa fa-play-circle"></i></a><span>'+currentSongKey+'</span></td> <td>'+currentSongName+'</td> <td>'+artists+'</td> </tr>';
            // build playlist
            playlist.push(currentSongFile);
        }
        // play btn setup
        $('main-play').addEventListener("click", function(){
            if(playing){
                pause();
            }else if(!playing && $('audio').paused){
                play();
            }else{
                playAll(playingNow);
            }
            updateStuff();
        });
        // audio setup
        $('audio').src = playlist[playingNow];
        
        $('audio').addEventListener("ended", function(){
            if(playingNow == playlist.length-1){
                playingNow = 0;
            }else{
                nextSong();
            }
            
        });
        $('audio').onplay = function() {
            playing = true;
            updateStuff();
        };
        $('audio').onpause = function() {
            playing = false;
            updateStuff();
        };
        
        // all other info is set
        $('mainCover').src = cover;
        $('type').innerHTML = type;
        $('title').innerHTML = title;
        document.title = 'Play ' + title + ' on STiBaRC Records';
        $('artist').innerHTML = artist;
        $('artist').href = artistLink;
        $('year').innerHTML = year;
        $('count').innerHTML = songCount;
        $('songs').innerHTML =  songs;
        
    };
    //send request for all data
    xhttp.open("GET", '../data.json', true);
    xhttp.send();
}

// puts info into page //
load();



// timeline stuff //
/*
credit to: https://codepen.io/katzkode/pen/Kfgix
*/
var music = $('audio'); // id for audio element
var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
var playhead = $('playhead'); // playhead
var timeline = $('timeline'); // timeline

// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

// Boolean value so that audio position is updated only when the playhead is released
var onplayhead = true;

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.paddingLeft = playPercent + "px";
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
}

// Gets audio file duration
music.addEventListener("canplaythrough", function() {
    duration = music.duration;
}, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}
