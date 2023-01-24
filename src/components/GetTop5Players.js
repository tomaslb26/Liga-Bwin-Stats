import GetMaxMinutes from "./GetMaxMinutes"

export default function GetTop5Players(data, stat){
    var minutes_treshold = Math.round(GetMaxMinutes(data) / 3)
    var updatedData  = data.filter(item => Number(item["minutes"]) > Number(minutes_treshold))
    updatedData = updatedData.map((item) => ({player: item.name, team: item.team, stat: (Number(item[stat])*90)/Number(item.minutes), photo: item.photo }))
    
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