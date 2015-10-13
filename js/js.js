var resizeTimer //variable used to store timeout function

/*-----------------Event Listeners-----------------*/

//initialize functions
window.addEventListener("load",function(){
	fakeTope("All");
	lnk_ani();
	slogan();
});

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



/*-----------------Functions-----------------*/

//when "works" nav is clicked; highlight and filter works
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

//add/remove line in "hero-text"
function slogan(){
	var w = window.innerWidth;
	var str = document.querySelector (".hero-text p");

	if (w > 420){
		str.className = "line";
	} else {
		str.className= "";
	}
}


//positions the images inside a container and allows filtering
//only for equal sized images..

function fakeTope(show){
	var imgs = [].slice.call(document.querySelectorAll(".imgContainer .imgWrap"));
	var container = document.querySelector(".imgContainer");
	var imgHeight = document.querySelector(".visible").getBoundingClientRect().height; 
	var imgWidth = document.querySelector(".visible").getBoundingClientRect().width;
	var maxW = container.offsetWidth;
	var imgCount = 0;
	var currRow = 1;
	var currW = 0;
	var x,y;

	//check if each image is being displayed and position accordingly

	imgs.forEach(function (img){
		img.style.transition ="0.4s"
		if (img.dataset.category === show || show === "All"){
			//show & position image
			img.classList.add("visible");
			img.style.transform =img.style.transform.replace("scale(0)","scale(1)");

			if (currW + imgWidth > maxW){
				x = 0;
				currRow += 1;
				imgCount = 1;
			} else {
				x = (Math.floor(imgWidth) * imgCount-1) + "px";
				imgCount +=1;
			}
			currW = (imgWidth * (imgCount));
			y= (Math.floor(imgHeight) * (currRow -1)) + "px";
			img.style.transform = "translate3d(" + x + ","+ y + ",0)" +"scale(1)";
		} else {
			//hide image
			img.classList.remove("visible");
			img.style.transform =img.style.transform.replace("scale(1)","scale(0)");
		}
	});
	container.style.height = (imgHeight * currRow) + "px";
}


//smooth scrolling - **make note of fixed header
function smoothScroll(eID){
	//subtract height of fixed header to scroll to element without being covered
	var headerH = document.querySelector('header').offsetHeight;
	var startY = window.scrollY;
	var endY = getYPosition(eID) - headerH - 10; //10px of white space
	var distance = Math.abs(startY - endY);
	var speed = Math.max(Math.floor(distance / 100), 20)//max speed of scrolling
	var step = Math.floor(distance / 25) //how much to scroll by
	var time = 0;

	startY = Math.floor(startY/step)*step;
	endY = Math.floor(endY/step) * step;

	if (startY > endY) {
		step = step * -1;
	}

	/*
	t = current time, b = start val, c = change in val, d = duration
Math.easeInQuint = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t*t + b;
};
	*/

	for (var i = startY; i !== endY; i += step){
		setTimeout(function(y){
			return function(){
				window.scrollTo(0,y += step)
			}
		}(i),time * speed);
		time++;
	}
}


//get Y position of the element
function getYPosition(eID){
	var el = document.getElementById(eID);
	var y = el.offsetTop;
	var node = el;

	while(node.offsetParent && node.offsetParent !== document.body){
		node = node.offsetParent;
		y += node.offsetTop;
	}
	return y;
}
