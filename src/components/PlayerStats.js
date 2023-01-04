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
import GetStats from "./GetStats";
import StatContainer from "./PlayerStats/StatContainer";
import PlotActions from "./PlayerStats/PlotActions";

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

    const [plotOption, setPlotOption] = React.useState("actions")
    function handlePlotChange(option) {
        setPlotOption(option)
    }

    const [dataPlot, setDataPlot] = React.useState([])

    React.useEffect(() => {
        try {
            if (plotOption == "actions") {
                d3.csv(require("./../data/" + season + "/" + team.replace(/\s+/g, '-') + "/events_" + team.replace(" ", "-") + ".csv"))
                    .then((data) => {
                        setDataPlot(data)
                        return () => undefined;
                    })
            }
            else {
                d3.csv(require("./../data/" + season + "/allShotsLigaBwin" + season.replaceAll("-", "") + ".csv"))
                    .then((data) => {
                        setDataPlot(data)
                        return () => undefined;
                    })
            }

        }
        catch (e) {
            console.log(e)
        }
    }, [team, season, plotOption]);


    var backgroundActions, backgroundShots = "transparent"
    if (plotOption === "actions") backgroundActions = teams_colors.filter((item) => (item.team === team))[0]["color"]
    else if (plotOption === "shots") backgroundShots = teams_colors.filter((item) => (item.team === team))[0]["color"]


    const [progPasses, setProgPasses] = React.useState(false)
    const [allPasses, setAllPasses] = React.useState(false)
    const [unsuccessfulPasses, setUnsuccessfulPasses] = React.useState(false)
    const [allCarries, setAllCarries] = React.useState(false)
    const [progCarries, setProgCarries] = React.useState(false)
    const [allTouches, setAllTouches] = React.useState(false)
    const [ballRecoveries, setBallRecoveries] = React.useState(false)
    const [heatmap, setHeatmap] = React.useState(false)
    const [blockedPasses, setBlockedPasses] = React.useState(false)
    const [interceptions, setInterceptions] = React.useState(false)
    const [clearances, setClearances] = React.useState(false)
    const [tackles, setTackles] = React.useState(false)
    const [goals, setGoals] = React.useState(false)
    const [attemptSaved, setAttemptSaved] = React.useState(false)
    const [misses, setMisses] = React.useState(false)
    const [post, setPost] = React.useState(false)

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
                <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"] }} className="pitch-section">
                    <div className="buttons">
                        <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"], backgroundColor: backgroundActions, padding: "0.7% 1%" }} onClick={() => handlePlotChange("actions")} className="button">Actions</div>
                        <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"], backgroundColor: backgroundShots, padding: "0.7% 1%" }} onClick={() => handlePlotChange("shots")} className="button">Shots</div>
                    </div>
                    <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"] }} className="stats-display">
                        <div className="stat-short">
                            <span>Minutes</span>
                            <span>{GetStats(data, playerId)[0]}</span>
                        </div>
                        <div className="stat-short">
                            <span>Goals</span>
                            <span>{GetStats(data, playerId)[1]}</span>
                        </div>
                        <div className="stat-short">
                            <span>Assists</span>
                            <span>{GetStats(data, playerId)[2]}</span>
                        </div>
                    </div>
                    <div className="pitch">
                        <PlotActions color={teams_colors.filter((item) => (item.team === team))[0]["color"]} win_width={windowWidth} win_height={windowHeight} data={dataPlot} playerId={playerId} fotmobPlayerId={fotmobPlayerId}
                            allTouches={allTouches} allPasses={allPasses} progPasses={progPasses} unsuccessfulPasses={unsuccessfulPasses} allCarries={allCarries} progCarries={progCarries}
                            ballRecoveries={ballRecoveries} blockedPasses={blockedPasses} interceptions={interceptions} clearances={clearances} tackles={tackles}
                            goals={goals} attemptSaved={attemptSaved} misses={misses} post={post} heatmap={heatmap} />
                    </div>
                    <div className="checkboxes">
                        {plotOption === "actions" &&
                            <>
                                <div className="def-action">
                                    <label htmlFor="unsuccessful_passes">Unsuccessful Passes</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="unsuccessful_passes"
                                        checked={unsuccessfulPasses}
                                        onChange={() => setUnsuccessfulPasses((prev) => (!prev))}
                                        name="unsuccessful_passes"
                                    />
                                </div>
                                <div className="def-action">
                                    <label htmlFor="all_passes">All Passes</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="all_passes"
                                        checked={allPasses}
                                        onChange={() => setAllPasses((prev) => (!prev))}
                                        name="all_passes"
                                    />
                                </div>
                                <div className="def-action">
                                    <label htmlFor="prog_passes">Progressive Passes</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="prog_passes"
                                        checked={progPasses}
                                        onChange={() => setProgPasses((prev) => (!prev))}
                                        name="prog_passes"
                                        style={{ border: "1px solid " + teams_colors.filter((item) => (item.team === team))[0]["color"] }}
                                    />
                                </div>
                                <div className="def-action">
                                    <label htmlFor="all_carries">All Carries</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="all_carries"
                                        checked={allCarries}
                                        onChange={() => setAllCarries((prev) => (!prev))}
                                        name="all_carries"
                                    />
                                </div>
                                <div className="def-action">
                                    <label htmlFor="prog_carries">Progressive Carries</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="prog_carries"
                                        checked={progCarries}
                                        onChange={() => setProgCarries((prev) => (!prev))}
                                        name="prog_carries"
                                        style={{ border: "1px solid #48EDDB" }}
                                    />
                                </div>
                                <div className="def-action">
                                    <label htmlFor="all_touches">All Touches</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="all_touches"
                                        checked={allTouches}
                                        onChange={() => setAllTouches((prev) => (!prev))}
                                        name="all_touches"
                                    />
                                </div>
                                <div className="def-action">
                                    <label htmlFor="heatmap">Heatmap</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="heatmap"
                                        checked={heatmap}
                                        onChange={() => setHeatmap((prev) => (!prev))}
                                        name="heatmap"
                                    />
                                </div>
                            </>}
                        {plotOption === "shots" &&
                            <>

                                <div style={{ backgroundColor: "#55DD31" }} className="def-action">
                                    <label htmlFor="goals">Goals</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="goals"
                                        checked={goals}
                                        onChange={() => setGoals((prev) => (!prev))}
                                        name="goals"
                                    />
                                </div>
                                <div style={{ backgroundColor: "#DD9131" }} className="def-action">
                                    <label htmlFor="attempt_saved">Attempt Saved</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="attempt_saved"
                                        checked={attemptSaved}
                                        onChange={() => setAttemptSaved((prev) => (!prev))}
                                        name="attempt_saved"
                                    />
                                </div>
                                <div style={{ backgroundColor: "#DD3131" }} className="def-action">
                                    <label htmlFor="misses">Miss</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="misses"
                                        checked={misses}
                                        onChange={() => setMisses((prev) => (!prev))}
                                        name="misses"
                                    />
                                </div>
                                <div style={{ backgroundColor: "#31B1DD" }} className="def-action">
                                    <label htmlFor="post">Post</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="post"
                                        checked={post}
                                        onChange={() => setPost((prev) => (!prev))}
                                        name="post"
                                    />
                                </div>
                            </>}
                    </div>
                    <div className="checkboxes">
                        {plotOption === "actions" &&
                            <>

                                <div style={{ backgroundColor: "#42DC60" }} className="def-action">
                                    <label htmlFor="ball_recoveries">Ball Recoveries</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="ball_recoveries"
                                        checked={ballRecoveries}
                                        onChange={() => setBallRecoveries((prev) => (!prev))}
                                        name="ball_recoveries"
                                    />
                                </div>
                                <div style={{ backgroundColor: "#42DCD5" }} className="def-action">
                                    <label htmlFor="blocked_passes">Blocked Passes</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="blocked_passes"
                                        checked={blockedPasses}
                                        onChange={() => setBlockedPasses((prev) => (!prev))}
                                        name="blocked_passes"
                                    />
                                </div>
                                <div style={{ backgroundColor: "red" }} className="def-action">
                                    <label htmlFor="interceptions">Interceptions</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="interceptions"
                                        checked={interceptions}
                                        onChange={() => setInterceptions((prev) => (!prev))}
                                        name="interceptions"
                                    />
                                </div>
                                <div style={{ backgroundColor: "#D047D6" }} className="def-action">
                                    <label htmlFor="clearances">Clearances</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="clearances"
                                        checked={clearances}
                                        onChange={() => setClearances((prev) => (!prev))}
                                        name="clearances"
                                    />
                                </div>
                                <div style={{ backgroundColor: "#E38A18" }} className="def-action">
                                    <label htmlFor="tackles">Tackles</label>
                                    <input
                                        className="checkbox-flip"
                                        type="checkbox"
                                        id="tackles"
                                        checked={tackles}
                                        onChange={() => setTackles((prev) => (!prev))}
                                        name="tackles"
                                    />
                                </div>
                            </>}
                    </div>
                </div>
            </main>
            <div style={background_styles} id="background_div"></div>
        </>
    )
}
