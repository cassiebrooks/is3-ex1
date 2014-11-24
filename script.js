var width = 960,
    height = 1160;
	
var projection = d3.geo.albers()
	.center([0, 55.4])
	.rotate([4.4, 0])
	.parallels([40, 60])
	.scale(6000)
	.translate([width / 2, height / 2]);
	
var path = d3.geo.path()
	.projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
		
d3.json("sco.json", function(sco) {
	svg.selectAll(".lad")
		.data(topojson.feature(sco, sco.objects.lad).features)
		.enter().append("path")
		.attr("class", function(d) { return "council " + d.id; })
		.on("mouseover", function(d) {
		   	d3.select(this).style("opacity", "0.7");
		})
		.on("mouseleave", function(d) {
		    d3.select(this).style("opacity", "1.0");
		})
		.on("click", function(d, i) { alert("test!"); }) // will hopefully eventually produce modal


		.attr("d", path)
		.append("svg:title")
		.text(function(d) { return d.properties.LAD13NM; })

		
	svg.append("path")
      .datum(topojson.mesh(sco, sco.objects.lad, function(a, b) { return a !== b; }))
      .attr("d", path)
      .attr("class", "council-boundary");
		}

	);

