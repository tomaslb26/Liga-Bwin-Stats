import * as d3 from "d3";
import { plot_goal } from "./../TeamStats/PlotGoal"
import "./../../styles/playerstats.css"


export function plot_shot_circles(svg, data, color, width, height, mode, team_color) {

    var lineWidth = 1.8

    function handleMouseOver(event, d) {

        d3.select(this).style("cursor", "pointer")
        svg.selectAll('line#remove')
            .remove()

        svg.selectAll('.progressiveLines')
            .data([d])
            .enter().append("line")
            .attr("id", "remove")
            .attr("x1", function (d) {
                if (mode) return (68 - Number(d.y)) * 5
                else return (Number(d.x)) * width / 105
            })
            .attr("y1", function (d) {
                if (mode) return (105 - Number(d.x)) * 5
                else return (68 - Number(d.y)) * height / 68
            })
            .attr("y2", d => {
                if (mode) {
                    if (d.blockedX == "") return (105 - 105) * 5
                    else return (105 - Number(d.blockedX)) * 5
                }
                else {
                    if (d.blockedY == "") return (68 - Number(d.goalCrossedY)) * height / 68
                    else return (68 - Number(d.blockedY)) * height / 68
                }
            })
            .attr("x2", d => {
                if (mode) {
                    if (d.blockedY == "") return (68 - Number(d.goalCrossedY)) * 5
                    else return (68 - Number(d.blockedY)) * 5
                }
                else {
                    if (d.blockedX == "") {
                        return 105 * width / 105
                    }
                    else return (Number(d.blockedX)) * width / 105
                }
            })
            .style("filter", "url(#glow)")
            .attr("stroke", "white")
            .style("stroke-width", 2)
            .style("stroke-opacity", 1)
            .attr("stroke-width", lineWidth)
            .attr("marker-end", "url(#triangle3)");
    }

    function handleMouseLeave(event, d) {
        svg.selectAll('line#remove')
            .remove()
    }

    function handleClick(event, d) {
        plot_goal(event, d, team_color);
    }

    svg.selectAll('.progressiveCircles')
        .data(data)
        .enter().append('circle')
        .attr("cx", function (d) {
            if (mode) return (68 - Number(d.y)) * 5
            else return (Number(d.x)) * width / 105
        })
        .attr("cy", function (d) {
            if (mode) return (105 - Number(d.x)) * 5
            else return (68 - Number(d.y)) * height / 68
        })
        .attr('r', d => 30 * d.expectedGoals)
        .on("click", handleClick)
        .on("mouseover", handleMouseOver)
        .on("mouseleave", handleMouseLeave)
        .style('stroke-width', 0.5)
        .style('stroke', "white")
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .style("filter", "url(#glow)")
        .style('fill', color)
        .style("fill-opacity", 1)
}