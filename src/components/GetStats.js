export default function GetStats(data, playerId) {
    var player = data.filter((item) => Number(item.playerId) === playerId)[0]
    try {
        const ret_value = new Object({ Minutes: Number(player.minutes), Goals: Number(player.Goals), Assists: Number(player.Assists) })
        return ret_value
    }
    catch (e) {
        return {}
    }
}