import React from "react";
import * as d3 from "d3";
import { create_glow } from './../CreateGlow';
import { createTriangle } from './../CreateTriangle';
import { plot_goal } from "./PlotGoal"
import { mouseaux } from "./../MouseAux"
import "./../../styles/teamstats.css"
import { CreatePitch } from "../CreatePitch";


export default function PlotActions(props) {
    var dataset = props.data;

    let tooltip = d3.select("body").append("div").attr("id", "tooltip_actions")
        .attr("class", "tooltip_2")
        .style("border", "2px solid " + props.color)
        .style("opacity", 0).style("visibility", "hidden")

    let tooltip_shots = d3.select("body").append("div").attr("id", "tooltip_shots")
        .attr("class", "tooltip_3")
        .style("border", "2px solid " + props.color)
        .style("opacity", 0).style("visibility", "hidden")

    d3.select("body").on("click", function () {
        d3.selectAll(".tooltip").style("opacity", 0).style("visibility", "hidden")
        d3.selectAll("#tooltip_pass").style("opacity", 0).style("visibility", "hidden")
        d3.selectAll("#tooltip_actions").style("opacity", 0).style("visibility", "hidden")
        d3.selectAll("#tooltip_shots").style("opacity", 0).style("visibility", "hidden")
    });

    var lineWidth = 1.8
    var margin = { top: 0, right: 60, bottom: 0, left: 30 }

    if (props.win_width > 1400) {
        var svgWidth = props.win_width / 3 - 200;
        var svgHeight = props.win_height - 350;
    }
    else if (props.win_width > 992) {
        var svgWidth = props.win_width / 3 - 120;
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


    function plotLines(svg, data) {
        svg.selectAll('.progressiveLines')
            .data(data)
            .enter().append("line")
            .attr("id", "progressive")
            .attr("x1", d => (68 - Number(d.y)) * (svgWidth / 68))
            .attr("y1", d => (105 - Number(d.x)) * (svgHeight - 20) / 105)
            .attr("x2", d => (68 - Number(d.endY)) * (svgWidth / 68))
            .attr("y2", d => (105 - Number(d.endX)) * (svgHeight - 20) / 105)
            .style("filter", "url(#glow)")
            .attr("stroke", "white")
            .attr("stroke-width", lineWidth)
    }

    function plotCircles(svg, data, color) {
        function handleMouseOver(event, d) {
            d3.select(this).style("cursor", "pointer")
            mouseaux(svg, "circle#progressive", d, "over")
            mouseaux(svg, "line#progressive", d, "over")
            mouseaux(d3.select("div#chart"), "circle#nodes", d, "over", "name")
        }

        function handleMouseLeave(event, d) {
            d3.select(this).style("cursor", "pointer")
            mouseaux(svg, "circle#progressive", d, "leave")
            mouseaux(svg, "line#progressive", d, "leave")
            mouseaux(d3.select("div#chart"), "circle#nodes", d, "leave", "name")
        }

        function handleMouseClick(event, d) {
            var string2 = "<p style='display: inline-block; font-size:60%; font-weight:bold; padding-left:2%;'>" + d.name + " (" + Number(d.shirtNo) + ")" + "<br>" + "Minute: "
                + String(Number(d.minute)) + "<br>" + d.homeTeam + " - " + d.awayTeam + "<br>" + "Progressive " + d.type + "<p/>";

            tooltip.transition()
                .duration(200)
                .style("opacity", 1).style("visibility", "visible");
            tooltip.html(string2).style("left", event.x + "px")
                .style("top", event.y + "px");
        }

        svg.selectAll('.progressiveCircles')
            .data(data)
            .enter().append('circle')
            .attr("id", "progressive")
            .attr('cy', d => (105 - d.endX) * (svgHeight - 20) / 105)
            .attr('cx', d => (68 - d.endY) * (svgWidth / 68))
            .attr('r', 7)
            .style('stroke-width', lineWidth)
            .style("filter", "url(#glow)")
            .on("mouseover", handleMouseOver)
            .on("click", handleMouseClick)
            .on("mouseleave", handleMouseLeave)
            .style('stroke', color)
            .style('fill', "#2a2e30")
            .style("fill-opacity", 1)
    }

    React.useEffect(() => {

        d3.select(svgRef.current).selectAll("*").remove();
        const svg = d3.select(svgRef.current).append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)

        var pitch = CreatePitch(svg, svgWidth, svgHeight - 20)

        create_glow(pitch)
        createTriangle(pitch, "triangle2", 0.1)
        createTriangle(pitch, "triangle3", 0.8)

        if (props.data == null) {
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
        else {
            if (props.option === "actions") {
                if (props.options.unsuccessful_passes) {
                    var unsuccesful = dataset.filter(function (d) {
                        if (d.type === "Pass" && d.outcomeType === "Unsuccessful" && Number(d.teamId) === props.teamId) {
                            return d;
                        }
                    });

                    pitch.selectAll('.progressiveLines')
                        .data(unsuccesful)
                        .enter().append("line")
                        .attr("id", "progressive")
                        .attr("x1", d => (68 - Number(d.y)) * (svgWidth / 68))
                        .attr("y1", d => (105 - Number(d.x)) * (svgHeight - 20) / 105)
                        .attr("x2", d => (68 - Number(d.endY)) * (svgWidth / 68))
                        .attr("y2", d => (105 - Number(d.endX)) * (svgHeight - 20) / 105)
                        .style("filter", "url(#glow)")
                        .attr("stroke", "white")
                        .style("stroke-opacity", 0.1)
                        .attr("stroke-width", lineWidth)
                        .attr("marker-end", "url(#triangle2)");
                }
                if (props.options.all_passes && !props.options.progressive_passes) {
                    var passes = props.data.filter(function (d) {
                        if (d.type === "Pass" && d.outcomeType === "Successful" && Number(d.teamId) === props.teamId) {
                            return d;
                        }
                    });

                    pitch.selectAll('.progressiveLines')
                        .data(passes)
                        .enter().append("line")
                        .attr("id", "progressive")
                        .attr("x1", d => (68 - Number(d.y)) * (svgWidth / 68))
                        .attr("y1", d => (105 - Number(d.x)) * (svgHeight - 20) / 105)
                        .attr("x2", d => (68 - Number(d.endY)) * (svgWidth / 68))
                        .attr("y2", d => (105 - Number(d.endX)) * (svgHeight - 20) / 105)
                        .style("filter", "url(#glow)")
                        .attr("stroke", "white")
                        .style("stroke-opacity", 0.8)
                        .attr("stroke-width", lineWidth)
                        .attr("marker-end", "url(#triangle3)");
                }
                else if (props.options.all_passes) {
                    var passes = dataset.filter(function (d) {
                        if (d.type === "Pass" && d.outcomeType === "Successful" && d.progressive === "False" && Number(d.teamId) === props.teamId) {
                            return d;
                        }
                    });

                    pitch.selectAll('.progressiveLines')
                        .data(passes)
                        .enter().append("line")
                        .attr("id", "progressive")
                        .attr("x1", d => (68 - Number(d.y)) * (svgWidth / 68))
                        .attr("y1", d => (105 - Number(d.x)) * (svgHeight - 20) / 105)
                        .attr("x2", d => (68 - Number(d.endY)) * (svgWidth / 68))
                        .attr("y2", d => (105 - Number(d.endX)) * (svgHeight - 20) / 105)
                        .style("filter", "url(#glow)")
                        .attr("stroke", "white")
                        .style("stroke-opacity", 0.8)
                        .attr("stroke-width", lineWidth)
                        .attr("marker-end", "url(#triangle3)");
                }
                if (props.options.progressive_passes) {
                    var progressive = props.data.filter(function (d) {
                        if (d.type === "Pass" && d.outcomeType === "Successful" && d.progressive === "True" && Number(d.teamId) === props.teamId) {
                            return d;
                        }
                    });


                    plotLines(pitch, progressive)

                    plotCircles(pitch, progressive, props.color)

                }
                if (props.options.all_carries && !props.options.progressive_carries) {
                    var carries = dataset.filter(function (d) {
                        if (d.type == "Carry") {
                            return d;
                        }
                    });

                    pitch.selectAll('.progressiveLines')
                        .data(carries)
                        .enter().append("line")
                        .attr("id", "progressive")
                        .attr("x1", d => (68 - Number(d.y)) * (svgWidth / 68))
                        .attr("y1", d => (105 - Number(d.x)) * (svgHeight - 20) / 105)
                        .attr("x2", d => (68 - Number(d.endY)) * (svgWidth / 68))
                        .attr("y2", d => (105 - Number(d.endX)) * (svgHeight - 20) / 105)
                        .style("filter", "url(#glow)")
                        .attr("stroke", "white")
                        .style("stroke-opacity", 0.8)
                        .attr("stroke-width", lineWidth)
                        .attr("marker-end", "url(#triangle3)");
                }
                else if (props.options.all_carries) {
                    var carries = dataset.filter(function (d) {
                        if (d.type == "Carry" && d.progressive == "False") {
                            return d;
                        }
                    });

                    pitch.selectAll('.progressiveLines')
                        .data(carries)
                        .enter().append("line")
                        .attr("id", "progressive")
                        .attr("x1", d => (68 - Number(d.y)) * (svgWidth / 68))
                        .attr("y1", d => (105 - Number(d.x)) * (svgHeight - 20) / 105)
                        .attr("x2", d => (68 - Number(d.endY)) * (svgWidth / 68))
                        .attr("y2", d => (105 - Number(d.endX)) * (svgHeight - 20) / 105)
                        .style("filter", "url(#glow)")
                        .attr("stroke", "white")
                        .style("stroke-opacity", 0.8)
                        .attr("stroke-width", lineWidth)
                        .attr("marker-end", "url(#triangle3)");
                }
                if (props.options.progressive_carries) {
                    var progressiveC = dataset.filter(function (d) {
                        if (d.type === "Carry" && d.progressive === "True") {
                            return d;
                        }
                    });
                    plotLines(pitch, progressiveC)
                    plotCircles(pitch, progressiveC, "#48EDDB")
                }
            }
            else if (props.option == "shots") {
                d3.csv(require("./../../data/" + props.season + "/" + "allShotsLigaBwin" + props.season.replace("-", "") + ".csv")).then((data) => {
                    data = data.filter(function (d) {
                        if ((props.side == "Home" && d.homeTeam == props.team && d.awayTeam == props.oppTeam && d.name == props.team) ||
                            (props.side == "Away" && d.awayTeam == props.team && d.homeTeam == props.oppTeam && d.name == props.team)) return d
                    })

                    function handleMouseOver(event, d) {
                        d3.select(this).style("cursor", "pointer")
                        pitch.selectAll('line#remove')
                            .remove()

                        pitch.selectAll('.progressiveLines')
                            .data([d])
                            .enter().append("line")
                            .attr("id", "remove")
                            .attr("x1", d => (68 - Number(d.y)) * (svgWidth / 68))
                            .attr("y1", d => (105 - Number(d.x)) * (svgHeight - 20) / 105)
                            .attr("x2", d => {
                                if (d.blockedY == "") return (68 - Number(d.goalCrossedY)) * (svgWidth / 68)
                                else return (68 - Number(d.blockedY)) * (svgWidth / 68)
                            })
                            .attr("y2", d => {
                                if (d.blockedX == "") {
                                    return (105 - 105) * (svgHeight - 20) / 105
                                }
                                else return (105 - Number(d.blockedX)) * (svgHeight - 20) / 105
                            })
                            .style("filter", "url(#glow)")
                            .attr("stroke", "white")
                            .style("stroke-width", 2)
                            .style("stroke-opacity", 1)
                            .attr("stroke-width", lineWidth)
                            .attr("marker-end", "url(#triangle3)");
                    }

                    function handleMouseLeave(event, d) {
                        pitch.selectAll('line#remove')
                            .remove()
                    }

                    function handleClick(event, d) {
                        plot_goal(event, d, props.color, tooltip_shots);
                    }

                    var _data = []
                    _data.push({ 'x': 36, 'y': 38, 'expectedGoals': 0.5, 'eventType': "Post" })
                    _data.push({ 'x': 36, 'y': 43, 'expectedGoals': 0.25 })
                    _data.push({ 'x': 36, 'y': 46.5, 'expectedGoals': 0.1 })
                    _data.push({ 'x': 36, 'y': 32, 'expectedGoals': 0.75 })
                    _data.push({ 'x': 36, 'y': 24, 'expectedGoals': 1, 'eventType': "Goal" })

                    var circles = pitch.selectAll('.progressiveCircles')
                        .data(data)
                        .enter().append('circle')
                        .attr("id", "shots")
                        .attr('cy', d => (105 - d.x) * (svgHeight - 20) / 105)
                        .attr('cx', d => (68 - d.y) * (svgWidth / 68))
                        .attr('r', d => 20 * d.expectedGoals)
                        .style('stroke-width', 0.5)
                        .style('stroke', "white")
                        .style("filter", "url(#glow)")
                        .style('fill', function (d) {
                            if (d.eventType == "Goal") return "#42DC60"
                            else if (d.eventType == "AttemptSaved") return "red"
                            else if (d.eventType == "Post") return "#42DCD5"
                            else return "red"
                        })
                        .on("click", handleClick)
                        .on("mouseover", handleMouseOver)
                        .on("mouseleave", handleMouseLeave)
                        .style("fill-opacity", 1)

                    circles = pitch.selectAll('.progressiveCircles')
                        .data(_data)
                        .enter().append('circle')
                        .attr('cy', d => (105 - d.x) * (svgHeight - 20) / 105)
                        .attr('cx', d => (68 - d.y) * (svgWidth / 68))
                        .attr('r', d => 20 * d.expectedGoals)
                        .style('stroke-width', 0.5)
                        .style('stroke', "white")
                        .style("filter", "url(#glow)")
                        .style('fill', function (d) {
                            if (d.eventType == "Goal") return "#42DC60"
                            else if (d.eventType == "AttemptSaved") return "red"
                            else if (d.eventType == "Post") return "#42DCD5"
                            else return "red"
                        })
                        .style("fill-opacity", 1)

                    function appendText(x, y, text) {
                        pitch.append("text")
                            .attr("y", d => (((105 - x) * (svgHeight - 20) / 105) - 20))
                            .attr("x", d => ((68 - y) * (svgWidth / 68)) - 15)
                            .attr("dy", "-.55em")
                            .attr("class", "text-d3")
                            .style("font-size", 12)
                            .style("filter", "url(#glow)")
                            .style("fill", "white")
                            .style("font-weight", "bold")
                            .text(text);
                    }

                    pitch.selectAll('text').data(_data).enter().append("text")
                        .attr("y", d => (((105 - d.x) * (svgHeight - 20) / 105) + 40))
                        .attr("x", d => ((68 - d.y) * (svgWidth / 68)) - 5)
                        .attr("class", "text-d3")
                        .attr("dy", "-.55em")
                        .style("font-size", 12)
                        .style("filter", "url(#glow)")
                        .style("fill", "white")
                        .style("font-weight", "bold")
                        .text(d => String(d.expectedGoals));

                    appendText(36, 24, "Goal")
                    appendText(36, 32, "Miss")
                    appendText(36, 38, "Post")
                    appendText(21, 35, "xG Sizes")

                })
            }
            else if (props.option == "def_actions") {

                function handleMouseClick(event, d) {
                    var string2 = "<p style='display: inline-block; font-size:60%; font-weight:bold; padding-left:2%'>" + d.name + " (" + Number(d.shirtNo) + ")" + "<br>" + "Minute: "
                        + String(Number(d.minute)) + "<br>" + d.homeTeam + " - " + d.awayTeam + "<br>" + d.type + " " + d.outcomeType + "<p/>";

                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 1).style("visibility", "visible");
                    tooltip.html(string2).style("left", event.x + "px")
                        .style("top", event.y + "px");
                }

                function handleMouseOver(event, d) {
                    d3.select(this).style("cursor", "pointer")
                    mouseaux(pitch, "circle#def", d, "over")
                    mouseaux(d3.select("div#chart"), "circle#nodes", d, "over", "name")
                }

                function handleMouseLeave(event, d) {
                    d3.select(this).style("cursor", "pointer")
                    mouseaux(d3.select("div#chart"), "circle#nodes", d, "leave", "name")

                    pitch.selectAll("circle#def")
                        .style("fill-opacity", function (e) {
                            if (e.outcomeType == "Unsuccessful") return 0.1
                            else if (e["name"] != d["name"]) return 1
                        })
                }

                var def_actions_list = ["Interception", "BlockedPass", "BallRecovery", "Clearance", "Tackle"]
                var def_actions = dataset.filter(function (d) {
                    if (def_actions_list.includes(d.type, 0) && d.teamId == props.teamId) {
                        return d;
                    }
                });

                var circles = pitch.selectAll('.progressiveCircles')
                    .data(def_actions)
                    .enter().append('circle')
                    .attr("id", "def")
                    .attr('cy', d => (105 - d.x) * (svgHeight - 20) / 105)
                    .attr('cx', d => (68 - d.y) * (svgWidth / 68))
                    .attr('r', d => 7)
                    .style('stroke-width', 0)
                    .style('stroke', "white")
                    .style("filter", "url(#glow)")
                    .style('fill', function (d) {
                        if (d.type == "BallRecovery") return "#42DC60"
                        else if (d.type == "Interception") return "red"
                        else if (d.type == "BlockedPass") return "#42DCD5"
                        else if (d.type == "Clearance") return "#D047D6"
                        else if (d.type == "Tackle") return "#E38A18"
                        else return "red"
                    })
                    .on("mouseover", handleMouseOver)
                    .on("click", handleMouseClick)
                    .on("mouseleave", handleMouseLeave)
                    //.style("filter", "url(#glow)")
                    .style("fill-opacity", function (d) {
                        if (d.outcomeType == "Successful") return 1
                        else return 0.1
                    })


                d3.selectAll(".def_action").style("filter", "url(#glow)")


            }
        }


    }, [props.data, props.win_width, props.win_height, props.options, props.option]);

    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}