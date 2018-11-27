function getRepos(input){
	var repos = "https://api.github.com/users/" + input + "/repos";
	consol.log(repos);
	var commits = [];
	var returnData = [];
	for(var i=0;i<repos.length;i++){
		commitsData = repos[i].commits_url.substring(0,repos[i].commits_url.length-6);
		commits = jsonParse(commitsData);
		returnData.push({"repo_name":repos[i].name, "commits":commits.length});
	}
	consol.log(returnData);
	return returnData;
}

function plot(data){
	var name=[];
	var	commits=[];
	console.log(data[0].repo_name);
	for(var i = 0 ; i<data.length ; i ++)
	{
		name[i]= data[i].repo_name;
		commits[i]= data[i].commits;
	}
	var width = 600;
	var height = 600; 
    		console.log(data);
         var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2;
        
         var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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
			   .on("mouseover", handleMouseOver)
			   .on("mouseout", handleMouseOut);
            
            arc.append("path")
               .attr("d", path)
               .attr("fill", function(d) { return color(d.data.repo_name); });
        
            console.log(arc)
}


