function $(id) {
	if (id.startsWith(".")) {
		return document.getElementsByClassName(id.substring(1));
	} else {
		return document.getElementById(id);
	}
}

window.onload = scrollFunction();

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
		$("nav").classList.add('nav-bg');
	} else {
		$("nav").classList.remove('nav-bg');
	}
}
