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