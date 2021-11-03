window.onload = scrollFunction();

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$("nav").classList.add('nav-bg');
	} else {
		$("nav").classList.remove('nav-bg');
	}
}