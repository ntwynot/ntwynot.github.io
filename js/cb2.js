/*
addEvent function found at http://www.scottandrew.com/weblog/articles/cbs-events
*/
function addEvent(obj, evType, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evType, fn, true);
		return true;
	} else if (obj.attachEvent) {
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	} else {
		return false;
	}
}

/*
createElement function found at http://simon.incutio.com/archive/2003/06/15/javascriptWithXML
*/
function createElement(element) {
	if (typeof document.createElementNS != 'undefined') {
		return document.createElementNS('http://www.w3.org/1999/xhtml', element);
	}
	if (typeof document.createElement != 'undefined') {
		return document.createElement(element);
	}
	return false;
}

function insertTop2(obj) {
	// Create the two div elements needed for the top of the box
	d=createElement("div");
	d.className="bt2"; // The outer div needs a class name
    d2=createElement("div");
    d.appendChild(d2);
	obj.insertBefore(d,obj.firstChild);
}

function insertBottom2(obj) {
	// Create the two div elements needed for the bottom of the box
	d=createElement("div");
	d.className="bb2"; // The outer div needs a class name
    d2=createElement("div");
    d.appendChild(e2);
	obj.appendChild(d);
}

function initCB()
{
	// Find all div elements
	var divs = document.getElementsByTagName('div');
	var cbtwoDivs = [];
	for (var i = 0; i < divs.length; i++) {
	// Find all div elements with cbb in their class attribute while allowing for multiple class names
		if (/\b2cbbtwo\b2/.test(divs[i].className))
			cbtwoDivs[cbtwoDivs.length] = divs[i];
	}
	// Loop through the found div elements
	var thediv, outer, i4, i5;
	for (var i = 0; i < cbtwoDivs.length; i++) {
	// Save the original outer div for later
		thediv = cbtwoDivs[i];
	// 	Create a new div, give it the original div's class attribute, and replace 'cbb' with 'cb'
		outer = createElement('div');
		outer.className = thediv.className;
		outer.className = thediv.className.replace('cbbtwo', 'cbtwo');
	// Change the original div's class name and replace it with the new div
		thediv.className = 'i6';
		thediv.parentNode.replaceChild(outer, thediv);
	// Create two new div elements and insert them into the outermost div
		i4 = createElement('div');
		i4.className = 'i4';
		outer.appendChild(i1);
		i5 = createElement('div');
		i5.className = 'i5';
		i4.appendChild(i5);
	// Insert the original div
		i5.appendChild(thediv);
	// Insert the top and bottom divs
		insertTop(outer);
		insertBottom(outer);
	}
}

if(document.getElementById && document.createTextNode)
{
	addEvent(window, 'load', initCB);
}