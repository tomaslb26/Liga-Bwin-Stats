import React from "react";
import * as d3 from "d3";
import CreatePitchHorizontal from "../CreatePitchHorizontal";
import { create_glow } from './../CreateGlow';
import { CreatePitch } from "../CreatePitch";
import { createTriangle } from './../CreateTriangle';
import { plot_lines } from "./PlotLines"
import { plot_circles } from "./PlotCircles"
import { plot_def_actions } from "./PlotDefActions"
import { plot_shot_circles } from "./PlotShots"
import GetData from "../GetData";
import PlotAllTouches from "./PlotAllTouches";
import PlotHeatmap from "./PlotHeatmap.js";

export default function PlotActions(props) {
    var svgRef = React.useRef(null);
    if (props.win_width > 992) {
        var svgWidth = props.win_width / 2;
        var svgHeight = props.win_height / 2 + 50;
        var mode = false
        var pitchMultiplier = props.win_width * 8.3 / 1920
    }
    else if (props.win_width > 768) {
        var svgWidth = props.win_width / 2
        var svgHeight = 750;
        var mode = true
        var pitchMultiplier = 5.5
    }
    else {
        var svgWidth = props.win_width - 120
        var svgHeight = 600;
        var margin = { top: 10, right: 9, bottom: 0, left: 0 }
        var mode = true
        var pitchMultiplier = 5.5
    }

    React.useEffect(() => {
        d3.select(svgRef.current).selectAll("*").remove();
        var svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", "100%")
            .attr("height", svgHeight)


        if (props.win_width > 990) var pitch = CreatePitchHorizontal(svg, svgWidth - 80, svgHeight - 20)
        else var pitch = CreatePitch(svg, svgWidth, svgHeight - 20)

        create_glow(pitch)
        createTriangle(pitch, "triangle3", 0.8)
        createTriangle(pitch, "triangle2", 0.3)

        if (props.heatmap) {
            var touches = GetData(props.data, ["Carry", "Pass", "Aerial", "BallTouch", "BallRecovery", "Interception", "Tackle", "BlockedPass", "Clearance", "MissedShots", "ShotOnPost", "Goal", "SavedShot", "TakeOn"], null, null, props.playerId)
            PlotHeatmap(touches, pitch, mode, pitchMultiplier, props.color, svgWidth - 80, svgHeight - 20)
        }
        if (props.allTouches) {
            var touches = GetData(props.data, ["Carry", "Pass", "Aerial", "BallTouch", "BallRecovery", "Interception", "Tackle", "BlockedPass", "Clearance", "MissedShots", "ShotOnPost", "Goal", "SavedShot", "TakeOn"], null, null, props.playerId)
            PlotAllTouches(touches, pitch, mode, pitchMultiplier, props.color, svgWidth - 80, svgHeight - 20)
        }
        if (props.allPasses) {
            if (props.progPasses) var passes = GetData(props.data, "Pass", "Successful", "False", props.playerId)
            else var passes = GetData(props.data, "Pass", "Successful", null, props.playerId)

            pitch.selectAll('.progressiveLines')
                .data(passes)
                .enter().append("line")
                .attr("id", "progressive")
                .attr("x1", function (d) {
                    if (mode) return (68 - Number(d.y)) * (svgWidth / 68)
                    else return (Number(d.x)) * (svgWidth - 80) / 105
                })
                .attr("y1", function (d) {
                    if (mode) return (105 - Number(d.x)) * (svgHeight - 20) / 105
                    else return (68 - Number(d.y)) * (svgHeight - 20) / 68
                })
                .attr("x2", function (d) {
                    if (mode) return (68 - Number(d.endY)) * (svgWidth / 68)
                    else return (Number(d.endX)) * (svgWidth - 80) / 105
                })
                .attr("y2", function (d) {
                    if (mode) return (105 - Number(d.endX)) * (svgHeight - 20) / 105
                    else return (68 - Number(d.endY)) * (svgHeight - 20) / 68
                })
                .style("filter", "url(#glow)")
                .attr("stroke", "white")
                .style("stroke-opacity", 0.8)
                .attr("stroke-width", 1.8)
                .attr("marker-end", "url(#triangle3)");
        }
        if (props.progPasses) {
            var passes = GetData(props.data, "Pass", "Successful", "True", props.playerId)
            plot_lines(pitch, passes, svgWidth - 80, svgHeight - 20, mode)
            plot_circles(pitch, passes, props.color, svgWidth - 80, svgHeight - 20, mode)
        }
        if (props.unsuccessfulPasses) {
            passes = GetData(props.data, "Pass", "Unsuccessful", null, props.playerId)
            pitch.selectAll('.progressiveLines')
                .data(passes)
                .enter().append("line")
                .attr("id", "progressive")
                .attr("x1", function (d) {
                    if (mode) return (68 - Number(d.y)) * (svgWidth / 68)
                    else return (Number(d.x)) * (svgWidth - 80) / 105
                })
                .attr("y1", function (d) {
                    if (mode) return (105 - Number(d.x)) * (svgHeight - 20) / 105
                    else return (68 - Number(d.y)) * (svgHeight - 20) / 68
                })
                .attr("x2", function (d) {
                    if (mode) return (68 - Number(d.endY)) * (svgWidth / 68)
                    else return (Number(d.endX)) * (svgWidth - 80) / 105
                })
                .attr("y2", function (d) {
                    if (mode) return (105 - Number(d.endX)) * (svgHeight - 20) / 105
                    else return (68 - Number(d.endY)) * (svgHeight - 20) / 68
                })
                .style("filter", "url(#glow)")
                .attr("stroke", "white")
                .style("stroke-opacity", 0.1)
                .attr("stroke-width", 1.8)
                .attr("marker-end", "url(#triangle2)");
        }
        if (props.allCarries) {
            if (props.progCarries) var carries = GetData(props.data, "Carry", null, "False", props.playerId)
            else var carries = GetData(props.data, "Carry", null, null, props.playerId)

            pitch.selectAll('.progressiveLines')
                .data(carries)
                .enter().append("line")
                .attr("id", "progressive")
                .attr("x1", function (d) {
                    if (mode) return (68 - Number(d.y)) * (svgWidth / 68)
                    else return (Number(d.x)) * (svgWidth - 80) / 105
                })
                .attr("y1", function (d) {
                    if (mode) return (105 - Number(d.x)) * (svgHeight - 20) / 105
                    else return (68 - Number(d.y)) * (svgHeight - 20) / 68
                })
                .attr("x2", function (d) {
                    if (mode) return (68 - Number(d.endY)) * (svgWidth / 68)
                    else return (Number(d.endX)) * (svgWidth - 80) / 105
                })
                .attr("y2", function (d) {
                    if (mode) return (105 - Number(d.endX)) * (svgHeight - 20) / 105
                    else return (68 - Number(d.endY)) * (svgHeight - 20) / 68
                })
                .style("filter", "url(#glow)")
                .attr("stroke", "white")
                .style("stroke-opacity", 0.8)
                .attr("stroke-width", 1.8)
                .attr("marker-end", "url(#triangle3)");

        }
        if (props.progCarries) {
            var carries = GetData(props.data, "Carry", null, "True", props.playerId)
            plot_lines(pitch, carries, svgWidth - 80, svgHeight - 20, mode)
            plot_circles(pitch, carries, "#48EDDB", svgWidth - 80, svgHeight - 20, mode)
        }
        if (props.ballRecoveries) {
            var touches = GetData(props.data, "BallRecovery", null, null, props.playerId)
            plot_def_actions(pitch, touches, "#42DC60", svgWidth - 80, svgHeight - 20, mode)
        }
        if (props.blockedPasses) {
            var touches = GetData(props.data, "BlockedPass", null, null, props.playerId)
            plot_def_actions(pitch, touches, "#42DCD5", svgWidth - 80, svgHeight - 20, mode)
        }
        if (props.interceptions) {
            var touches = GetData(props.data, "Interception", null, null, props.playerId)
            plot_def_actions(pitch, touches, "red", svgWidth - 80, svgHeight - 20, mode)
        }
        if (props.clearances) {
            var touches = GetData(props.data, "Clearance", null, null, props.playerId)
            plot_def_actions(pitch, touches, "#D047D6", svgWidth - 80, svgHeight - 20, mode)
        }

        if (props.tackles) {
            var touches = GetData(props.data, "Tackle", null, null, props.playerId)
            plot_def_actions(pitch, touches, "#E38A18", svgWidth - 80, svgHeight - 20, mode)
        }

        if (props.goals) {
            var goals = props.data.filter(item => item["eventType"] === "Goal" && Number(item["playerId"]) === props.fotmobPlayerId)
            console.log(goals)
            plot_shot_circles(pitch, goals, "#55DD31", svgWidth - 80, svgHeight - 20, mode, props.color)
        }

        if (props.attemptSaved) {
            var attempts = props.data.filter(item => item["eventType"] === "AttemptSaved" && Number(item["playerId"]) === props.fotmobPlayerId)
            plot_shot_circles(pitch, attempts, "#DD9131", svgWidth - 80, svgHeight - 20, mode, props.color)
        }

        if (props.misses) {
            var miss = props.data.filter(item => item["eventType"] === "Miss" && Number(item["playerId"]) === props.fotmobPlayerId)
            plot_shot_circles(pitch, miss, "#DD3131", svgWidth - 80, svgHeight - 20, mode, props.color)
        }

        if (props.post) {
            var post = props.data.filter(item => item["eventType"] === "Post" && Number(item["playerId"]) === props.fotmobPlayerId)
            plot_shot_circles(pitch, post, "#31B1DD", svgWidth - 80, svgHeight - 20, mode, props.color)
        }

    }, [props.data, props.win_width, props.win_height, props.playerId, props.allTouches, props.allPasses, props.progPasses, props.unsuccessfulPasses, props.allCarries, props.progCarries,
    props.ballRecoveries, props.blockedPasses, props.interceptions, props.clearances, props.tackles, props.goals, props.attemptSaved, props.misses, props.post, props.color, props.heatmap]);


    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}