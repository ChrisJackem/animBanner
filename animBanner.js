

/*  */

var animDivs = []

var css;
var styles;

var DEBUG = false;

window.onload = function(){

	// New styles for animations
	css = document.createElement("style")
	css.type = "text/css";
	styles = '#header { color: #555 }';

	init();
	

	// Add styles we built
	if (css.styleSheet) css.styleSheet.cssText = styles;
	else css.appendChild(document.createTextNode(styles));
	document.getElementsByTagName("head")[0].appendChild(css);

	if (DEBUG) console.log("animBanner init success\n" + styles);
}


function init(){
	animDivs = document.getElementsByTagName( "div" )	
	for (var i=0; i<animDivs.length;i++){
		var _D = getDivData(animDivs[i]);
		// Make sure we have data
		if ((typeof _D[0]) == "string") Animate(animDivs[i], _D);
		// ok
	}//f
}

function Okey(){
	
}

function Animate( d, DATA ){
  var direction = "init";
  var scroll = DATA[0].includes("scroll");
  var fade = DATA[0].includes("fade");


  // 0 - kind
  if (scroll){
  	direction = DATA[0].includes("X") ? "X" : "Y";
  }

  console.log(DATA + " scroll " + scroll);
}

function getDivData(d){
	var da = d.getAttribute("data-anim");
	if (da==null) return [null];
	
	var splitted = da.split(" ");
	return splitted;
}


