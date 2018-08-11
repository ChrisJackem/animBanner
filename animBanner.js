

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
  'animation-duration': '3s', 
  'animation-timing-function': 'linear',
  'animation-delay': '0s',
  'animation-direction': 'forward',
  'animation-iteration-count': 'infinite',
  'animation-fill-mode': 'none',
  'animation-play-state': 'running'
};

var exclude_from_css = {
  'animation-prop':'X',
  'animation-end':'X',
  'animation-start':'X'
};


window.onload = function(){
	
	init();

	// New styles for animations
	var css = document.createElement("style");
	css.type = "text/css";
	var styles = '';

	for (var obj in master){		
		var _obj = master[obj];		
		styles = '\n#' + _obj['animation-name'] + '{';
		for (var prop in _obj){
			var val = _obj[prop];
			if (!exclude_from_css.hasOwnProperty(prop)) styles += prop + ':' + val + ';';
		}
		styles += "}" + parseCss(_obj['animation-name'],
		                         _obj['animation-prop'],
		                         _obj['animation-start'],
		                         _obj['animation-end']);
		
		// Add to style sheet
		if (css.styleSheet) css.styleSheet.insertRule(styles);
		else css.appendChild(document.createTextNode(styles));
		//console.log(styles);
	}
	// Add css to doc
	document.getElementsByTagName("head")[0].appendChild(css);
}


function init(){	
	var Ds = Array.prototype.slice.call(document.getElementsByTagName( "div" ) );
	var Is = Array.prototype.slice.call(document.getElementsByTagName( "img" ) );
	var animDivs = Ds.concat(Is);
	for (var a in animDivs){
		var _D = getDivData(animDivs[a]);
		if ((typeof _D[0]) == "string") Animate(animDivs[a], _D);
	}
}

function Animate( d, DATA ){

  var animType = DATA[0].toLowerCase();
  var vals = DATA[1].split("_");
  var _ID = d.getAttribute('id');
  var myObj = (_ID in master) ? master[_ID] : {};

  //myObj = Object.assign(defaults);
  myObj['animation-name'] = _ID;

  // animation type 
  switch(animType){  	

  	//==================== Scroll =========================
  	case "scroll_x":
	case "scroll_y":  		

  		// Replace image with div and transfer atts (you will never know)
  		var imgParent = document.getElementById(_ID).parentElement;
  		var imgHeight = d.clientHeight;
  		var imgWidth = d.clientWidth;  		
  		var imgSrc = refineSource(d.src);
  		var imgDiv = document.createElement("div");
  			if (imgDiv.className != null) imgDiv.className = d.className;  			
  			imgParent.replaceChild(imgDiv, document.getElementById(_ID) );
  			imgDiv.id = _ID;
  			d = imgDiv;
  	
  		myObj['height'] = + imgHeight + "px; ";
		myObj['background-image'] ='url("' + imgSrc +'");';		
		myObj['animation-prop'] = "background-position";
		myObj['animation-timing-function'] = 'linear';
		myObj['animation-iteration-count'] = 'infinite';
		
	  	if (animType == "scroll_x"){	 		
	  		myObj['animation-start'] = vals[0] + " 0px";
	  		myObj['animation-end'] = vals[1] + " 0px";
	  	}else{
	  		myObj['animation-start'] = "0px " + vals[0];
	  		myObj['animation-end'] = "0px " + vals[1] ;
		}
  	break;
  	
	//==================== Fade =========================
  	case "fade":  		
  		myObj['animation-prop'] = "opacity";
  		myObj['animation-start'] = vals[0];
  		myObj['animation-end'] = vals[1];
  		break;

  	case "rotate":

  	break;

  	default:
  	 console.log("Error - cant find animation " + animType);
  	 break;
  }//s

  if (DATA.length > 2) myObj['animation-duration'] = 	DATA[2];
  if (DATA.length > 3) myObj['animation-timing-function'] = DATA[3];
  if (DATA.length > 4) myObj['animation-delay'] = 			DATA[4];
  if (DATA.length > 5) myObj['animation-direction'] = 		DATA[5];
  if (DATA.length > 6) myObj['animation-iteration-count'] = DATA[6];
  if (DATA.length > 7) myObj['animation-fill-mode'] = 		DATA[7];
  if (DATA.length > 8) myObj['animation-play-state'] = 		DATA[8];

  // Finalize Obj
 // console.log(myObj)
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


