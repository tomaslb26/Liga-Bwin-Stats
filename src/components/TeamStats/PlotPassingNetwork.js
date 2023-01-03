import React from "react";
import * as d3 from "d3";
import { create_glow } from './../CreateGlow';
import { createTriangle } from './../CreateTriangle';
import { mouseaux } from "./../MouseAux"
import "./../../styles/teamstats.css"
import { CreatePitch } from "../CreatePitch";


export default function PlotPassingNetwork(props) {
    var dataset = props.data;

    let tooltip = d3.select("body").append("div").attr("id", "tooltip_pass")
        .attr("class", "tooltip_2")
        .style("border", "2px solid " + props.color)
        .style("opacity", 0).style("visibility", "hidden")

    d3.select("body").on("click", function () {
        d3.selectAll(".tooltip").style("opacity", 0).style("visibility", "hidden")
        d3.selectAll("#tooltip_pass").style("opacity", 0).style("visibility", "hidden")
        d3.selectAll("#tooltip_actions").style("opacity", 0).style("visibility", "hidden")
        d3.selectAll("#tooltip_shots").style("opacity", 0).style("visibility", "hidden")
    });

    var lineWidth = 1.8
    var pitchMultiplier = 5.5

    if (props.win_width > 1400) {
        var svgWidth = props.win_width / 3 - 200;
        var svgHeight = props.win_height - 350;
    }
    else if (props.win_width > 992) {
        var svgWidth = props.win_width / 3 - 100;
        var svgHeight = props.win_height - 180;
    }
    else if (props.win_width > 768) {
        var svgWidth = props.win_width / 2 - 50
        var svgHeight = 650;

    }
    else {
        var svgWidth = props.win_width - 70
        var svgHeight = 600;

    }

    const svgRef = React.useRef(null);

    React.useEffect(() => {

        d3.select(svgRef.current).selectAll("*").remove();
        var svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)

        var pitch = CreatePitch(svg, svgWidth, svgHeight - 20)

        if (props.data != null) {
            var positions = [];
            dataset.filter(function (d) {
                if (d.average_location == "True") positions.push({ 'name': d.name, 'shirtNo': Number(d.shirtNo), 'x': Number(d.x), 'y': Number(d.y) })
            })

            var lines = dataset.filter(function (d) {
                if (d.average_location == "False") return d;
            })

            var pass_count = []
            lines.filter(function (d) {
                pass_count.push(Number(d.pass_count));
            })

            const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
            var avgPasses = average(pass_count);
            var max = Math.max.apply(Math, pass_count)
            var min = Math.min.apply(Math, pass_count)

            var t1 = (avgPasses + max) / 2
            var t2 = (avgPasses + min) / 2

            create_glow(pitch)
            createTriangle(pitch, "triangle", 1)
            createTriangle(pitch, "triangle2", 0.1)

            pitch.selectAll('.pitchLines')
                .data(lines)
                .enter().append("line")
                .attr("id", "passing")
                .attr("x1", d => (68 - Number(d.y)) * (svgWidth / 68))
                .attr("y1", d => (105 - Number(d.x)) * (svgHeight - 20) / 105)
                .attr("x2", d => (68 - Number(d.mid_y)) * (svgWidth / 68))
                .attr("y2", d => (105 - Number(d.mid_x)) * (svgHeight - 20) / 105)
                .style("filter", "url(#glow)")
                .attr("stroke", "white")
                .attr("stroke-width", d => (Number(d.pass_count) * 2.5) / max)
                .attr("marker-end", "url(#triangle)");

            pitch.selectAll('.pitchLines')
                .data(lines)
                .enter().append("line")
                .attr("id", "passing")
                .attr("x1", d => (68 - Number(d.mid_y)) * (svgWidth / 68))
                .attr("y1", d => (105 - Number(d.mid_x)) * (svgHeight - 20) / 105)
                .attr("x2", d => (68 - Number(d.y_end)) * (svgWidth / 68))
                .attr("y2", d => (105 - Number(d.x_end)) * (svgHeight - 20) / 105)
                .style("filter", "url(#glow)")
                .attr("stroke", "white")
                .attr("stroke-width", d => (Number(d.pass_count) * 2.5) / max)

            //style='width:80px; height: 80px; padding-left:0%; display: inline-block;'
            function handleMouseClick(event, d) {

                tooltip.transition()
                    .duration(200)
                    .style("opacity", 1).style("visibility", "visible").style("left", event.x + "px")
                    .style("top", event.y + "px");

                var photoSrc = require(`./../../data/Photos/${props.team.replaceAll(" ", "-")}/${String(d.name)}.png`)

                tooltip.selectAll("*").remove()
                var svg_t = tooltip.append("svg")
                    .attr("width", 150)
                    .attr("height", 100).append('g')
                    .attr('transform', `translate(${20},${20})`)


                svg_t.append("svg:image")
                    .attr("width", 80)
                    .attr("height", 80)
                    .attr("x", 12)
                    .attr("y", 10)
                    .attr("xlink:href", photoSrc);

                svg_t
                    .append("text")
                    .attr("x", 55)
                    .attr("y", 0)
                    .attr("class", "text-d3")
                    .style("font-size", "13px")
                    .attr("text-anchor", "middle")
                    .style("filter", "url(#glow)")
                    .style("fill", "white")
                    .text(String(d.name));


                /*if (d.name.includes(" ")) var string2 = "<p style='display: inline-block; font-family: Inter, sans serif; font-size:60%; font-weight:bold; padding-left:2%'>" + d.name.split(" ")[0] + "<br>" +
                    d.name.split(" ")[1] + "<p/>";
                else var string2 = "<p style='display: inline-block; font-size:60%; font-weight:bold; padding-left:2%'>\n" + d.name + "<pre/>";
    
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 1).style("visibility", "visible");
                tooltip.html(string + string2).style("left", event.x + "px")
                    .style("top", event.y + "px");*/
            }

            function handleMouseOver(event, d) {
                d3.select(this).style("cursor", "pointer")
                mouseaux(pitch, "circle#nodes", d, "over")
                mouseaux(pitch, "text#numbers", d, "over", "shirtNo")
                mouseaux(d3.select("div#actions_svg"), "circle#progressive", d, "over", "name")
                mouseaux(d3.select("div#actions_svg"), "line#progressive", d, "over", "name")
                mouseaux(d3.select("div#actions_svg"), "circle#def", d, "over", "name")
                mouseaux(d3.select("div#actions_svg"), "circle#shots", d, "over", "name")

                pitch.selectAll("line#passing")
                    .attr("stroke-opacity", 0.1).attr("marker-end", "url(#triangle2)");
            }


            function handleMouseLeave(event, d) {
                mouseaux(pitch, "circle#nodes", d, "leave")
                mouseaux(pitch, "text#numbers", d, "over", "leave")
                mouseaux(d3.select("div#actions_svg"), "circle#progressive", d, "leave", "name")
                mouseaux(d3.select("div#actions_svg"), "line#progressive", d, "leave", "name")
                mouseaux(d3.select("div#actions_svg"), "circle#def", d, "leave", "name")
                mouseaux(d3.select("div#actions_svg"), "circle#shots", d, "leave", "name")
                pitch.selectAll("line#passing")
                    .attr("stroke-opacity", 1).attr("marker-end", "url(#triangle)");
            }

            pitch.selectAll('.pitchCircles')
                .data(positions)
                .enter().append('circle')
                .attr("id", "nodes")
                .attr('cy', d => (105 - d.x) * (svgHeight - 20) / 105)
                .attr('cx', d => (68 - d.y) * (svgWidth / 68))
                .attr('r', 15)
                .style('stroke-width', lineWidth)
                .style('stroke', "white")
                .style('fill', props.color)
                .style("filter", "url(#glow)")
                .style("fill-opacity", 0.8)
                .on("mouseover", handleMouseOver)
                .on("click", handleMouseClick)
                .on("mouseleave", handleMouseLeave)
                .style("stroke-dasharray", ("6,2"));

            pitch.selectAll('.pitchCircles')
                .data(positions).enter()
                .append("text")
                .attr("id", "numbers")
                .attr("x", d => (68 - d.y) * (svgWidth / 68))
                .attr("y", d => (105 - d.x) * (svgHeight - 20) / 105 + 5)
                .attr("class", "text-d3")
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("filter", "url(#glow)")
                .style("fill", "white")
                .on("mouseover", handleMouseOver)
                .on("click", handleMouseClick)
                .on("mouseleave", handleMouseLeave)
                .text(d => d.shirtNo);

            var game_time;
            dataset.filter(function (d) {
                game_time = d.game_minutes
            })

            pitch
                .append("text")
                .attr("x", (7 * (svgWidth / 68)))
                .attr("y", (102 * (svgHeight - 20) / 105))
                .attr("class", "text-d3")
                .attr("text-anchor", "middle")
                .style("font-size", "20px")
                .style("filter", "url(#glow)")
                .style("fill", "white")
                .text(String(game_time));
        }
        else {
            pitch
                .append("text")
                .attr("x", (34 * (svgWidth / 68)))
                .attr("y", (70 * (svgHeight - 20) / 105))
                .attr("class", "text-d3")
                .attr("text-anchor", "middle")
                .style("font-size", "50px")
                .style("filter", "url(#glow)")
                .style("fill", "white")
                .text("Not played yet");
        }




    }, [props.data, props.win_width, props.win_height]);

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}