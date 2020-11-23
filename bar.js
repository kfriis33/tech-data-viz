
let svg_bar = d3.select("#bar1")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", graph_1_height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// x axis: number of movies genres
let x = d3.scaleLinear()
    .range([0, graph_1_width - margin.left - margin.right]);

// y axis: genres
let y = d3.scaleBand()
    .range([0, graph_1_height - margin.top - margin.bottom])
    .padding(0.1);  // Improves readability

// Set up reference to count SVG group
let countRef = svg_bar.append("g");

let y_axis_label = svg_bar.append("g");

// svg_bar.append("text")
// .attr("transform", `translate(-120, ${(graph_1_height - margin.top - margin.bottom) / 2})rotate(-90)`)       // HINT: Place this at the center left edge of the graph
// .style("text-anchor", "middle")
// .text("Genre");

let x_axis_text = svg_bar.append("text")
.attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2},
        ${(graph_1_height - margin.top - margin.bottom) + 15})`)
.style("text-anchor", "middle");

let title = svg_bar.append("text")
.attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2}, ${-10})`)       // HINT: Place this at the top middle edge of the graph
.style("text-anchor", "middle")
.style("font-size", 15);

function startBar(source, color) {
    d3.csv('./data/word_counts.csv').then(function(data) {
        setData(data, svg_bar, graph_1_width, graph_1_height, source, color);
    });
}

const fillColor = d3.scaleOrdinal()
    .domain(["1", "2", "3", "5", "99"])
    .range(["#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#AAAAAA"]);


function setData(data, svg, width, height, source, color) {
   
    // x axis: number of movies genres
    x.domain([0, d3.max(data, function(d) { return d.count; })]);

    // y axis: genres
    y.domain(data.map(function(d) { return d.word; }));

    y_axis_label.call(d3.axisLeft(y).tickSize(0).tickPadding(10));

    let bars = svg.selectAll("rect")
        .data(data, function(d) {return d.word});

    bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(1000)
        // .attr("fill", function(d) { return color(d.key) })
        .attr('fill', color)
        .attr("x", x(0))
        .attr("y", function(d) { return y(d.word); })
        .attr("width", function(d) { return x(parseInt(d.count)); })
        .attr("height",  y.bandwidth());

    let c = countRef.selectAll("text").data(data);


    // Render the text elements on the DOM
    c.enter()
        .append("text")
        .merge(c)
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(parseInt(d.count)) + 10; })       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
        .attr("y", function(d) { return y(d.word) + 10})       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
        .style("text-anchor", "start")
        .text(function(d) { return parseInt(d.count)});

    x_axis_text.text(`Word Count`);
    title.text(`${source}`);

    // Remove elements not in use if fewer groups in new dataset
    bars.exit().remove();
    c.exit().remove();
}

startBar("The Intercept", '#0074D9');