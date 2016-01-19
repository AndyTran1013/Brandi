var resizeTimer //variable used to store timeout function
var nav = [].slice.call(document.querySelectorAll("header nav a"));
var worksNav = [].slice.call(document.querySelectorAll(".works .btnWrap button"));

/*-----------------Event Listeners-----------------*/

//initialize functions
window.addEventListener("load",function(){
	fakeTope("All");
	lnk_ani();
	slogan();
});

//change header colour on scroll
window.addEventListener("scroll", function(){
	if (window.scrollY > 0){
		toggleHeader(true);
	} else{
		toggleHeader(false);
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

nav.forEach(function(e){
	e.addEventListener("click", function(){
		smoothScroll(e.textContent);
		e.parentNode.style.height = 0;
	})
});

worksNav.forEach(function(e){
	e.addEventListener("click",function(){
		selectWork(e);
	})
})

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
	
	toggleHeader(true)
	if (nav.offsetHeight !== 0){
		nav.style.height = "0";
	} else {
		nav.style.height = lnk[0].offsetHeight * lnk.length + "px";
	};
}

//toggle header colour
function toggleHeader(toggle){
	var header = document.querySelector("header");
	
	if (toggle){
		header.style.backgroundColor="#0eb493";
		header.id ="nav-shadow";
	} else{
		header.style.backgroundColor = "rgba(0,0,0,.1)";
		header.id ="";
	}
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

//smooth scrolling to element id
function smoothScroll(eID){
	var headerH = document.querySelector('header').offsetHeight; //size of header
	var startY = window.scrollY;
	var endY = getYPosition(eID) - headerH - 10; //10px of white space

	animate({
		delay: 10,
		duration: 800,
		delta: easeInQuint,
		step: function(delta) {
			window.scrollTo(0,(startY + delta*(endY - startY)));
		}
	});
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



//general animation function
/*
options are {
	delay
	duration
	delta
	step
}
*/
function animate(options){
	var start = new Date;
	var id = setInterval(function(){
		var timePassed = new Date - start;
		var progress = timePassed / options.duration

		if (progress >= 1) {progress = 1};

		var delta = options.delta(progress);
		options.step(delta);

		if (progress ==1 ){
			clearInterval(id);
		}

	}, options.delay || 10) //minimum delay

}

function easeInQuint(progress){
	 return Math.pow(progress,5);
}