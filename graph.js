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
	var names=[];
	var	commits=[];
	console.log(data[0].repo_name);
	for(var i = 0 ; i<data.length ; i ++)
	{
		names[i]=data[i].repo_name;
		commits[i]=data[i].commits;
	}
	
	console.log(names[0]);
	d3.select("svg").remove();
		//////////////////////
         var width = 1000 
            scaleFactor = 20, 
            barHeight = 30;
         
         var graph = d3.select(".timeline")
            .append("svg")
            .attr("width", width)
            .attr("height", barHeight * commits.length * 2);
         
         var bar = graph.selectAll("g")
            .data(commits)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
               return "translate(0," + i * barHeight*2 + ")";
            });
         bar.append("rect").attr("width", function(d) {
            return d * scaleFactor;
         })
         
         .attr("height", barHeight - 1);
         
        bar.append("text")
            .attr("x", function(d) { return (d*scaleFactor); })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d; });
		var i = 0;
		bar.append("text")
            .attr("y", (barHeight/2)+barHeight )
			.data(names)
			.text(function(d) { return d; });
}