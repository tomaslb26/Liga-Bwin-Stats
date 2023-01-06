import React from "react";
import * as d3 from "d3";
import { create_glow } from './../CreateGlow';
import "./../../styles/match_momentum.css"
import teams_colors from "./../../data/teams_colors"
import { createRoutesFromChildren } from "react-router";

export default function MatchMomentumChart(props) {
    var svgRef = React.useRef(null);
    if (props.win_width > 990) {
        var svgWidth = props.win_width - 100;
        var margin = { top: 55, right: 34, bottom: 30, left: 35 }
    }
    else {
        var svgWidth = props.win_width - 100
        var margin = { top: 55, right: 45, bottom: 30, left: 35 }
    }
    var svgHeight = props.win_height / 2;




    React.useEffect(() => {
        d3.select(svgRef.current).selectAll("*").remove();

        var svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", svgWidth + margin.left + margin.right)
            .attr("height", svgHeight + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + (margin.left) + "," + (margin.top - 20) + ")");


        var goals = props.dataHome.filter((item) => item.type === "Goal" && Number(item.teamId == props.teamId))
        var away_goals = props.dataAway.filter((item) => item.type === "Goal" && Number(item.teamId == props.oppTeamId))
        goals = goals.concat(away_goals)

        var data_home = props.dataHome.filter(d => { if ((Number(d.teamId) === props.teamId && d.type === "Pass" && d.outcomeType === "Successful") || d.type === "Carry") return d })
        data_home = d3.rollup(data_home, v => d3.sum(v, d => d.xT), d => d.minute);

        var data_away = props.dataAway.filter(d => { if ((Number(d.teamId) === props.oppTeamId && d.type === "Pass" && d.outcomeType === "Successful") || d.type === "Carry") return d })
        data_away = d3.rollup(data_away, v => d3.sum(v, d => d.xT), d => d.minute);


        var xt_home = []
        data_home.forEach((value, key) => {
            xt_home.push({ 'minute': Number(key), 'xT': value })
        })
        var xt_away = []
        data_away.forEach((value, key) => {
            xt_away.push({ 'minute': Number(key), 'xT': value })
        })

        try {
            var lastMin = Math.max(xt_home[(xt_home.length) - 1]['minute'], xt_away[(xt_away.length) - 1]['minute'])
        }
        catch (e) {
            console.log(e)
        }


        var xt_final = []
        for (var minute = 0; minute <= lastMin; minute++) {
            var home_xT = xt_home.find(e => e['minute'] == minute);
            if (home_xT == null) home_xT = 0;
            else home_xT = home_xT['xT']

            var away_xT = xt_away.find(e => e['minute'] == minute);
            if (away_xT == null) away_xT = 0;
            else away_xT = away_xT['xT']

            xt_final.push({ 'minute': minute, 'home_xT': Number(home_xT), 'away_xT': Number(away_xT) })
        }

        var y = d3.scaleLinear()
            .domain([-0.5, 0.5])
            .range([svgHeight, 0]);

        var x = d3.scaleBand()
            .domain(xt_final.map(d => d.minute))
            .range([0, svgWidth])
            .padding([0])

        var formatTick = function (d) {
            if (d == 45) return "HT"
            else if (d % 15 == 0) return String(d) + "'"
        }

        var formatYTick = function (d) {
            if (d < 0) return (-d)
            else return d
        }

        var xAxis = (g) => g
            .call(d3
                .axisBottom(x).tickFormat(formatTick).tickSizeOuter(0))

        var yAxis = (g) => g
            .call(d3.axisLeft(y).tickFormat(formatYTick).tickSizeOuter(0))

        var yAxis2 = (g) => g
            .call(d3.axisRight(y).tickFormat(formatYTick).tickSizeOuter(0))

        create_glow(svg)

        svg.append("g").attr("class", "XAxisFlowChart").attr('transform', 'translate(0,' + (y(0)) + ')')
            .call(xAxis);
        svg.append("g").attr("class", "YAxisFlowChart").attr('transform', 'translate(' + (x(0) - 5) + ',0)').call(yAxis);
        svg.append("g").attr("class", "YAxisFlowChart2").attr('transform', 'translate(' + (x(lastMin) + 20) + ',0)').call(yAxis2);

        d3.selectAll(".YAxisFlowChart").style("filter", "url(#glow)")
        d3.selectAll(".YAxisFlowChart2").style("filter", "url(#glow)")
        d3.selectAll(".XAxisFlowChart").style("filter", "url(#glow)")




        svg.append("g")
            .selectAll('lines')
            .data(goals)
            .enter().append('line')
            .attr('y1', d => y(0))
            .attr('y2', function (d) {
                var change = 1
                if (d.isOwnGoal == "True") change = -1

                if (Number(d.teamId) == props.teamId) return y(0.5 * change)
                else if (Number(d.teamId) == props.oppTeamId) return y(-0.5 * change)

            })
            .attr('x1', d => x(Number(d['minute'])) + 8)
            .attr('x2', d => x(Number(d['minute'])) + 8)
            .style('stroke-width', 1)
            .style('stroke-opacity', 0.5)
            .style('stroke', "white")
            .style("stroke-dasharray", ("10,3"))
            .transition()
            .ease(d3.easeBack)
            .duration(800)
            .attr("opacity", 1)

        try {
            d3.csv(require("./../../data/" + props.season + "/calcs.csv"))
                .then((data) => {

                    function getPhotoLink(team, shirtNo) {
                        var player = data.filter((item) => {
                            if (item.team === team.replaceAll(" ", "-") && Number(item.shirtNo) === Number(shirtNo)) return item
                        })[0]
                        return player.photo
                    }

                    svg.selectAll("XAxisScatter .tick")
                        .data(goals).enter()
                        .append("image")
                        .attr("x", d => x(Number(d['minute'])) - 10)
                        .attr('y', function (d) {
                            var change = 1
                            if (d.isOwnGoal == "True") change = -1

                            if (Number(d.teamId) == props.teamId) return y(0.5 * change + 0.03)
                            else if (Number(d.teamId) == props.oppTeamId) return y(-0.5 * change + 0.03)

                        })
                        .attr('height', 50)
                        .attr("xlink:href", function (d) {
                            if (Number(d.teamId) == props.teamId) return getPhotoLink(props.team, d.shirtNo)
                            else if (Number(d.teamId) == props.oppTeamId) return getPhotoLink(props.oppTeam, d.shirtNo)
                        })
                        .transition()
                        .ease(d3.easeBack)
                        .duration(800)
                        .attr("opacity", 1)
                })

        }
        catch (e) {
            console.log(e)
        }


        svg.selectAll("XAxisScatter .tick")
            .data(goals).enter()
            .append("image")
            .attr("x", d => x(Number(d['minute'])) - 2)
            .attr('y', function (d) {
                var change = 1
                if (d.isOwnGoal == "True") change = -1

                if (Number(d.teamId) == props.teamId) return y(0.3 * change + 0.03)
                else if (Number(d.teamId) == props.oppTeamId) return y(-0.3 * change + 0.03)
            })
            .attr('height', 20)
            .attr("xlink:href", require("./../../data/football_ball.png"))
            .transition()
            .ease(d3.easeBack)
            .duration(800)
            .attr("opacity", 1)

        try {
            svg.append("g")
                .selectAll("rect")
                .data(xt_final)
                .join("rect")
                .attr("y", function (d) {
                    if (d.home_xT > d.away_xT) return y(d.home_xT)
                    else return y(0)
                })
                .attr("x", function (d) {
                    return x(d.minute);
                })
                .transition()
                .ease(d3.easeBack)
                .duration(800)
                .attr("height", function (d) {
                    if (d.home_xT > d.away_xT) var ret = Math.abs(y(d.home_xT) - y(0));
                    else var ret = Math.abs(y(d.away_xT) - y(0));
                    return ret
                })
                .attr("width", x.bandwidth())
                .style("fill", function (d) {
                    if (d.home_xT > d.away_xT) return teams_colors.filter((item) => (item.team === props.team))[0]["color"];
                    else return teams_colors.filter((item) => (item.team === props.oppTeam))[0]["color"];
                })
                .style("stroke-width", 0.0)
                .style("filter", "url(#glow)");
        }
        catch (e) {
            console.log(e)
        }


    }, [props.dataHome, props.win_width, props.win_height, props.dataAway, props.team, props.oppTeam, props.teamId, props.oppTeamId]);


    return <svg ref={svgRef} width={svgWidth + margin.right + margin.left} height={svgHeight + margin.bottom + margin.top} />;
}