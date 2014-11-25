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

// define tooltip	
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return 	"<h3 style='padding: 0px;'>Council Name: " + d.properties.LAD13NM + "</h3>"
			+ "<div class='tooltip-inner'>"
			+ "[stuff]"
			+ "</div>"
			;
  })
 // call d3.tip on map
svg.call(tip)


// define modal
var modal = d3.modal()
	.attr('class', 'd3-modal')
	.html(function(d) {
		return "<h3 style='padding: 0px;'>Council Name: " + d.properties.LAD13NM + "</h3>"
			+ "<div class='modal-inner'>"
			+ "[stuff]"
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

		// will hopefully eventually produce modal
		.on("click", modal.show)
		.on("click", function(d) {
			d3.select(".modal-cover")
			.attr('class', 'visible')})

		.attr("d", path)
		.append("svg:title");
	
	// draw area boundaries
	svg.append("path")
      .datum(topojson.mesh(sco, sco.objects.lad, function(a, b) { return a !== b; }))
      .attr("d", path)
      .attr("class", "council-boundary");
		}

	);

