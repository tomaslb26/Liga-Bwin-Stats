import React from "react";
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

    function handleSeasonChange(event) {

        let season = ""
        if(event.target.tagName.toLowerCase() === "li") season = event.target.getElementsByTagName('span')[0].innerHTML
        else if(event.target.tagName.toLowerCase() === "span") season = event.target.innerHTML
        else season = event.target.src.split("media/")[1].split(".")[0].replaceAll("-", " ")

        setSeason(season)

        setTeams(
            () => {
                return (teams_data.filter((item) => (item.season === season))[0]["teams"])
            }
        )

    }

    function handleTeamChange(event) {
        let team = ""

        if(event.target.tagName.toLowerCase() === "li") team = event.target.getElementsByTagName('span')[0].innerHTML
        else if(event.target.tagName.toLowerCase() === "span") team = event.target.innerHTML
        else team = event.target.src.split("media/")[1].split(".")[0].replaceAll("-", " ")

        setTeam(team.replaceAll("-", " "))

        setTeamId(team_ids[team.replaceAll(" ", "-")])

        setColor(
            () => {
                return (teams_colors.filter((item) => (item.team === team.replaceAll("-", " ")))[0]["color"])
            }
        )



    }

    return (
        <>
            <TeamStats team={team} season={season} color={color} teamId={teamId} teams = {teams} handleTeamChange = {handleTeamChange} handleSeasonChange = {handleSeasonChange} />
            <div style={{backgroundImage: 'url(' + require(`./../data/${season}/estadio_${team.replaceAll(" ", "-")}.jpg`) + ')'}} className="background-team"></div>
            <div className="background-filter"></div>
        </>
    )
}