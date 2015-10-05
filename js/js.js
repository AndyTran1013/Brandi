var resizeTimer

//when "works" nav is clicked
function selectWork(btn){
	document.getElementById("selected").id="";
	btn.id="selected";
}

//hamburger menu display
function menuBtn(){
	var lnk = document.querySelectorAll("header nav a");
	var nav = document.querySelector("header nav");
	
	if (nav.offsetHeight !== 0){
		nav.style.height = "0";
	} else {
		nav.style.height = lnk[0].offsetHeight * lnk.length + "px";
	};
}

//add/remove link animations in header
function lnk_ani(){
	var w = window.innerWidth;
	var lnks = [].slice.call(document.querySelectorAll("nav a"));
	var cName = "";

	if (w > 660){
		cName="lnkLine"
	}
	
	lnks.forEach(function(el){
		el.className= cName;
	});

}

function slogan(){
	var w = window.innerWidth;
	var str = document.querySelector (".hero-text p");

	if (w > 420){
		str.className = "line";
	} else {
		str.className= "";
	}
}

//fixed header effect
window.addEventListener("scroll", function(){
	var header = document.querySelector("header");
	
	if (window.scrollY > 0){
		header.style.backgroundColor="#0eb493";
		header.id ="nav-shadow";
	} else{
		header.style.backgroundColor = "rgba(0,0,0,.1)";
		header.id ="";
	}
});

//add/remove classes for responsive
window.addEventListener("resize", function(){
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function(){
		lnk_ani()		
		slogan();
	},250);
});

lnk_ani();
slogan();


function fakeTope(){
	var imgs = [].slice.call(document.querySelectorAll(".imgContainer img"));
	alert(imgs.length);
}

fakeTope();