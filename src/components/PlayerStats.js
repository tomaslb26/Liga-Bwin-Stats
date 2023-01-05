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

export default function PlayerStats() {

    const [season, setSeason] = useState("22-23")
    const [displaySeasons, setDisplaySeasons] = useState(false)

    function handleSeasonDropDownChange() {
        setDisplaySeasons((prev) => { return !prev })
    }

    function handleSeasonChange(event) {
        setSeason(event.target.innerHTML)
        setTeams(teams_data.filter((item) => item.season === event.target.innerHTML)[0]["teams"])
        setDisplaySeasons(false)
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
        const array = [...event.target.childNodes]
        const event_team = array[1].data
        setTeam(event_team.replaceAll("-", " "))
        setTeamId(team_ids[event_team])
        setDisplayTeams(false)
    }

    function handleTeamDropdownChange() {
        setDisplayTeams((prev) => { return !prev })
    }


    function handlePlayerChange(event) {
        const array = [...event.target.childNodes]
        const event_player = array[1].data
        setPlayer(event_player)
        setDisplayPlayers(false)
        setPlayerId(Number(GetPlayerId(data, team.replaceAll(" ", "-"), event_player)["playerId"]))
        setFotmobPlayerId(Number(GetPlayerId(data, team.replaceAll(" ", "-"), event_player)["fotmob_player_id"]))
    }

    function handlePlayerDropdownChange() {
        setDisplayPlayers((prev) => { return !prev })
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


    const background_styles = {
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
            <nav className="player-stats--nav">
                <img src={require(`./../data/${season}/${team.replaceAll(" ", "-")}.png`)} ></img>
                <div style={{ marginLeft: "0.5%" }}>
                    <Dropdown placeholder={season} displayFlag={displaySeasons} li_elements={<><li className="dropdown--elem" onClick={(event) => handleSeasonChange(event)}>21-22</li><li className="dropdown--elem" onClick={(event) => handleSeasonChange(event)}>22-23</li></>}
                        styles={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"] }} textStyles={{ textShadow: "1px 0px 5px " + teams_colors.filter((item) => (item.team === team))[0]["color"] + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)" }} handleInputChange={handleSeasonDropDownChange} />
                </div>
                <div style={{ marginLeft: "0.5%" }}>
                    <Dropdown placeholder={team} displayFlag={displayTeams} li_elements={teams.map((item) => <li className="dropdown--elem" onClick={(event) => handleTeamChange(event)}><img src={require(`./../data/${season}/${item.replaceAll(" ", "-")}.png`)}></img>{item}</li>)}
                        styles={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"] }} textStyles={{ textShadow: "1px 0px 5px " + teams_colors.filter((item) => (item.team === team))[0]["color"] + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)" }} handleInputChange={handleTeamDropdownChange} />
                </div>
                <div style={{ marginLeft: "0.5%" }}>
                    <Dropdown placeholder={player} displayFlag={displayPlayers} li_elements={players.map((item) => {
                        try {
                            return <li className="dropdown--elem" onClick={(event) => handlePlayerChange(event)}><img src={item.photo}></img>{item.name}</li>
                        } catch (e) {
                            return <li className="dropdown--elem" onClick={(event) => handlePlayerChange(event)}><img src={require(`./../data/${season}/${team.replaceAll(" ", "-")}.png`)}></img>{item.name}</li>
                        }
                    })}
                        styles={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"] }} textStyles={{ textShadow: "1px 0px 5px " + teams_colors.filter((item) => (item.team === team))[0]["color"] + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)" }} handleInputChange={handlePlayerDropdownChange} />
                </div>
                <DropdownHide links={[{ "text": "Global", "link": "/global" }, { "text": "Team Stats", "link": "/team_stats" }, { "text": "Match Momentum", "link": "/match_momentum" }]} color={teams_colors.filter((item) => (item.team === team))[0]["color"]} />
            </nav>
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
            <div style={background_styles} id="background_div"></div>
        </>
    )
}
