function jsonParse(url){
	var Httpreq = new XMLHttpRequest(); 
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
	x = JSON.parse(Httpreq.responseText);
    return x;
}