

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

  // 1 - animation type 
  switch(animType){

  	case "scroll_x":
  		direction = "x";

  		break;

  	case "scroll_y":
		direction = "y";
  		break;

  	case "fade":

  		break;

  	case "rotate":

  		break;
  }

  // 2 - Values
  if (vals.length > 0){
  	var valsSplit = vals.split("_");
  	refineData(vals);
  }

  //console.log(DATA + " scroll " + scroll);
}

// Helpers ---------------------------------------------------------------

function refineData(v){

	var _split = v.split("_");
	for (var i=0; i<_split.length; i++){
		if (  !isNaN( Number(_split[i]) ) ){
		 console.log( _split[i] + " number");
		}else{
			console.log( _split[i] + " str" );
		}
	}
}

function getDivData(d){
	var da = d.getAttribute("data-anim");
	if (da==null) return [null];	
	var splitted = da.split(" ");
	return splitted;
}


