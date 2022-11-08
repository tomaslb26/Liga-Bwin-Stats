export default function GetPlayerId(data, team, playerName) {
    var player = data.filter(item => item["name"] === playerName && item.team === team)[0]
    return player
}