import * as d3 from "d3";

export default function PlotAllTouches(touches, pitch, mode, pitchMultiplier, color, width, height) {
    const h = pitch
        .append("path")
        .style("stroke", "white")
        .style("fill-opacity", "0.2")
        .style("fill", color);

    if (mode) var points = touches.map(o => new Object({ x: (105 - Number(o.x)) * pitchMultiplier, y: (68 - Number(o.y)) * pitchMultiplier }))
    else var points = touches.map(o => new Object({ x: Number(o.x) * width / 105, y: (68 - Number(o.y)) * height / 68 }))



    const densityData = d3.contourDensity()
        .x(function (d) {
            if (mode) return (68 - Number(d.y)) * pitchMultiplier
            else return (Number(d.x)) * width / 105
        })
        .y(function (d) {
            if (mode) return (105 - Number(d.x)) * pitchMultiplier
            else return (68 - Number(d.y)) * height / 68
        })
        .size([width, height])
        .bandwidth(17)
        (touches)


    var color_kde = d3.scaleLinear().domain([0, d3.max(densityData, d => d.value)])
        .interpolate(d3.interpolateRgb)
        .range([d3.rgb("#2a2e30"), d3.rgb(color)])

    pitch.insert("g", "g")
        .selectAll("path")
        .data(densityData)
        .enter().append("path")
        .attr("d", d3.geoPath())
        .attr("fill", function (d) {
            return color_kde(Number(d.value));
        })
        .attr("z-index", -1)

    var getPitchLines = [{ "x1": 0, "x2": 16.5, "y1": 13.85, "y2": 13.85 }, { "x1": 16.5, "x2": 16.5, "y1": 13.85, "y2": 54.15 }, { "x1": 0, "x2": 16.5, "y1": 54.15, "y2": 54.15 }, { "x1": 0, "x2": 5.5, "y1": 24.85, "y2": 24.85 }, { "x1": 5.5, "x2": 5.5, "y1": 24.85, "y2": 43.15 }, { "x1": 0, "x2": 5.5, "y1": 43.15, "y2": 43.15 }, { "x1": 88.5, "x2": 105, "y1": 13.85, "y2": 13.85 }, { "x1": 88.5, "x2": 88.5, "y1": 13.85, "y2": 54.15 }, { "x1": 88.5, "x2": 105, "y1": 54.15, "y2": 54.15 }, { "x1": 99.5, "x2": 105, "y1": 24.85, "y2": 24.85 }, { "x1": 99.5, "x2": 99.5, "y1": 24.85, "y2": 43.15 }, { "x1": 99.5, "x2": 105, "y1": 43.15, "y2": 43.15 }, { "x1": 0, "x2": 105, "y1": 0, "y2": 0 }, { "x1": 0, "x2": 105, "y1": 68, "y2": 68 }, { "x1": 0, "x2": 0, "y1": 0, "y2": 68 }, { "x1": 105, "x2": 105, "y1": 0, "y2": 68 }, { "x1": 52.5, "x2": 52.5, "y1": 0, "y2": 68 }, { "x1": -1.5, "x2": -1.5, "y1": 30.34, "y2": 37.66 }, { "x1": -1.5, "x2": 0, "y1": 30.34, "y2": 30.34 }, { "x1": -1.5, "x2": 0, "y1": 37.66, "y2": 37.66 }, { "x1": 106.5, "x2": 106.5, "y1": 30.34, "y2": 37.66 }, { "x1": 0, "x2": -1.5, "y1": 30.34, "y2": 30.34 }, { "x1": 105, "x2": 106.5, "y1": 30.34, "y2": 30.34 }, { "x1": 105, "x2": 106.5, "y1": 37.66, "y2": 37.66 }]

    const pitchLineData = getPitchLines;
    pitch.selectAll('.pitchLines')
        .data(pitchLineData)
        .enter().append('line')
        .attr('x1', d => d['x1'] * width / 105)
        .attr('x2', d => d['x2'] * width / 105)
        .attr('y1', d => d['y1'] * height / 68)
        .attr('y2', d => d['y2'] * height / 68)
        .style('stroke-width', 1.8)
        .style('stroke', "#757272")
        .style("stroke-dasharray", ("0,0"));

    pitch.selectAll("rect")
        .data([90])
        .join("rect")
        .attr("x", 0).attr("y", -10).attr("height", 10).attr("width", 105 * width / 105).style("fill", "red")
    /*
var array = []
for (var i = 0; i < points.length; i++) {
    if (mode) array.push([points[i].y, points[i].x])
    else array.push([points[i].x, points[i].y])
}

var hull = d3.polygonHull(array)

for (let i = 2; i <= hull.length; i++) {
    const visible = hull.slice(0, i);
    h.attr("d", `M${visible.join("L")}Z`);
}

var circles = pitch.selectAll('.progressiveCircles')
    .data(touches)
    .enter().append('circle')
    .attr("id", "progressive")
    .attr("cx", function (d) {
        if (mode) return (68 - Number(d.y)) * pitchMultiplier
        else return (Number(d.x)) * width / 105
    })
    .attr("cy", function (d) {
        if (mode) return (105 - Number(d.x)) * pitchMultiplier
        else return (68 - Number(d.y)) * height / 68
    })
    .attr('r', 5)
    .style('stroke-width', 1)
    .style("filter", "url(#glow)")
    .style('stroke', color)
    .style('fill', "white")
    .style("fill-opacity", function (d) {
        if (d.outcomeType == "Successful") return 0.5
        else return 0.2
    })
    .style("stroke-opacity", function (d) {
        if (d.outcomeType == "Successful") return 0.7
        else return 0.2
    })*/


}