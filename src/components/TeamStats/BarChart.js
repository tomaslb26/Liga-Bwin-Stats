import React from "react";
import * as d3 from "d3";
import "./../../styles/barchart.css"
import { create_glow } from './../CreateGlow';

export default function BarChart(props) {
    var width;
    if (props.win_width > 1400) width = props.win_width / 3
    else if (props.win_width > 1150) width = props.win_width / 3
    else width = props.win_width - 100
    var height = 430;

    const svgRef = React.useRef(null);
    const svgWidth = width;
    const svgHeight = height + 10;

    React.useEffect(() => {
        var data_selected;
        if (props.stat === "Goals" || props.stat === "Assists") data_selected = props.data.map(o => ({ name: o.name, stat: (o[props.stat]), photo: o.photo }))
        else if (props.stat === "Pass Percentage") data_selected = props.data.map(o => ({ name: o.name, stat: (o["suc_passes"] / o["total_passes"]) * 100, photo: o.photo }))
        else if (props.stat === "Take-On Percentage") data_selected = props.data.map(o => ({ name: o.name, stat: (o["suc_take_ons"] / o["take_ons"]) * 100, photo: o.photo }))
        else data_selected = props.data.map(o => ({ name: o.name, stat: (o[props.stat] * 90) / o.minutes, photo: o.photo }))

        data_selected = data_selected.sort(function (a, b) {
            var keyA = Number(a["stat"]),
                keyB = Number(b["stat"]);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        })

        data_selected = data_selected.slice(0, 13)

        d3.select(svgRef.current).selectAll("*").remove();

        var y = d3.scaleBand()
            .domain(data_selected.map(d => d.name))
            .rangeRound([10, height]).padding(1.7)

        var x = d3.scaleLinear()
            .domain([0, d3.max(data_selected, (d) => Number(d["stat"]))])
            .rangeRound([0, width])

        var yAxis = (g) => g
            .attr("transform", `translate(${0},0)`)
            .call(d3.axisLeft(y))

        const svg = d3.select(svgRef.current)
            .append("svg")
            .attr("width", width )
            .attr("height", height + 10)

        create_glow(svg)

        svg.append("g").attr("class", "YAxisBar").call(yAxis);

        svg.append("g")
            .selectAll("rect")
            .data(data_selected)
            .join("rect")
            .attr("x", 52)
            .attr("y", d => y(d.name) - 25)
            .attr("rx", 5)
            .attr("height", 8)
            .style("filter", "url(#glow)")
            .style("stroke", function (d) {
                return "white"
            })
            .style("fill", d => props.color)
            .transition()
            .ease(d3.easeLinear)
            .duration(800)
            .attr("width", function (d) {
                return x(d["stat"]) * 0.7
            })


        svg.selectAll('image')
            .data(data_selected)
            .enter()
            .append("image")
            .attr("id", "logos_1")
            .attr("x", 15)
            .attr("y", d => y(d.name) - 45)
            .attr('height', 30)
            .attr("xlink:href", d => {
                try { return d.photo }
                catch (e) {
                    console.log(e)
                }
            }
            )

        function roundToTwo(num) { return +(Math.round(num + "e+2") + "e-2"); }

        svg.selectAll("YAxisBar .tick")
            .data(data_selected).enter()
            .append("text")
            .attr("class", "text-d3")
            .attr("x", d => {
                return x(Number(d["stat"])) * 0.7 + 55
            })
            .attr("y", d => y(d.name) - 16)
            .attr("text-anchor", "left")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("filter", "url(#glow)")
            .style("fill", "white")
            .text(d => roundToTwo(Number(d["stat"])));

        svg.selectAll("YAxisBar .tick")
            .data(data_selected).enter()
            .append("text")
            .attr("id", "display_over")
            .attr("class", "text-d3")
            .attr("x", d => {
                return 55
            })
            .attr("y", d => y(d.name) - 28)
            .attr("text-align", "left")
            .style("font-size", "12px")
            .style("filter", "url(#glow)")
            .style("fill", "white")
            .text(d => d["name"]);

    }, [props.data, props.win_width, props.win_height, props.stat, height,  props.color, width]);


    return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}