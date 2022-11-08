import * as d3 from "d3";
import { plot_goal } from "./../TeamStats/PlotGoal"
import "./../../styles/playerstats.css"


export function plot_shot_circles(svg, data, color, pitchMultiplier, mode, team_color) {

    d3.select("body").selectAll("#tooltip_shots").remove()
    let tooltip_shots = d3.select("body").append("div").attr("id", "tooltip_shots")
        .attr("class", "tooltip3")
        .style("border", "2px solid " + team_color).style("opacity", 0).style("visibility", "hidden");

    d3.select("body").on("click", function () {
        d3.select("div#tooltip_shots").style("opacity", 0).style("visibility", "hidden");
    });

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
                if (mode) return (68 - Number(d.y)) * pitchMultiplier
                else return (Number(d.x)) * pitchMultiplier
            })
            .attr("y1", function (d) {
                if (mode) return (105 - Number(d.x)) * pitchMultiplier
                else return (68 - Number(d.y)) * pitchMultiplier
            })
            .attr("y2", d => {
                if (mode) {
                    if (d.blockedX == "") return (105 - 105) * pitchMultiplier
                    else return (105 - Number(d.blockedX)) * pitchMultiplier
                }
                else {
                    if (d.blockedY == "") return (68 - Number(d.goalCrossedY)) * pitchMultiplier
                    else return (68 - Number(d.blockedY)) * pitchMultiplier
                }
            })
            .attr("x2", d => {
                if (mode) {
                    if (d.blockedY == "") return (68 - Number(d.goalCrossedY)) * pitchMultiplier
                    else return (68 - Number(d.blockedY)) * pitchMultiplier
                }
                else {
                    if (d.blockedX == "") {
                        return 105 * pitchMultiplier
                    }
                    else return (Number(d.blockedX)) * pitchMultiplier
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
        plot_goal(event, d, team_color, tooltip_shots);
    }

    svg.selectAll('.progressiveCircles')
        .data(data)
        .enter().append('circle')
        .attr("cx", function (d) {
            if (mode) return (68 - Number(d.y)) * pitchMultiplier
            else return (Number(d.x)) * pitchMultiplier
        })
        .attr("cy", function (d) {
            if (mode) return (105 - Number(d.x)) * pitchMultiplier
            else return (68 - Number(d.y)) * pitchMultiplier
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