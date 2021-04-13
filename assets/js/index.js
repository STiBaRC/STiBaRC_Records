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