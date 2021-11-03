const id = parseInt(getAllUrlParams().id);

var redirect = '';

if(links == "artist") {
    redirect = '/artist/';
    switch(id) {
        case 0 :
            redirect += "alluthus/"
            break;
        case 1 :
            redirect += "bunnbuns/"
            break;
        case 2 :
            redirect += "herronjo/"
            break;
        case 3 :
            redirect += "morkle/"
            break
        default :
            redirect = "/404.html";
    }
} else {
    redirect = "/404.html";
}

setTimeout( () => {
    window.location.replace(redirect);
}, 15);
