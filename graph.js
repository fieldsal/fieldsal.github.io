function getRepos(input){
	var repos = "https://api.github.com/users/" + input + "/repos";
	var commits = [];
	var returnData = [];
	for(var i=0;i<repos.length;i++){
		commitsData = repos[i].commits_url.substring(0,repos[i].commits_url.length-6);
		commits = jsonParse(commitsData);
		returnData.push({"repo_name":repos[i].name, "commits":commits.length});
	}
	return returnData;
}

function plot(data){
	var name=[];
	var	commits=[];
	for(var i = 0 ; i<data.length ; i ++)
	{
		name[i]= data[i].repo_name;
		commits[i]= data[i].commits;
	}
	var width = 300;
	var height = 300; 
    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2;
        
    var g = svg.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
			svg.append("g")
				.attr("class", "ledgend");
			svg.append("g")
				.attr("class", "lines");
    var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);    
    var pie = d3.pie().value(function(d) { 
        return d.commits; 
    });
    var path = d3.arc()
        .outerRadius(radius - 10).innerRadius(0);
    var label = d3.arc()
        .outerRadius(radius).innerRadius(radius - 80);
    var arcAttrs = {
		cx: function(d) { return xScale(d.x); },
        cy: function(d) { return yScale(d.y); }
	};
    var arc = g.selectAll(".arc")
               .data(pie(data))
               .enter()
               .append("g")
               .attr("class", "arc",arcAttrs)
            arc.append("path")
               .attr("d", path)
               .attr("fill", function(d) { return color(d.data.repo_name); });
		    arc.append("text")
			   .attr("transform", function(d) {
				return "translate(" + label.centroid(d) + ")";
				})
				.attr("dy", ".35em")
				.style("text-anchor", "middle")
				.attr("fill", "#fff")
				.text(function(d, i) {
					return d.data.count > 0 ? d.data.repo_name : '';
				});
	
		var legendG = svg.selectAll(".legend")
					 .data(pie(data))
					 .enter().append("g")
					 .attr("transform", function(d,i){
						return "translate(" + (width - 110) + "," + (i * 15 + 20) + ")";
					 })
					 .attr("class", "legend");   
    
		legendG.append("rect")
			   .attr("width", 10)
			   .attr("height", 10)
			   .attr("fill", function(d) { return color(d.data.repo_name);
			   });
    
		legendG.append("text")
			   .text(function(d){
				return d.data.repo_name;
				})
			   .style("font-size", 12)
			   .attr("y", 10)
			   .attr("x", 11);
		
}


