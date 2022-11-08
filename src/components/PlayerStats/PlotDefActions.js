import * as d3 from "d3";
export function plot_def_actions(svg, data, color, pitchMultiplier, mode) {
    svg.selectAll('.progressiveCircles')
        .data(data)
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
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .style("filter", "url(#glow)")
        .style('fill', color)
        .style("fill-opacity", function (d) {
            if (d.outcomeType == "Successful") return 0.7
            else return 0.2
        })
}