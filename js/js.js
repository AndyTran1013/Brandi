var resizeTimer

//when "works" nav is clicked
function selectWork(btn){
	document.getElementById("selected").id="";
	btn.id="selected";
	fakeTope(btn.textContent)
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
		lnk_ani();
		slogan();
		fakeTope(document.getElementById("selected").textContent);
	},500);
});




//positions the images inside a container and allows filtering
//only for equal sized images..
function fakeTope(show){
	var imgs = [].slice.call(document.querySelectorAll(".imgContainer .imgWrap"));
	var container = document.querySelector(".imgContainer");
	var maxW = container.offsetWidth;
	var imgHeight = imgs[0].getBoundingClientRect().height;
	var imgWidth = imgs[0].getBoundingClientRect().width;
	var imgCount = 0;
	var currRow = 1;
	var currW = 0;

	//check if each image is being displayed and position accordingly
	imgs.forEach(function (img){
		img.style.transition = "0.5s";
		if (img.dataset.category === show || show === "All"){
			//show & position image
			img.style.opacity = 1;
			img.style.display = "block";
			if (currW + imgWidth > maxW){
				img.style.left = 0;
				currRow += 1;
				imgCount = 1;
			} else {
				img.style.left = (imgWidth * imgCount-1) + "px";
				imgCount +=1;
			}
			currW = (imgWidth * (imgCount));
			img.style.top = (imgHeight * (currRow -1)) + "px";
		} else {
			//hide image
			img.style.opacity= 0;
		}
	});

	container.style.height = (imgHeight * currRow) + "px"
}

fakeTope("All");
lnk_ani();
slogan();