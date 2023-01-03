import * as d3 from "d3";

export default function PlotAllTouches(touches, pitch, mode, pitchMultiplier, color, width, height) {
    const h = pitch
        .append("path")
        .style("stroke", "white")
        .style("fill-opacity", "0.2")
        .style("fill", color);

    if (mode) {
        width = width + 80
        var points = touches.map(o => new Object({ x: (105 - Number(o.x)) * width / 68, y: (68 - Number(o.y)) * height / 105 }))
    }
    else var points = touches.map(o => new Object({ x: Number(o.x) * width / 105, y: (68 - Number(o.y)) * height / 68 }))

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
            if (mode) return (68 - Number(d.y)) * width / 68
            else return (Number(d.x)) * width / 105
        })
        .attr("cy", function (d) {
            if (mode) return (105 - Number(d.x)) * height / 105
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
        })


}