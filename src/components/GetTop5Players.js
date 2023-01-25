import GetMaxMinutes from "./GetMaxMinutes"

export default function GetTop5Players(data, stat){
    var minutes_treshold = Math.round(GetMaxMinutes(data) * 0.4)
    var updatedData  = data.filter(item => Number(item["minutes"]) > Number(minutes_treshold))
    
    if (stat === "Goals" || stat === "Assists") updatedData = updatedData.map(o => ({ name: o.name, stat: (o[stat]), photo: o.photo, team: o.team, minutes: Number(o.minutes) }))
    else if (stat === "Pass Percentage") updatedData = updatedData.map(o => ({ name: o.name, stat: (o["suc_passes"] / o["total_passes"]) * 100, photo: o.photo, team: o.team , minutes: Number(o.minutes)}))
    else if (stat === "Take-On Percentage") updatedData = updatedData.map(o => ({ name: o.name, stat: (o["suc_take_ons"] / o["take_ons"]) * 100, photo: o.photo, team: o.team , minutes: Number(o.minutes)}))
    else updatedData = updatedData.map(o => ({ name: o.name, stat: (o[stat] * 90) / o.minutes, photo: o.photo, team: o.team , minutes: Number(o.minutes)}))


    updatedData = updatedData.sort(function (a, b) {
        var keyA = Number(a["stat"]),
            keyB = Number(b["stat"]);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    })

    updatedData = updatedData.slice(0,5)
    return updatedData
}