export default function GetStats(data, playerId) {
    var player = data.filter((item) => Number(item.playerId) === playerId)[0]
    try {
        return [Number(player.minutes), Number(player.Goals), Number(player.Assists)]
    }
    catch (e) {
        return []
    }
}