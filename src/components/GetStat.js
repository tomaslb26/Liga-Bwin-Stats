import GetMaxMinutes from "./GetMaxMinutes"

export default function GetStat(data, player, option, stat) {

    var minutes_treshold = Math.round(GetMaxMinutes(data) / 3)

    var data_temp = data.filter(item => item["minutes"] > minutes_treshold)

    data_temp = data_temp.map(o => ({ name: o.name, playerId: Number(o.playerId), minutes: Number(o.minutes), stat: Number((o[stat] * 90) / o.minutes) }))

    var new_player = data_temp.filter(item => item["playerId"] === player)[0]

    try {
        var below = data_temp.filter(item => item.stat < new_player.stat)
    }
    catch (e) {
        if (option === "stats") return 0
        else if (option === "percentile") return "NaN"
    }

    var percentile = ((below.length / data_temp.length) * 100)

    if (percentile.toFixed(0) === 100) percentile = 99
    else if (percentile.toFixed(0) === 0) percentile = 1

    if (option === "percentile") return percentile
    else return new_player["stat"]

}