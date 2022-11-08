export function mouseaux(svg, div, d, option, option_2) {
    if (option == "over") var ret_value = 0.1
    else var ret_value = 1
    svg.selectAll(div)
        .style("fill-opacity", function (e) {
            if (option_2 != null) {
                if (e[option_2] != d[option_2]) return ret_value
            }
            else {
                if (e != d) return ret_value
            }
        })
        .attr("stroke-opacity", function (e) {
            if (option_2 != null) {
                if (e[option_2] != d[option_2]) return ret_value
            }
            else {
                if (e != d) return ret_value
            }
        })

}