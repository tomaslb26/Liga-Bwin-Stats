import * as d3 from "d3";

export function plot_circles(svg, data, color, width, height, mode) {
    var lineWidth = 1.8

    svg.selectAll('.progressiveCircles')
        .data(data)
        .enter().append('circle')
        .attr("id", "progressive")
        .attr('cx', function (d) {
            if (mode) return (68 - Number(d.endY)) * (width + 80) / 68
            else return (Number(d.endX)) * width / 105
        })
        .attr('cy', function (d) {
            if (mode) return (105 - Number(d.endX)) * height / 105
            else return (68 - Number(d.endY)) * height / 68
        })
        .attr('r', 7)
        .style('stroke-width', lineWidth)
        .style("filter", "url(#glow)")
        .style('stroke', color)
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .style('fill', "#2a2e30")
        .style("fill-opacity", 1)
}