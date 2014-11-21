var councils = {};

(function(){
	var councilPaths = [
		{
			id:"CL",n:"Clackmannanshire", d:"M3.8169,56.1024,L7.8328,63.1090,L10.8281,63.1106,L14.6440,66.1457,L12.6525,60.1081,L3.77150,56.09558,L3.8490,56.1242,L3.8818,56.1289,L3.8562,56.1550,L3.7642,56.2130Z"
		}
	];
			
	councils.draw = function(id, data, toolTip){		
		function mouseOver(d){
			d3.select("#tooltip").transition().duration(200).style("opacity", .9);      
			
			d3.select("#tooltip").html(toolTip(d.n, data[d.id]))  
				.style("left", (d3.event.pageX) + "px")     
				.style("top", (d3.event.pageY - 28) + "px");
		}
		
		function mouseOut(){
			d3.select("#tooltip").transition().duration(500).style("opacity", 0);      
		}
		
		d3.select(id).selectAll(".council")
			.data(councilPaths).enter().append("path").attr("class","state").attr("d",function(d){ return d.d;})
			.style("fill",function(d){ return data[d.id].color; })
			.on("mouseover", mouseOver).on("mouseout", mouseOut);
	}
	this.councilPaths=councilPaths;
})();
