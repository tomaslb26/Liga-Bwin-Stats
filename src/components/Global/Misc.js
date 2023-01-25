import React from "react";
import * as d3 from "d3";
import { create_glow } from './../CreateGlow';
import "./../../styles/global.css"
import teams_colors from "./../../data/teams_colors"

export default function Misc(props) {

    var svgRef = React.useRef(null);
    if (props.win_width > 990) {
        var svgWidth = props.win_width *0.75;
        var font_size = 130 * props.win_width / 1920
        font_size = String(font_size) + "%"
    }
    else {
        var svgWidth = props.win_width - 35
        var font_size = 130 * props.win_width / 968
        font_size = String(font_size) + "%"
    }


    if (props.win_width > 1400) {
        var logosize = 30
        var windowTax = 17
    }
    else if (props.win_width > 1200) {
        var logosize = 25
        var windowTax = 12
    }
    else if (props.win_width > 1000) {
        var logosize = 20
        var windowTax = -2
    }
    else if (props.win_width > 800) {
        var logosize = 20
        var windowTax = 10
    }
    else {
        var logosize = 20
        var windowTax = 0
    }

    var svgHeight = 700;

    React.useEffect(() => {
        d3.select(svgRef.current).selectAll("*").remove();

        var svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)

        var data = props.data.map(o => new Object({ name: o.Team, stat: (o[props.stat]) }))

        data = data.sort(function (a, b) {
            var keyA = Number(a["stat"]),
                keyB = Number(b["stat"]);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        })

        create_glow(svg)

        var x = d3.scaleBand()
            .range([40, svgWidth - 15])
            .domain(data.map(function (d) { return d.name; }))
            .padding(0.1);

        var y = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => Number(d["stat"]))])
            .range([svgHeight, 15]);

        var xAxis = (g) => g
            .attr("transform", `translate(0,${svgWidth})`)
            .call(d3
                .axisBottom(x)
                .tickSizeOuter(0))


        var yAxis = (g) => g
            .attr("transform", `translate(${40},${-5})`)
            .call(d3.axisLeft(y).tickSizeOuter(0))

        svg.append("g").attr("class", "YAxisBarMisc").call(yAxis);

        svg.selectAll(".YAxisBarMisc").style("filter", "url(#glow)")

        svg.append("g")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.stat) - 0)
            .attr("rx", 2)
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return svgHeight + 0 - y(d.stat); })
            .style("filter", "url(#glow)")
            .style("opacity", 0.7)
            .style("stroke", function (d) {
                return "white"
            })
            .style("fill", d => teams_colors.filter((item) => (item.team === d.name))[0]["color"])

        try {
            svg.selectAll('image')
                .data(data)
                .enter()
                .append("image")
                .attr("id", "logos_1")
                .attr("y", svgHeight - 40)
                .attr("x", d => {
                    return (x(d.name) + windowTax)
                })
                .attr('height', logosize)
                .attr('width', logosize)
                .attr("xlink:href", d => require("./../../data/" + props.season + "/" + d.name.replaceAll(" ", "-") + ".png"))
                .attr("opacity", 1)
        }
        catch (e) {
            console.log(e)
        }

    }, [props.data, props.win_width, props.win_height, props.season, props.stat]);


    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}