import React from "react";
import * as d3 from "d3";

export default function CreatePitchHorizontal(svg, width, height) {

    var lineColor = "#757272"
    var lineWidth = 1.8
    var pitchColor = "#eee"

    var getPitchLines = [{ "x1": 0, "x2": 16.5, "y1": 13.85, "y2": 13.85 }, { "x1": 16.5, "x2": 16.5, "y1": 13.85, "y2": 54.15 }, { "x1": 0, "x2": 16.5, "y1": 54.15, "y2": 54.15 }, { "x1": 0, "x2": 5.5, "y1": 24.85, "y2": 24.85 }, { "x1": 5.5, "x2": 5.5, "y1": 24.85, "y2": 43.15 }, { "x1": 0, "x2": 5.5, "y1": 43.15, "y2": 43.15 }, { "x1": 88.5, "x2": 105, "y1": 13.85, "y2": 13.85 }, { "x1": 88.5, "x2": 88.5, "y1": 13.85, "y2": 54.15 }, { "x1": 88.5, "x2": 105, "y1": 54.15, "y2": 54.15 }, { "x1": 99.5, "x2": 105, "y1": 24.85, "y2": 24.85 }, { "x1": 99.5, "x2": 99.5, "y1": 24.85, "y2": 43.15 }, { "x1": 99.5, "x2": 105, "y1": 43.15, "y2": 43.15 }, { "x1": 0, "x2": 105, "y1": 0, "y2": 0 }, { "x1": 0, "x2": 105, "y1": 68, "y2": 68 }, { "x1": 0, "x2": 0, "y1": 0, "y2": 68 }, { "x1": 105, "x2": 105, "y1": 0, "y2": 68 }, { "x1": 52.5, "x2": 52.5, "y1": 0, "y2": 68 }, { "x1": -1.5, "x2": -1.5, "y1": 30.34, "y2": 37.66 }, { "x1": -1.5, "x2": 0, "y1": 30.34, "y2": 30.34 }, { "x1": -1.5, "x2": 0, "y1": 37.66, "y2": 37.66 }, { "x1": 106.5, "x2": 106.5, "y1": 30.34, "y2": 37.66 }, { "x1": 0, "x2": -1.5, "y1": 30.34, "y2": 30.34 }, { "x1": 105, "x2": 106.5, "y1": 30.34, "y2": 30.34 }, { "x1": 105, "x2": 106.5, "y1": 37.66, "y2": 37.66 }]
    var getPitchCircles = [{ "cy": 34, "cx": 52.5, "r": 9.15, "color": "none" }, { "cy": 34, "cx": 11, "r": 0.3, "color": "#000" }, { "cy": 34, "cx": 94, "r": 0.3, "color": "#000" }, { "cy": 34, "cx": 52.5, "r": 0.3, "color": "#000" }]
    var getArcs = [{ "arc": { "innerRadius": 8, "outerRadius": 9, "startAngle": Math.PI / 2, "endAngle": Math.PI }, "x": 0, "y": 0 }, { "arc": { "innerRadius": 8, "outerRadius": 9, "startAngle": 0, "endAngle": Math.PI / 2 }, "x": 0, "y": 68 }, { "arc": { "innerRadius": 8, "outerRadius": 9, "startAngle": 3 * Math.PI / 2, "endAngle": Math.PI }, "x": 105, "y": 0 }, { "arc": { "innerRadius": 8, "outerRadius": 9, "startAngle": 2 * Math.PI, "endAngle": 3 * Math.PI / 2 }, "x": 105, "y": 68 }]

    const pitch = svg.append('g').attr('transform', `translate(${40},${10})`)

    const pitchLineData = getPitchLines;
    pitch.selectAll('.pitchLines')
        .data(pitchLineData)
        .enter().append('line')
        .attr('x1', d => d['x1'] * width / 105)
        .attr('x2', d => d['x2'] * width / 105)
        .attr('y1', d => d['y1'] * height / 68)
        .attr('y2', d => d['y2'] * height / 68)
        .style('stroke-width', lineWidth)
        .style('stroke', lineColor)
        .style("stroke-dasharray", ("0,0"));

    const pitchCircleData = getPitchCircles;
    pitch.selectAll('.pitchCircles')
        .data(pitchCircleData)
        .enter().append('circle')
        .attr('cx', d => d['cx'] * width / 105)
        .attr('cy', d => d['cy'] * height / 68)
        .attr('r', d => d['r'] * 5)
        .style('stroke-width', lineWidth)
        .style('stroke', lineColor)
        .style('fill', d => d['color'])
        .style("stroke-dasharray", ("0,0"));

    const pitchArcData = getArcs;
    const arc = d3.arc();
    pitch.selectAll('.pitchCorners')
        .data(pitchArcData)
        .enter().append('path')
        .attr('d', d => arc(d['arc']))
        .attr('transform', d => `translate(${(d.x * width / 105)},${(d.y * height / 68)})`)
        .style('fill', "none")
        .style('stroke', lineColor);


    return pitch

}