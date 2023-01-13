import React, { useState } from "react";
import "./../styles/playerstats.css"
import Dropdown from "./Dropdown";
import DropdownHide from "./DropdownHide";
import team_ids from "./../data/team_ids";
import * as d3 from "d3";
import GetStat from "./GetStat";
import teams_data from "./../data/teams"
import teams_colors from "./../data/teams_colors"
import GetPlayers from "./GetPlayers";
import GetPlayerId from "./GetPlayerId";
import StatContainer from "./PlayerStats/StatContainer";
import PitchSection from "./PlayerStats/PitchSection";
import Nav from "./Nav";
import DropdownSection from "./DropdownSection";

export default function PlayerStats() {

    const [season, setSeason] = useState("22-23")

    function handleSeasonChange(event) {
        let season = ""
        if(event.target.tagName.toLowerCase() == "li") season = event.target.getElementsByTagName('span')[0].innerHTML
        else if(event.target.tagName.toLowerCase() == "span") season = event.target.innerHTML
        else season = event.target.src.split("media/")[1].split(".")[0].replaceAll("-", " ")

        setSeason(season)
        setTeams(teams_data.filter((item) => item.season === season)[0]["teams"])
    }

    const [team, setTeam] = useState("Benfica")
    const [teamId, setTeamId] = useState(team_ids[team])
    const [displayTeams, setDisplayTeams] = useState(false)
    const [teams, setTeams] = useState(teams_data[1]["teams"])

    const [player, setPlayer] = useState("Álex Grimaldo")
    const [playerId, setPlayerId] = useState(107252)
    const [fotmobPlayerId, setFotmobPlayerId] = React.useState(288406)
    const [players, setPlayers] = useState([])
    const [displayPlayers, setDisplayPlayers] = useState(false)

    function handleTeamChange(event) {
        let team = ""
        if(event.target.tagName.toLowerCase() == "li") team = event.target.getElementsByTagName('span')[0].innerHTML
        else if(event.target.tagName.toLowerCase() == "span") team = event.target.innerHTML
        else team = event.target.src.split("media/")[1].split(".")[0].replaceAll("-", " ")

        setTeam(team)
        setTeamId(team_ids[team])
    }

    function handlePlayerChange(event) {    
        let player = ""
        if(event.target.tagName.toLowerCase() == "li") player = event.target.getElementsByTagName('span')[0].innerHTML
        else if(event.target.tagName.toLowerCase() == "span") player = event.target.innerHTML
        else return

        setPlayer(player)
        setPlayerId(Number(GetPlayerId(data, team.replaceAll(" ", "-"), player)["playerId"]))
        setFotmobPlayerId(Number(GetPlayerId(data, team.replaceAll(" ", "-"), player)["fotmob_player_id"]))
    }

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        try {
            d3.csv(require("./../data/" + season + "/calcs.csv"))
                .then((data) => {
                    setData(data)
                    setPlayers(GetPlayers(data, team.replaceAll(" ", "-")))
                    setPlayer(GetPlayers(data, team.replaceAll(" ", "-"))[0].name)
                    return () => undefined;
                })

        }
        catch (e) {
            console.log(e)
        }
    }, [season, team]);


    const styles = {
        backgroundColor: "#2A2E30",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: "absolute",
        opacity: 0.95,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        content: "",
        zIndex: -1
    }

    const styles2 = {
        backgroundImage: 'url(' + require(`./../data/${season}/estadio_${team.replaceAll(" ", "-")}.jpg`) + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: "absolute",
        opacity: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        content: "",
        zIndex: -2
    }

    const [option, setOption] = React.useState("percentile")
    function handleButtonChange(option) {
        setOption(option)
    }

    var backgroundPercentile, backgroundStats = "transparent"
    if (option === "percentile") backgroundPercentile = teams_colors.filter((item) => (item.team === team))[0]["color"]
    else if (option === "stats") backgroundStats = teams_colors.filter((item) => (item.team === team))[0]["color"]


    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight)
    const setWindowDimensions = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }

    React.useEffect(() => {
        window.addEventListener('resize', setWindowDimensions);
        return () => {
            window.removeEventListener('resize', setWindowDimensions)
        }
    }, [])

    return (
        <>
            <Nav option = "player_stats" color = {teams_colors.filter((item) => (item.team === team))[0]["color"]} />
            <DropdownSection teams = {teams} team = {team} handleTeamChange = {handleTeamChange} 
                             players = {players} player = {player} handlePlayerChange = {handlePlayerChange} 
                             season = {season} handleSeasonChange = {handleSeasonChange}
                             options = {{season: true, teams: true, players : true}}
                             color={teams_colors.filter((item) => (item.team === team))[0]["color"]}
                            />
            <main className="player-stats--main">
                <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"] }} className="stats-section">
                    <div className="buttons">
                        <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"], backgroundColor: backgroundPercentile }} onClick={() => handleButtonChange("percentile")} id="percentile" className="button">Percentile (per 90' stats)</div>
                        <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"], backgroundColor: backgroundStats }} onClick={() => handleButtonChange("stats")} id="percentile" className="button">Per 90'</div>
                    </div>
                    <div className="svg-section">
                        <h1>Passing</h1>
                        <div style={{ gridTemplateColumns: "1fr 1fr 1fr" }} className="stats--grid">
                            <StatContainer stat={"prog_passes"} title={"Progressive Passes"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"final_third_passes"} title={"Final Third Passes"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"penalty_box_passes"} title={"Penalty Box Passes"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                        </div>
                    </div>
                    <div className="svg-section">
                        <h1>Creation</h1>
                        <div style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }} className="stats--grid">
                            <StatContainer stat={"xA"} title={"xA"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"key_passes"} title={"Key Passes"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"ChancesCreated"} title={"Chances Created"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"xt"} title={"Threat"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                        </div>
                    </div>
                    <div className="svg-section">
                        <h1>Carrying</h1>
                        <div style={{ gridTemplateColumns: "1fr 1fr 1fr" }} className="stats--grid">
                            <StatContainer stat={"prog_carries"} title={"Progressive Carries"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"final_third_entries"} title={"Final Third Entries"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"penalty_box_entries"} title={"Penalty Box Entries"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                        </div>
                    </div>
                    <div className="svg-section">
                        <h1>Shooting</h1>
                        <div style={{ gridTemplateColumns: "1fr 1fr 1fr" }} className="stats--grid">
                            <StatContainer stat={"xG"} title={"xG"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"xGOT"} title={"xGOT"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                            <StatContainer stat={"Shots"} title={"Shots"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} />
                        </div>
                    </div>
                    <div className="svg-section">
                        <h1>Defending</h1>
                        <div style={{ gridTemplateColumns: "1fr" }} className="stats--grid">
                            <StatContainer stat={"defensive_actions"} title={"Defensive Actions"} data={data} playerId={playerId} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} option={option} /></div>
                    </div>
                    {GetStat(data, playerId, "percentile", "prog_passes") === "NaN" &&
                        <h1>Not enough minutes</h1>}
                </div>
                <PitchSection season={season} team={team} data={data} playerId={playerId} fotmobPlayerId={fotmobPlayerId} windowWidth={windowWidth} windowHeight={windowHeight} />
            </main>
            <div style={styles2} id="background_div"></div>
            <div style={styles} id="background_div"></div>
        </>
    )
}
