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
	var width = 300;
	var height = 300; 
    		console.log(data);
         var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2;
        
         var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
			svg.append("g")
				.attr("class", "labels");
			svg.append("g")
				.attr("class", "lines");
		 var key = function(d){ return d.data.commits; };
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
		/*	
           arc.append("text").attr("transform",function(d){
		   return "translate("+label.centroid(d)+")";})
			   .text(function(d){return d.data.repo_name;});
         */
		 
	var text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		.text(function(d) {
			return d.data.repo_name;
		});
	
	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	text.exit()
		.remove();
		var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);
	
	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	
	polyline.exit()
	.remove();

            console.log(arc)
}


