// RENDER FIRST CHART 
window.addEventListener("load", function firstChart() {
  var margin = {top: (parseInt(d3.select('body').style('width'), 10)/10), right: (parseInt(d3.select('body').style('width'), 10)/20), 
    bottom: (parseInt(d3.select('body').style('width'), 10)/5), left: (parseInt(d3.select('body').style('width'), 10)/20)},
    
    width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
    height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

  var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var x1 = d3.scale.ordinal();

  var y = d3.scale.linear()
    .range([height, 0]);

  var colorRange = d3.scale.category20();
  var color = d3.scale.ordinal()
    .range(colorRange.range());

  var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

  var divTooltip = d3.select('body').append("div").attr("class", "toolTip");

  var svg = d3.select('#chart').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var fixed_num = parseFloat(3.855422).toFixed( 2 );
  console.log(fixed_num);

  pcDataset = [
    {label:"Boys", "Not interested at all":4, "Not interested":8, "Neutral": 24, "Interested":26, "Very Interested":38},
    {label:"Girls", "Not interested at all":20, "Not interested":29, "Neutral": 27, "Interested":16, "Very Interested":8}
  ];
  
  var options = d3.keys(pcDataset[0]).filter(function(key) { return key !== "label"; });

  pcDataset.forEach(function(d) {
    d.valores = options.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(pcDataset.map(function(d) { return d.label; }));
  x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(pcDataset, function(d) { return d3.max(d.valores, function(d) { return d.value; }); })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Rating %");

  var bar = svg.selectAll(".bar")
    .data(pcDataset)
    .enter().append("g")
    .attr("class", "rect")
    .attr("transform", function(d) { return "translate(" + x0(d.label) + ",0)"; });

  bar.selectAll("rect")
    .data(function(d) { return d.valores; })
    .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("value", function(d){return d.name;})
    .attr("height", function(d) { return height - y(d.value); })
    .style("fill", function(d) { return color(d.name); });

  bar.on("mousemove", function(d){
      divTooltip.style("left", d3.event.pageX+10+"px");
      divTooltip.style("top", d3.event.pageY-25+"px");
      divTooltip.style("display", "inline-block");
      var x = d3.event.pageX, y = d3.event.pageY
      var elements = document.querySelectorAll(':hover');
      l = elements.length
      l = l-1
      elementData = elements[l].__data__
      divTooltip.html((d.label)+"<br>"+elementData.name+"<br>"+elementData.value+"%");
  });

  bar.on("mouseout", function(d){
      divTooltip.style("display", "none");
  });

  var legend = svg.selectAll(".legend")
    .data(options.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
});

// remove a chart 
function removeChart() {
  var chart = document.getElementById("chart");
  chart.parentNode.removeChild(chart);

  changeTitle(); 
}

function createChartID() {
  var chartDiv = document.createElement("div");
  chartDiv.id = "chart";  // set new div id to "chart" 

  var container = document.getElementsByClassName("container-fluid")[0]; 
  container.appendChild(chartDiv); // place in container-fluid 

  console.log(container); 
}

/// CHANGE CHART SUBTITLE 
function changeTitle() {
  var newTitle = document.getElementsByClassName("subtitle")[0]; 
  newTitle.innerHTML = "Dit is een nieuwe titel";
  console.log(newTitle); 
}


// LOAD NEW CHART
function loadNewChart() {

  createChartID(); 
  var margin = {top: (parseInt(d3.select('body').style('width'), 10)/10), right: (parseInt(d3.select('body').style('width'), 10)/20), 
    bottom: (parseInt(d3.select('body').style('width'), 10)/5), left: (parseInt(d3.select('body').style('width'), 10)/20)},
    width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
    height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

  var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var x1 = d3.scale.ordinal();

  var y = d3.scale.linear()
    .range([height, 0]);

  var colorRange = d3.scale.category20();
  var color = d3.scale.ordinal()
    .range(colorRange.range());

  var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

  var divTooltip = d3.select('body').append("div").attr("class", "toolTip");

  var svg = d3.select('#chart').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  pcDataset = [
    {label:"Boys", "Not interested at all":1, "Not interested":65, "Neutral": 4, "Interested":15, "Very Interested":15},
    {label:"Girls", "Not interested at all":50, "Not interested":5, "Neutral": 10, "Interested":35, "Very Interested":0}
  ];
  
  var options = d3.keys(pcDataset[0]).filter(function(key) { return key !== "label"; });

  pcDataset.forEach(function(d) {
    d.valores = options.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(pcDataset.map(function(d) { return d.label; }));
  x1.domain(options).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(pcDataset, function(d) { return d3.max(d.valores, function(d) { return d.value; }); })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Rating %");

  var bar = svg.selectAll(".bar")
    .data(pcDataset)
    .enter().append("g")
    .attr("class", "rect")
    .attr("transform", function(d) { return "translate(" + x0(d.label) + ",0)"; });

  bar.selectAll("rect")
    .data(function(d) { return d.valores; })
    .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("value", function(d){return d.name;})
    .attr("height", function(d) { return height - y(d.value); })
    .style("fill", function(d) { return color(d.name); });

  bar.on("mousemove", function(d){
      divTooltip.style("left", d3.event.pageX+10+"px");
      divTooltip.style("top", d3.event.pageY-25+"px");
      divTooltip.style("display", "inline-block");
      var x = d3.event.pageX, y = d3.event.pageY
      var elements = document.querySelectorAll(':hover');
      l = elements.length
      l = l-1
      elementData = elements[l].__data__
      divTooltip.html((d.label)+"<br>"+elementData.name+"<br>"+elementData.value+"%");
  });

  bar.on("mouseout", function(d){
      divTooltip.style("display", "none");
  });

  var legend = svg.selectAll(".legend")
    .data(options.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
}

/// UPDATE CHART 
function updateBars() {	
  removeChart(); 

  loadNewChart(); 

}

d3.select("#change").on("click", updateBars);