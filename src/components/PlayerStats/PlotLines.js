import * as d3 from "d3";

export function plot_lines(svg, data, pitchMultiplier, mode) {
    var lineWidth = 1.8
    svg.selectAll('.progressiveLines')
        .data(data)
        .enter().append("line")
        .attr("id", "progressive")
        .attr("x1", function (d) {
            if (mode) return (68 - Number(d.y)) * pitchMultiplier
            else return (Number(d.x)) * pitchMultiplier
        })
        .attr("y1", function (d) {
            if (mode) return (105 - Number(d.x)) * pitchMultiplier
            else return (68 - Number(d.y)) * pitchMultiplier
        })
        .attr("x2", function (d) {
            if (mode) return (68 - Number(d.endY)) * pitchMultiplier
            else return (Number(d.endX)) * pitchMultiplier
        })
        .attr("y2", function (d) {
            if (mode) return (105 - Number(d.endX)) * pitchMultiplier
            else return (68 - Number(d.endY)) * pitchMultiplier
        })
        .style("filter", "url(#glow)")
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .attr("stroke", "white")
        .attr("stroke-width", lineWidth)
}