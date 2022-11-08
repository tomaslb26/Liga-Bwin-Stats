import React from "react";
import * as d3 from "d3";
import { create_glow } from '../CreateGlow';
import teams_colors from "./../../data/teams_colors"
import "./../../styles/global.css"

export default function Classification(props) {

    var dataset = props.data

    function append_rect(svg, x, y, width, height, color, opacity) {
        if (opacity === null) opacity = 1
        svg
            .append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("rx", 2)
            .transition()
            .ease(d3.easeLinear)
            .duration(800)
            .attr("height", height)
            .style("filter", "url(#glow)")
            .style("fill", color)
            .attr("width", width)
            .style("opacity", opacity)
    }

    function append_line(svg, x1, x2, y1, y2) {
        svg
            .append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y1)
            .attr("y2", y2)
            .style("stroke", "#ffb700")
            .style("stroke-width", "2px")
    }

    function append_text(svg, x, y, font_size, text, color) {
        svg
            .append("text")
            .attr("class", "text-d3")
            .attr("x", x)
            .attr("y", y)
            .style("font-size", font_size)
            .style("filter", "url(#glow)")
            .style("fill", color)
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(text);
    }


    var svgRef = React.useRef(null);
    if (props.win_width > 990) {
        var svgWidth = props.win_width / 2 - 100;
        var font_size = 130 * props.win_width / 1920
        font_size = String(font_size) + "%"
    }
    else {
        var svgWidth = props.win_width - 35
        var font_size = 130 * props.win_width / 968
        font_size = String(font_size) + "%"
    }
    var svgHeight = props.win_height - 200;

    var texts = ["Pos", "Team", "MP", "W", "D", "L", "G", "GA", "GD", "Points"]
    var lines = [0.1 * svgWidth, 0.08 * svgWidth, 0.05 * svgWidth, 0.05 * svgWidth, 0.05 * svgWidth, 0.05 * svgWidth, 0.05 * svgWidth, 0.07 * svgWidth, 0.07 * svgWidth, 0.15 * svgWidth]

    React.useEffect(() => {
        d3.select(svgRef.current).selectAll("*").remove();

        var svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)

        create_glow(svg)

        append_rect(svg, 0, 0, svgWidth, svgHeight / 19, "#ffb700")

        for (var j = 0; j < 18; j++) {
            append_rect(svg, 0, svgHeight / 19 + (j * (svgHeight / 19)), svgWidth, svgHeight / 19, "#1A1A1A")
        }


        var curr_position = svgHeight / 19 + (svgHeight / 19 / 2 + 5);
        for (var i = 1; i < 19; i++) {

            try {
                append_text(svg, lines[0] / 2, curr_position, font_size, dataset[i - 1]["Position"] + "º", "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] / 2, curr_position, font_size, dataset[i - 1]["Games"], "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] + lines[3] / 2, curr_position, font_size, dataset[i - 1]["Wins"], "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] + lines[3] + lines[4] / 2, curr_position, font_size, dataset[i - 1]["Draws"], "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] + lines[3] + lines[4] + lines[5] / 2, curr_position, font_size, dataset[i - 1]["Losses"], "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] + lines[3] + lines[4] + lines[5] + lines[6] / 2, curr_position, font_size, dataset[i - 1]["Goals"], "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] + lines[3] + lines[4] + lines[5] + lines[6] + lines[7] / 2, curr_position, font_size, dataset[i - 1]["Goals Against"], "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] + lines[3] + lines[4] + lines[5] + lines[6] + lines[7] + lines[8] / 2, curr_position, font_size, dataset[i - 1]["Goal Difference"], "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] + lines[3] + lines[4] + lines[5] + lines[6] + lines[7] + lines[8] + lines[9] / 2, curr_position, font_size, dataset[i - 1]["Points"], "#ffb700")
                append_text(svg, lines[0] + lines[1] + lines[2] + lines[3] + lines[4] + lines[5] + lines[6] + lines[7] + lines[8] + lines[9] + ((0.28 * svgWidth) / 2), curr_position, font_size, dataset[i - 1]["Attendance"], "#ffb700")
                append_rect(svg, lines[0], curr_position - (svgHeight / 19 / 2 + 5), lines[1], svgHeight / 19, teams_colors.filter((item) => (item.team === dataset[i - 1]["Team"]))[0]["color"], 0.2)
                svg
                    .append("image")
                    .attr("id", "logos_1")
                    .attr("x", lines[0] + (lines[1] / 2 - 14))
                    .attr("y", curr_position - 17.5)
                    .attr('height', 25)
                    .attr('width', 25)
                    .attr("xlink:href", d => require("./../../data/" + props.season + "/" + dataset[i - 1]["Team"].replaceAll(" ", "-") + ".png"))
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(800)
                    .attr("opacity", 1)
            }
            catch (e) {
                console.log(e)
            }

            curr_position += svgHeight / 19
        }

        var curr_position = 0;
        for (var k = 0; k < lines.length; k++) {
            append_text(svg, curr_position + (lines[k] / 2), svgHeight / 19 / 2 + 5, font_size, texts[k], "white")
            append_line(svg, curr_position + lines[k], curr_position + lines[k], 0, svgHeight)
            curr_position += lines[k]
        }

        append_text(svg, curr_position + ((0.28 * svgWidth) / 2), svgHeight / 19 / 2 + 5, font_size, "Attendance", "white")






    }, [props.data, props.win_width, props.win_height, props.season]);


    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}