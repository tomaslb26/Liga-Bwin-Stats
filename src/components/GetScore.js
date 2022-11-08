import * as d3 from "d3";

export default function GetScore(data, home_id, away_id) {
    var own_goals = data.filter((item) => {
        if (item.isOwnGoal === "True") return item
    })

    var home_goals = data.filter((item) => {
        if ((item.type === "Goal" && item.teamId == home_id)) return item
    })


    var away_goals = data.filter((item) => {
        if ((item.type === "Goal" && item.teamId == away_id)) return item
    })

    var home_own_goals = 0;
    var away_own_goals = 0;
    for (var i = 0; i < own_goals.length; i++) {
        if (own_goals[i].teamId == home_id) {
            home_own_goals -= 1
            away_own_goals += 1
        }
        else {
            home_own_goals += 1
            away_own_goals -= 1
        }
    }

    return (home_goals.length + home_own_goals) + " - " + (away_goals.length + away_own_goals)
}