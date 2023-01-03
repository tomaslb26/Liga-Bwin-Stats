import * as d3 from "d3";

export function plot_lines(svg, data, width, height, mode) {
    var lineWidth = 1.8
    svg.selectAll('.progressiveLines')
        .data(data)
        .enter().append("line")
        .attr("id", "progressive")
        .attr("x1", function (d) {
            if (mode) return (68 - Number(d.y)) * (width + 80) / 68
            else return (Number(d.x)) * width / 105
        })
        .attr("y1", function (d) {
            if (mode) return (105 - Number(d.x)) * height / 105
            else return (68 - Number(d.y)) * height / 68
        })
        .attr("x2", function (d) {
            if (mode) return (68 - Number(d.endY)) * (width + 80) / 68
            else return (Number(d.endX)) * width / 105
        })
        .attr("y2", function (d) {
            if (mode) return (105 - Number(d.endX)) * height / 105
            else return (68 - Number(d.endY)) * height / 68
        })
        .style("filter", "url(#glow)")
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .attr("stroke", "white")
        .attr("stroke-width", lineWidth)
}