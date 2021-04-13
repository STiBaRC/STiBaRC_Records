function $(id) {
	if (id.startsWith(".")) {
		return document.getElementsByClassName(id.substring(1));
	} else {
		return document.getElementById(id);
	}
}

function mobileNav(action) {
	if (action == "open") {
		$("openMobileNav").style.display = "none";
		$("closeMobileNav").style.display = "inline-flex";
		$("mobileNav").style.display = "block";
		document.getElementsByTagName("body")[0].style.maxHeight = "100vh";
		document.getElementsByTagName("body")[0].style.overflow = "hidden";
	} else {
		$("openMobileNav").style.display = "inline-flex";
		$("closeMobileNav").style.display = "none";
		$("mobileNav").style.display = "none";
		document.getElementsByTagName("body")[0].style.maxHeight = "auto";
		document.getElementsByTagName("body")[0].style.overflow = "";
	}
}
