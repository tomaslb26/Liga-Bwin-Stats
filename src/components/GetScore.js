export default function GetScore(data, home_id, away_id) {
    var own_goals = data.filter((item) => (item.isOwnGoal === "True"))

    var home_goals = data.filter((item) => ((item.type === "Goal" && Number(item.teamId) === home_id)))
    var away_goals = data.filter((item) => ((item.type === "Goal" && Number(item.teamId) === away_id)))
    
    var home_own_goals = 0;
    var away_own_goals = 0;
    for (var i = 0; i < own_goals.length; i++) {
        if (Number(own_goals[i].teamId) === Number(home_id)) {
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