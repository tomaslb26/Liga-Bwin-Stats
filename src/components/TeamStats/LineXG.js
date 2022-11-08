import React from "react";
import * as d3 from "d3";
import "./../../styles/linechart.css"
import { create_glow } from './../CreateGlow';

export default function LineXG(props) {
    if (props.win_width > 1400) var width = props.win_width / 3
    else if (props.win_width > 1150) var width = props.win_width / 3
    else var width = props.win_width - 120
    var height = 230
    const margin = { 'top': 40, 'right': 30, 'bottom': 40, 'left': 50 }


    const svgRef = React.useRef(null);
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    React.useEffect(() => {
        //console.log(props.data)

        d3.select(".tooltip").remove()
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("border", "2px solid " + props.color)
            .style("opacity", 0).style("visibility", "hidden").style("left", 0).style("top", 0);

        d3.select("body").on("click", function () {
            div.style("opacity", 0).attr("visibility", "hidden")
            d3.selectAll(".tooltip_2").style("opacity", 0).attr("visibility", "hidden")
            d3.selectAll("#tooltip_actions").style("opacity", 0).style("visibility", "hidden")
            d3.selectAll("#tooltip_shots").style("opacity", 0).style("visibility", "hidden")
        });

        var team_data = props.data.filter(function (d) {
            if (d.name === props.team) {
                return d
            }
        })

        var opp_data = props.data.filter(function (d) {
            if (d.name !== props.team) {
                return d
            }
        })

        team_data = d3.rollup(team_data, v => d3.sum(v, d => d.expectedGoals), d => d.round);
        opp_data = d3.rollup(opp_data, v => d3.sum(v, d => d.expectedGoals), d => d.round);

        var final_team_data = []
        var final_opp_data = []
        team_data.forEach((value, key) => {
            final_team_data.push({ 'round': key, 'value': value })
        })
        opp_data.forEach((value, key) => {
            final_opp_data.push({ 'round': key, 'value': value })
        })
        final_team_data.sort(function (a, b) {
            return a.round - b.round
        });
        final_opp_data.sort(function (a, b) {
            return a.round - b.round
        });

        var yScale = d3.scaleLinear()
            .range([height, 0])

        var xScale = d3.scaleLinear()
            .range([0, width])

        var line = d3.line()
            .x(function (d) { return xScale(d.round) })
            .y(function (d) { return yScale(d.value) })

        function setupScales() {
            xScale.domain([1, 34])
            yScale.domain([0, Math.max(d3.max(final_team_data, function (d) { return d.value }), d3.max(final_opp_data, function (d) { return d.value }))])
        }

        setupScales()

        d3.select(svgRef.current).selectAll("*").remove();

        var svg = d3.select(svgRef.current).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + (margin.left) + "," + margin.top + ")");

        create_glow(svg)

        svg.append("path")
            .attr('class', 'line')
            .attr("d", function (d) { return line(final_team_data) })
            .style("stroke", props.color)
            .style("stroke-width", 3)
            .style("fill", "none")
            .style("filter", "url(#glow)")

        svg.append("path")
            .attr('class', 'line')
            .attr("d", function (d) { return line(final_opp_data) })
            .style("stroke", "#48EDDB")
            .style("stroke-width", 3)
            .style("fill", "none")
            .style("filter", "url(#glow)")

        function getAwayTeamName(d) {
            var ret_value = ""
            props.data.filter(function (e) {
                if (e.round === d.round) {
                    if (e.homeTeam === props.team) {
                        ret_value = e.awayTeam
                    }
                    else ret_value = e.homeTeam
                }
            })
            return ret_value
        }

        function handleMouseClick(event, d) {
            var homeTeam = ""
            var awayTeam = ""
            var benficaxg
            var oppxg
            props.data.filter(function (e) {
                if (e.round === d.round) {
                    homeTeam = e.homeTeam
                    awayTeam = e.awayTeam
                }
            })
            final_team_data.filter(function (e) {
                if (e.round === d.round) {
                    benficaxg = e.value
                }
            })
            final_opp_data.filter(function (e) {
                if (e.round === d.round) {
                    oppxg = e.value
                }
            })

            var matrix = this.getScreenCTM()
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));

            var string2 = "<p style='display: inline-block; font-size:60%; font-weight:bold; padding-left:2%'>"
                + homeTeam + " xG: " + String(benficaxg).substring(0, 5) + "<br>"
                + awayTeam + " xG: " + String(oppxg).substring(0, 5) + "<p>";

            div.transition()
                .duration(200)
                .style("opacity", 1).style("visibility", "visible");
            div.html(string2).style("left", event.x + "px")
                .style("top", event.y + "px");
        }

        function handleMouseOver(event, d) {
            d3.select(this).style("cursor", "pointer")
            //mouseaux(svg,"image#logos",d,"over","round")

            svg.selectAll("image#logos").style("opacity", e => { if (e.round !== d.round) return 0.2 })
        }

        function handleMouseLeave(event, d) {
            svg.selectAll("image#logos").style("opacity", e => { if (e.round !== d.round) return 1 })
        }

        svg.selectAll('image')
            .data(final_team_data)
            .enter()
            .append("image")
            .attr("id", "logos")
            .attr('x', d => xScale(d.round) - 7)
            .attr('y', d => yScale(d.value) - 7)
            .attr('height', 16)
            .attr("xlink:href", require("./../../data/" + props.season + "/" + props.team.replaceAll(" ", "-") + ".png"))
            .on("mouseover", handleMouseOver)
            .on("mouseleave", handleMouseLeave)
            .on("click", handleMouseClick)
            .transition()
            .ease(d3.easeLinear)
            .duration(800)
            .attr("opacity", 1)

        svg.selectAll('image_2')
            .data(final_opp_data)
            .enter()
            .append("image")
            .attr("id", "logos")
            .attr('x', d => xScale(d.round) - 7)
            .attr('y', d => yScale(d.value) - 7)
            .attr('height', 16)
            .attr("xlink:href", d => {
                return require("./../../data/" + props.season + "/" + getAwayTeamName(d).replaceAll(" ", "-") + ".png")
            })
            .on("mouseover", handleMouseOver)
            .on("mouseleave", handleMouseLeave)
            .on("click", handleMouseClick)
            .transition()
            .ease(d3.easeLinear)
            .duration(800)
            .attr("opacity", 1)

        const xAxis = (g) =>
            g.attr("transform", `translate(0,${height - margin.bottom + 40})`)
                .call(d3
                    .axisBottom(xScale)
                    .tickFormat((x) => x)
                    .ticks(34))
                .append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", 40)
                .attr("y", 32)
                .text("Round")
                .attr("class", "text-d3")
                .style("fill", "white")
                .style("font-size", "15px")
                .style("filter", "url(#glow)")
                .style("font-weight", "bold")

        const yAxis = (g) =>
            g.attr("transform", `translate(${margin.left - 45},0)`)
                .call(d3.axisLeft(yScale).tickFormat((y) => y).tickSizeOuter(0))
                .append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("x", -95)
                .attr("y", -45)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("Expected Goals")
                .attr("class", "text-d3")
                .style("fill", "white")
                .style("filter", "url(#glow)")
                .style("font-size", "15px")
                .style("font-weight", "bold")

        svg.append("g").attr("class", "XAxis").call(xAxis);
        svg.append("g").attr("class", "YAxis").call(yAxis);

        svg.selectAll(".XAxis").style("filter", "url(#glow)")
        svg.selectAll(".YAxis").style("filter", "url(#glow)")

        svg
            .append("text")
            .attr("x", 0)
            .attr("y", -2)
            .attr("dy", "-.55em")
            .attr("text-anchor", "middle")
            .attr("class", "text-d3")
            .style("font-size", "20px")
            .style("filter", "url(#glow)")
            .style("fill", "white")
            .style("font-weight", "bold")
            .text("xG");

        svg
            .append("text")
            .attr("x", 35)
            .attr("y", -2)
            .attr("dy", "-.55em")
            .attr("text-anchor", "middle")
            .attr("class", "text-d3")
            .style("font-size", "20px")
            .style("filter", "url(#glow)")
            .style("fill", props.color)
            .style("font-weight", "bold")
            .text("For");

        svg
            .append("text")
            .attr("x", 93)
            .attr("y", -2)
            .attr("dy", "-.55em")
            .attr("text-anchor", "middle")
            .attr("class", "text-d3")
            .style("font-size", "20px")
            .style("filter", "url(#glow)")
            .style("fill", "#48EDDB")
            .style("font-weight", "bold")
            .text("Against");



    }, [props.data, props.win_width, props.win_height]);


    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

