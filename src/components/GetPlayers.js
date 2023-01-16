export default function GetPlayers(data, team) {
    var players = data.filter((item) => item.team === team)
    players = players.map((item) => ({ name: item.name, photo: item.photo }))
    players = players.filter((player) => player.name !== "")

    players = players.sort(function (a, b) {
        var keyA = a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            keyB = b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (keyA > keyB) return 1;
        if (keyA < keyB) return -1;
        return 0;
    })

    return players
}