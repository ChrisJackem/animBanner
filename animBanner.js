

/*  */

var animDivs = []

var css;
var styles;

var DEBUG = true;

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



function Animate( d, DATA ){
  var animType = DATA[0].toLowerCase();
  var vals = DATA[1].split("_");
  var dataStr = "";

  var str_property = "background-color";
  var str_start = "red";
  var str_finish = "yellow";

  // animation type 
  switch(animType){
  	
  	case "scroll_y":
  		embedToBG(d);
 		str_property = "background-position";
  		str_start = "0px " + vals[0];
  		str_finish = "0px " + vals[1] ;
  		break;
  	
  	case "scroll_x":
  		embedToBG(d);
 		str_property = "background-position";
  		str_start = vals[0] + " 0px";
  		str_finish = vals[1] + " 0px";
  		break;

  	case "fade":

  		break;

  	case "rotate":

  		break;

  	default:
  	 console.log("Error - cant find animation " + animType);
  	 break;
  }//s

  var _ID = d.getAttribute('id');
  styles += "\n#" + _ID + "{animation-name: " + _ID + ";\n";
  styles += "animation-duration: " + "1s" + ";}\n";
  styles += parseCss( _ID, str_property, str_start, str_finish );


}

// Helpers ---------------------------------------------------------------
function embedToBG(par){
	var imgChild = par.getElementsByTagName("img")[0];
	var imgStyle = 'background-image: url("' + refineSource(imgChild.src) +'"); ';
		imgStyle +="height:" + imgChild.clientHeight + "px; ";
	// Add to secondary css that we are building
	styles += "#" + par.getAttribute('id') + "{" + imgStyle + "}";
	par.removeChild(imgChild);
}



function refineSource(s){
	var _spl = s.split("/");
	var _file = _spl[_spl.length-1];
	var _fol =  _spl[_spl.length-2];
	return _fol + "/" + _file;
}

function parseCss( name, prop, sta, fin ){
	var ret = "\n@keyframes " + name + "{";
		ret += "from {"+ prop + ":" + sta + ";}\n";
		ret += "to {"+ prop + ":" + fin + ";} }\n";// closer
		return ret;
		
}

function getDivData(d){
	var da = d.getAttribute("data-anim");
	if (da==null) return [null];	
	var splitted = da.split(" ");
	return splitted;
}


