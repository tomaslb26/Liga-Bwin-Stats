import * as d3 from "d3";

export default function PlotAllTouches(touches, pitch, mode, pitchMultiplier, color) {
    const h = pitch
        .append("path")
        .style("stroke", "white")
        .style("fill-opacity", "0.2")
        .style("fill", color);

    if (mode) var points = touches.map(o => new Object({ x: (105 - Number(o.x)) * pitchMultiplier, y: (68 - Number(o.y)) * pitchMultiplier }))
    else var points = touches.map(o => new Object({ x: Number(o.x) * pitchMultiplier, y: (68 - Number(o.y)) * pitchMultiplier }))

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
            else return (Number(d.x)) * pitchMultiplier
        })
        .attr("cy", function (d) {
            if (mode) return (105 - Number(d.x)) * pitchMultiplier
            else return (68 - Number(d.y)) * pitchMultiplier
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
        })


}