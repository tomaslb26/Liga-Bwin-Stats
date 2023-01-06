import React from "react";
import Nav from "./Nav";
import TeamStats from "./TeamStats"
import teams_data from "./../data/teams"
import teams_colors from "./../data/teams_colors"
import teams_ids from "./../data/team_ids"
import team_ids from "./../data/team_ids";
import { useState } from "react";

export default function TeamStatsDisplay(props) {

    const [team, setTeam] = useState("Benfica")

    const [teamId, setTeamId] = useState(teams_ids[team])

    const [teams, setTeams] = useState(teams_data[1]["teams"])

    const [season, setSeason] = useState("22-23")

    const [color, setColor] = useState("#cf261f")

    const [displayTeams, setDisplayTeams] = useState(false)

    const [displaySeasons, setDisplaySeasons] = useState(false)

    function handleSeasonChange(event) {
        setSeason(event.target.innerHTML)

        setTeams(
            () => {
                return (teams_data.filter((item) => (item.season === event.target.innerHTML))[0]["teams"])
            }
        )

        setDisplaySeasons((prev) => {
            return !prev
        })

    }

    function handleTeamChange(event) {
        const array = [...event.target.childNodes]
        const event_team = array[1].data
        setTeam(event_team.replaceAll("-", " "))

        setTeamId(team_ids[event_team.replaceAll(" ", "-")])

        setColor(
            () => {
                return (teams_colors.filter((item) => (item.team === event_team.replaceAll("-", " ")))[0]["color"])
            }
        )

        setDisplayTeams((prev) => {
            return !prev
        })

    }

    const styles = {
        backgroundImage: 'url(' + require(`./../data/${season}/estadio_${team.replaceAll(" ", "-")}.jpg`) + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: "absolute",
        opacity: 0.2,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        content: "",
        zIndex: -1
    }





    return (
        <>
            <Nav team={team} setTeam={setTeam} teams={teams} setTeams={setTeams} season={season} setSeason={setSeason} color={color} setColor={setColor} displayTeams={displayTeams}
                setDisplayTeams={setDisplayTeams} displaySeasons={displaySeasons} setDisplaySeasons={setDisplaySeasons} handleSeasonChange={handleSeasonChange} handleTeamChange={handleTeamChange} />
            <TeamStats team={team} season={season} color={color} teamId={teamId} />
            <div style={styles} id="background_div"></div>
        </>
    )
}