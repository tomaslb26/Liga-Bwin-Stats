import * as d3 from "d3";
import { create_glow } from "../CreateGlow";
import "./../../styles/playerstats.css"

export function plot_goal(event, d, color, tooltip) {
    tooltip.select("svg").remove()

    tooltip.transition()
        .duration(200)
        .style("opacity", 1).style("visibility", "visible");

    tooltip.style("left", event.x - 340 + "px")
        .style("top", event.y - 140 + "px").style("border", "2px solid " + color);

    var lineColor = "white"
    var lineWidth = 1.8
    var pitchColor = "#eee"
    var pitchMultiplier = 25.5
    var goalWidth = 7.5
    var goalHeight = 2.5

    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    }

    var width = 350
    var height = 150

    const svg = tooltip.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom).style("padding-left", "18.5%").style("padding-top", "2.5%");

    create_glow(svg)

    const goal = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.right})`)

    goal.append('rect')
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('fill', pitchColor)
        .style("opacity", "0")

    var getGoalLines = [{ 'x1': -0.5, 'x2': 8, 'y1': 2.5, 'y2': 2.5, "type": "underline" }, { 'x1': 0, 'x2': 7.5, 'y1': 0, 'y2': 0 }, { 'x1': 0, 'x2': 0, 'y1': 0, 'y2': 2.5 }, { 'x1': 7.5, 'x2': 7.5, 'y1': 0, 'y2': 2.5 }]

    const goalLineData = getGoalLines;
    goal.selectAll('.goalLines')
        .data(goalLineData)
        .enter().append('line')
        .attr('x1', d => d['x1'] * pitchMultiplier)
        .attr('x2', d => d['x2'] * pitchMultiplier)
        .attr('y1', d => d['y1'] * pitchMultiplier)
        .attr('y2', d => d['y2'] * pitchMultiplier)
        .style('stroke-width', d => {
            if (d.type == "underline") return 1
            else return 2.2
        })
        .style('stroke', lineColor)
        .style("stroke-dasharray", d => { if (d.type == "underline") return ("10,3") });


    if (d.blockedX == "") {
        event = d.eventType
        goal.selectAll('.goalCircles')
            .data([d])
            .enter().append("circle")
            .attr("cx", d => {
                return ((7.5 - (Number(d['goalCrossedY']) - 30)) * pitchMultiplier)
            })
            .attr("cy", d => {
                return (2.5 - d['goalCrossedZ']) * pitchMultiplier
            })
            .attr('r', 5)
            .style('stroke-width', 0.5)
            .style('stroke', "white")
            .style("filter", "url(#glow)")
            .style("fill", function (d) {
                if (d.eventType == "Goal") return "#42DC60"
                else if (d.eventType == "AttemptSaved") return "red"
                else if (d.eventType == "Post") return "#42DCD5"
                else return "red"
            })
    }
    else event = "Blocked"

    var string2 = "Player: " + d.playerName
    var string4 = String(d.expectedGoals).substring(0, 4) + " xG";

    var colors = ['#8C8984', "#35322E"]

    var i = 0

    function append_text(svg, y, text) {
        svg
            .append("rect")
            .attr("x", 0.1 * pitchMultiplier)
            .attr("y", (y - 0.5) * pitchMultiplier)
            .attr("height", 0.6 * pitchMultiplier)
            .style("stroke-width", 1)
            .style("filter", "url(#glow)")
            .style("stroke", color)
            .style("fill", function (d) {
                if (i == 0) i = 1
                else {
                    i = 0
                }
                return colors[i]
            })
            .attr("width", 8.85 * pitchMultiplier)


        svg
            .append("text")
            .attr("x", 4.4 * pitchMultiplier)
            .attr("y", y * pitchMultiplier)
            .attr("dx", "0%")
            .attr("text-anchor", "middle")
            .attr("class", "text-d3")
            .style("font-size", "12px")
            .style("filter", "url(#glow)")
            .style("fill", "white")
            .style("font-weight", "bold")
            .text(text);


    }

    append_text(svg, 4.2, string2)
    append_text(svg, 4.8, event)
    append_text(svg, 5.4, "Situation: " + d.situation.replace(/([A-Z])/g, ' $1').trim())
    append_text(svg, 6, d.shotType.replace(/([A-Z])/g, ' $1').trim())
    append_text(svg, 6.6, string4 + " - " + String(d.expectedGoalsOnTarget).substring(0, 4) + " xGOT")



}