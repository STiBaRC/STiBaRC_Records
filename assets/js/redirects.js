const id = parseInt(getAllUrlParams().id);

var redirect = '';

if(links == "artist") {
    redirect = '/artist/';
    switch(id) {
        case 0 :
            redirect += "Alluthus/"
            break;
        case 1 :
            redirect += "Bunnbuns/"
            break;
        case 2 :
            redirect += "herronjo/"
            break;
        default :
            redirect = "/404.html";
    }
} else {
    redirect = "/404.html";
}

window.location.replace(redirect);