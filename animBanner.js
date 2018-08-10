

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

	//if (DEBUG) console.log("animBanner init success\n" + styles);
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



function Animate( d, DATA ){
  var direction = "init";
  var animType = DATA[0].toLowerCase();
  var vals = DATA[1];
  var dataStr = "";

  var str_property = "background-color";
  var str_start = "red";
  var str_finish = "yellow";

  // animation type 
  switch(animType){

  	case "scroll_x":
  	case "scroll_y":
  		direction = (animType=="scroll_x")?"x":"y";
  		str_property = "background-position";
  		str_start = "background-position";
  		break;

  	case "fade":

  		break;

  	case "rotate":

  		break;

  	default:
  	 console.log("Error - cant find animation " + animType);
  	 break;
  }//s
}

// Helpers ---------------------------------------------------------------

function getDivData(d){
	var da = d.getAttribute("data-anim");
	if (da==null) return [null];	
	var splitted = da.split(" ");
	return splitted;
}


