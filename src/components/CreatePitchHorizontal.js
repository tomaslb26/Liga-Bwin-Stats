import React from "react";
import * as d3 from "d3";

export default function CreatePitchHorizontal(svg, pitchMultiplier) {

    var lineColor = "#757272"
    var lineWidth = 1.8
    var pitchColor = "#eee"

    var getPitchLines = [{ "x1": 0, "x2": 16.5, "y1": 13.85, "y2": 13.85 }, { "x1": 16.5, "x2": 16.5, "y1": 13.85, "y2": 54.15 }, { "x1": 0, "x2": 16.5, "y1": 54.15, "y2": 54.15 }, { "x1": 0, "x2": 5.5, "y1": 24.85, "y2": 24.85 }, { "x1": 5.5, "x2": 5.5, "y1": 24.85, "y2": 43.15 }, { "x1": 0, "x2": 5.5, "y1": 43.15, "y2": 43.15 }, { "x1": 88.5, "x2": 105, "y1": 13.85, "y2": 13.85 }, { "x1": 88.5, "x2": 88.5, "y1": 13.85, "y2": 54.15 }, { "x1": 88.5, "x2": 105, "y1": 54.15, "y2": 54.15 }, { "x1": 99.5, "x2": 105, "y1": 24.85, "y2": 24.85 }, { "x1": 99.5, "x2": 99.5, "y1": 24.85, "y2": 43.15 }, { "x1": 99.5, "x2": 105, "y1": 43.15, "y2": 43.15 }, { "x1": 0, "x2": 105, "y1": 0, "y2": 0 }, { "x1": 0, "x2": 105, "y1": 68, "y2": 68 }, { "x1": 0, "x2": 0, "y1": 0, "y2": 68 }, { "x1": 105, "x2": 105, "y1": 0, "y2": 68 }, { "x1": 52.5, "x2": 52.5, "y1": 0, "y2": 68 }, { "x1": -1.5, "x2": -1.5, "y1": 30.34, "y2": 37.66 }, { "x1": -1.5, "x2": 0, "y1": 30.34, "y2": 30.34 }, { "x1": -1.5, "x2": 0, "y1": 37.66, "y2": 37.66 }, { "x1": 106.5, "x2": 106.5, "y1": 30.34, "y2": 37.66 }, { "x1": 0, "x2": -1.5, "y1": 30.34, "y2": 30.34 }, { "x1": 105, "x2": 106.5, "y1": 30.34, "y2": 30.34 }, { "x1": 105, "x2": 106.5, "y1": 37.66, "y2": 37.66 }]
    var getPitchCircles = [{ "cy": 34, "cx": 52.5, "r": 9.15, "color": "none" }, { "cy": 34, "cx": 11, "r": 0.3, "color": "#000" }, { "cy": 34, "cx": 94, "r": 0.3, "color": "#000" }, { "cy": 34, "cx": 52.5, "r": 0.3, "color": "#000" }]
    var getArcs = [{ "arc": { "innerRadius": 8, "outerRadius": 9, "startAngle": 1.5707963267948966, "endAngle": 3.141592653589793 }, "x": 0, "y": 0 }, { "arc": { "innerRadius": 8, "outerRadius": 9, "startAngle": 4.7124, "endAngle": 3.1416 }, "x": 0, "y": 105 }, { "arc": { "innerRadius": 8, "outerRadius": 9, "startAngle": 0, "endAngle": 1.5708 }, "x": 68, "y": 0 }, { "arc": { "innerRadius": 8, "outerRadius": 9, "startAngle": 6.283185307179586, "endAngle": 4.71238898038469 }, "x": 68, "y": 105 }]

    const pitch = svg.append('g')
        .attr('transform', `translate(${140},${10})`)


    const pitchLineData = getPitchLines;
    pitch.selectAll('.pitchLines')
        .data(pitchLineData)
        .enter().append('line')
        .attr('x1', d => d['x1'] * pitchMultiplier)
        .attr('x2', d => d['x2'] * pitchMultiplier)
        .attr('y1', d => d['y1'] * pitchMultiplier)
        .attr('y2', d => d['y2'] * pitchMultiplier)
        .style('stroke-width', lineWidth)
        .style('stroke', lineColor)
        .style("stroke-dasharray", ("0,0"));

    const pitchCircleData = getPitchCircles;
    pitch.selectAll('.pitchCircles')
        .data(pitchCircleData)
        .enter().append('circle')
        .attr('cx', d => d['cx'] * pitchMultiplier)
        .attr('cy', d => d['cy'] * pitchMultiplier)
        .attr('r', d => d['r'] * pitchMultiplier)
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
        .attr('transform', d => `translate(${pitchMultiplier * d.y},${pitchMultiplier * d.x})`)
        .style('fill', "none")
        .style('stroke', lineColor)
        .style("stroke-dasharray", ("0,0"));

    return pitch

}