var width = 630,
    height = 700;
	
var projection = d3.geo.albers()
	.center([0, 55.4])
	.rotate([4.4, 0])
	.parallels([40, 60])
	.scale(6000)
	.translate([width / 2, height / 1.2]);
	
var path = d3.geo.path()
	.projection(projection);

var svg = d3.select(".main .wrapper .big-map").append("svg")
    .attr("width", width)
    .attr("height", height);
  
var filterMin = 100000;
var filterMax = 150000;

// define tooltip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([100, -180])
  .html(function(d) {
    return 	"<h3 style='padding: 0px;'>Council Name: " + d.properties.LAD13NM + "</h3>"
			+ "<div class='tooltip-inner'>"
			+ "<h4> Population:   " + d.properties.data.electorate + "</h4>"
			+ "<h4> Yes Votes:   " + d.properties.data.yes + " (" + d.properties.data.yes_percentage + "%)</h4>"
			+ "<h4> No Votes:   " + d.properties.data.no + " (" + d.properties.data.no_percentage + "%)</h4>"
			+ "</div>"
			;
  })
 // call d3.tip on map
svg.call(tip)

// define modal
var modal = d3.modal()
	.attr('class', 'd3-modal')
	.attr('id', 'modal')
	.html(function(d) {
		return "<h2 style='padding: 0px;'>Council Name: " + d.properties.LAD13NM + "</h2>"
			+ "<div class='modal-inner'>"
			+ "<table><tr><td>Population</td><td>" + d.properties.data.electorate + "</td></tr><tr><td>Yes votes</td><td>" + d.properties.data.yes_percentage + "</td></tr><tr><td>No votes</td><td>" + d.properties.data.no_percentage + "</td></tr></table>"
			+ "<button class='close' onclick='document.getElementById(\"modal\").style.visibility=\"hidden\";document.getElementById(\"modal-cover\").style.visibility=\"hidden\";'>X</div>"
			+ "</div>"
			;
  })


 // call d3.modal on map
svg.call(modal)

		
d3.json("sco.json", function(sco) {
	// draw areas
	svg.selectAll(".lad")
		.data(topojson.feature(sco, sco.objects.lad).features)
		.enter().append("path")
		.attr("class", function(d) { return "council " + d.id; })
		
		// tooltips with d3-tip
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		
		// vaguely produces modal!
		.on("click", function(d) {
			d3.select(".modal-cover").style({'visibility': 'visible' });
			tip.hide(d);
			modal.show(d);
		})
		
		// add areas to map
		.attr("d",path)
		
		// filter areas
		.filter(function(d) {return d.properties.data.electorate < filterMin || d.properties.data.electorate > filterMax;})
		.attr("class", function(d) {return "filteredCouncil " + d.id; })
  
    // update filters
		.attr("d", path)
		.append("svg:title");
	
	// draw area boundaries
	svg.append("path")
      .datum(topojson.mesh(sco, sco.objects.lad, function(a, b) { return a !== b; }))
      .attr("d", path)
      .attr("class", "council-boundary")
      ;
		}
	);



