export default function GetPlayers(data, team) {
    var players = data.filter((item) => item.team === team)
    players = players.map((item) => item.name).sort()
    players = players.filter((player) => player !== "")
    return players
}