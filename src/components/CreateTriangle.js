export function createTriangle(svg, id, opacity) {
    svg.append("svg:defs").append("svg:marker")
        .attr("id", id)
        .attr("refX", 11)
        .attr("refY", 6)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
        .style("fill", "white")
        .style("fill-opacity", opacity);
}