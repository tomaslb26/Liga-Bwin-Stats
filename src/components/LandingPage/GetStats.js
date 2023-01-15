import * as d3 from "d3";

export function get_first_place(){
    d3.csv(require("./../../data/22-23/classification.csv")).then((data) =>
    {
        let first = data.filter((item) => item.Position == 1)[0]
        return data
    })
}