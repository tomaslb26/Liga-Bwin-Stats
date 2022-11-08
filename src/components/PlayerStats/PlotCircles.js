import * as d3 from "d3";

export function plot_circles(svg, data, color, pitchMultiplier, mode) {
    var lineWidth = 1.8

    if (pitchMultiplier === 5.5) var r = 4
    else r = 7

    svg.selectAll('.progressiveCircles')
        .data(data)
        .enter().append('circle')
        .attr("id", "progressive")
        .attr('cx', function (d) {
            if (mode) return (68 - Number(d.endY)) * pitchMultiplier
            else return (Number(d.endX)) * pitchMultiplier
        })
        .attr('cy', function (d) {
            if (mode) return (105 - Number(d.endX)) * pitchMultiplier
            else return (68 - Number(d.endY)) * pitchMultiplier
        })
        .attr('r', r)
        .style('stroke-width', lineWidth)
        .style("filter", "url(#glow)")
        .style('stroke', color)
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .style('fill', "#2a2e30")
        .style("fill-opacity", 1)
}