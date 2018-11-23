!function(){

var salesData=[
	{label:"https://api.github.com/users/fieldsal/repos/"+name, value: "https://api.github.com/repos/fieldsal/"+name +"/commits" ,  color:"#3366CC"},
	{label:"https://api.github.com/users/fieldsal/repos/"+name, value: "https://api.github.com/repos/fieldsal/"+name +"/commits" , color:"#DC3912"},
	{label:"https://api.github.com/users/fieldsal/repos/"+name, value: "https://api.github.com/repos/fieldsal/"+name +"/commits" , color:"#FF9900"},
	{label:"https://api.github.com/users/fieldsal/repos/"+name, value: "https://api.github.com/repos/fieldsal/"+name +"/commits" , color:"#109618"},
	{label:"https://api.github.com/users/fieldsal/repos/"+name, value: "https://api.github.com/repos/fieldsal/"+name +"/commits" , color:"#990099"}
];

var svg = d3.select("body").append("svg").attr("width", 700).attr("height", 400);

svg.append("g").attr("id","salespie");
svg.append("g").attr("id","quotespie");
	
gradPie.draw("salespie", randomData(), 200, 200, 160);
gradPie.draw("quotespie", randomData(), 500, 200, 100);

function changeData(){
	gradPie.transition("salespie", randomData(), 160);
	gradPie.transition("quotespie", randomData(), 100);
}

function randomData(){
	return salesData.map(function(d){ 
		return {label:d.label, value:d.value, color:d.color};});
}

}
