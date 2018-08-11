

/*  */

var animDivs = []

var css;
var styles;

var DEBUG = true;
var master = {};
var defaults = {
// custom
  'background-image':'none',
  'height':'100%',
  'width':'100%',
  'animation-name':'default',
  'animation-prop':'background-color',
  'animation-end':'yellow',
  'animation-start':'red',  
// css 
  'animation-duration': '1.5s', 
  'animation-timing-function': 'linear',
  'animation-delay': '0s',
  'animation-direction': 'alternate',
  'animation-iteration-count': 'infinite',
  'animation-fill-mode': 'none',
  'animation-play-state': 'running'
};
/*
 
*/


window.onload = function(){
	var css,styles;
	init();
	
//console.log(master["bush"]);
var css = document.createElement("style");
    css.type = "text/css";
var styles = '';

	for (var obj in master){
		// New styles for animations
		var _obj = master[obj];
		
		
		styles = '#' + _obj['animation-name'] + '{';

		for (var prop in _obj){
			var val = _obj[prop];
			styles += prop + ':' + val + ';';
		}
		styles += "}" + parseCss(_obj['animation-name'],
		                         _obj['animation-prop'],
		                         _obj['animation-start'],
		                         _obj['animation-end']);
		
		// Add to style sheet
		if (css.styleSheet) css.styleSheet.cssText = styles;
		else css.appendChild(document.createTextNode(styles));
	}
	// Add css to doc
	document.getElementsByTagName("head")[0].appendChild(css);
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
  var _ID = d.getAttribute('id');
  var myObj = {};

 // myObj = Object.assign(defaults);
  myObj['animation-name'] = _ID;

	if (animType == "scroll_y" || animType == "scroll_x"){
		var imgChild = d.getElementsByTagName("img")[0];
		myObj['background-image'] ='url("' + refineSource(imgChild.src) +'"); ';
		myObj['height'] = + imgChild.clientHeight + "px; ";
		d.removeChild(imgChild);
	}

  // animation type 
  switch(animType){
  	
  	case "scroll_y":
  		//embedToBG(d);
 		myObj['animation-prop'] = "background-position";
  		myObj['animation-start'] = "0px " + vals[0];
  		myObj['animation-end'] = "0px " + vals[1] ;
  		break;
  	
  	case "scroll_x":
  		//embedToBG(d);
 		myObj['animation-prop'] = "background-position";
  		myObj['animation-start'] = vals[0] + " 0px";
  		myObj['animation-end'] = vals[1] + " 0px";
  		break;

  	case "fade":

  		break;

  	case "rotate":

  		break;

  	default:
  	 console.log("Error - cant find animation " + animType);
  	 break;
  }//s

  if (DATA[2] != null) myObj['animation-duration'] = 		DATA[2];
  if (DATA[3] != null) myObj['animation-timing-function'] = DATA[3];
  if (DATA[4] != null) myObj['animation-delay'] = 			DATA[4];
  if (DATA[5] != null) myObj['animation-direction'] = 		DATA[5];
  if (DATA[6] != null) myObj['animation-iteration-count'] = DATA[6];
  if (DATA[7] != null) myObj['animation-fill-mode'] = 		DATA[7];
  if (DATA[8] != null) myObj['animation-play-state'] = 		DATA[8];

  // Finalize Obj
  console.log(myObj)
  master[_ID] = myObj;
}

// Helpers ---------------------------------------------------------------

function embedToBG(par){

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


