/* <!--//--><![CDATA[//><!--
startList = function() {
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}
}
window.onload=startList;

//--><!]]>



son of suckerfish menu script from:
http://www.htmldog.com/articles/suckerfish/dropdowns/
*/

sfHover = function() {
    if (!document.getElementsByTagName) return false;
    var sfEls = document.getElementById("nav").getElementsByTagName("li");
    for (var i=0; i<sfEls.length; i++) {
        sfEls[i].onmouseover=function() {
            this.className+=" sfhover";
            this.style.zIndex=8000; //this line added to force flyout to be above relatively positioned stuff in IE
        }
        sfEls[i].onmouseout=function() {
            this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
        }
    }
}
if (window.attachEvent) window.attachEvent("onload", sfHover); 

/* Raphael GOETTER www.alsacreations.com 
  
window.onload=show;
function show(id) {
var d = document.getElementById(id);
	for (var i = 1; i<=10; i++) {
		if (document.getElementById('smenu'+i)) {document.getElementById('smenu'+i).style.display='none';}
	}
if (d) {d.style.display='block';} */


function externalLinks() 
{ 
    if (!document.getElementsByTagName) return; 
    var anchors = document.getElementsByTagName("a"); 
    var map = {external:"_blank", nofollow:"_blank"}; 
    var anchor, i, target; 
    for (i=0; anchor=anchors[i++];) 
        if( anchor.getAttribute("href") && (target=map[anchor.getAttribute("rel")])) 
            anchor.setAttribute("target", target); 
   
} 
window.onload = externalLinks;

/// Hide Tooltips
/*
function hideTip( self ) {
$("#" + self.id + "ToolTip").css("visibility","hidden");
} 
function showTip( self ) {
$("#" + self.id + "ToolTip").css("visibility","visible");
} 
$(document).ready( function() {
$("#change_me") //Change this to the ID that contains your tooltips as a whole. 
.find("input[@type=text]")
.focus( function() {
showTip(this);
})
.blur( function() {
hideTip(this);
}).end()
.find("select")
.focus( function() {
showTip(this);
})
.blur( function() {
hideTip(this);
}).end();
});
*/

function externalLinks() 
{ 
    if (!document.getElementsByTagName) return; 
    var anchors = document.getElementsByTagName("a"); 
    var map = {external:"_blank", nofollow:"_blank"}; 
    var anchor, i, target; 
    for (i=0; anchor=anchors[i++];) 
        if( anchor.getAttribute("href") && (target=map[anchor.getAttribute("rel")])) 
            anchor.setAttribute("target", target); 
   
} 
window.onload = externalLinks;