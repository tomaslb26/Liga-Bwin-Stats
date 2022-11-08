import * as d3 from "d3";

export default function GetMaxMinutes(data) {
    return d3.max(data, function (d) { return d.minutes })
}   