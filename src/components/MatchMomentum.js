import React from "react";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown"
import DropdownHide from "./DropdownHide";
import teams_data from "./../data/teams"
import teams_colors from "./../data/teams_colors"
import teams_ids from "./../data/team_ids"
import team_ids from "./../data/team_ids";
import * as d3 from "d3";
import "./../styles/match_momentum.css"
import GetScore from "./GetScore";
import MatchMomentumChart from "./MatchMomentum/MatchMomentumChart"

export default function MatchMomentum(props) {

    const [team, setTeam] = useState("Benfica")
    const [teamId, setTeamId] = useState(teams_ids[team])

    const [oppTeam, setOppTeam] = useState("Arouca")
    const [oppTeamId, setOppTeamId] = useState(team_ids[oppTeam])

    const [displayTeams, setDisplayTeams] = useState(false)
    const [teams, setTeams] = useState(teams_data[1]["teams"].filter((item) => item !== oppTeam))
    const [displayOppTeams, setDisplayOppTeams] = useState(false)
    const [oppTeams, setOppTeams] = useState(teams_data[1]["teams"].filter((item) => item !== team))

    const [score, setScore] = useState("4 - 0")

    const styles = {
        border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"],
    }

    const textStyles = {
        textShadow: "1px 0px 5px " + teams_colors.filter((item) => (item.team === team))[0]["color"] + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)",
    }


    const [season, setSeason] = useState("22-23")
    const [displaySeasons, setDisplaySeasons] = useState(false)

    function handleSeasonDropDownChange() {
        setDisplaySeasons((prev) => { return !prev })
        setDisplayOppTeams(false)
        setDisplayTeams(false)
    }

    function handleTeamDropDownChange() {
        setDisplayTeams((prev) => { return !prev })
        setDisplayOppTeams(false)
        setDisplaySeasons(false)
    }

    function handleOppTeamDropDownChange() {
        setDisplayOppTeams((prev) => { return !prev })
        setDisplayTeams(false)
        setDisplaySeasons(false)
    }

    function handleSeasonChange(event) {
        setSeason(event.target.innerHTML)

        setOppTeams(teams_data.filter((item) => item.season === event.target.innerHTML)[0]["teams"].filter((item) => item !== team.replaceAll("-", " ")))
        setTeams(teams_data.filter((item) => item.season === event.target.innerHTML)[0]["teams"].filter((item) => item !== oppTeam.replaceAll("-", " ")))

        setDisplaySeasons((prev) => {
            return !prev
        })

        setDisplayTeams(false)

        setDisplayOppTeams(false)

    }

    function handleTeamChange(event, flag) {
        const array = [...event.target.childNodes]
        const event_team = array[1].data

        if (flag === "home") {
            setTeam(event_team.replaceAll("-", " "))

            setTeamId(team_ids[event_team.replaceAll(" ", "-")])

            try {
                setOppTeams(teams_data.filter((item) => item.season === season)[0]["teams"].filter((item) => item !== event_team.replaceAll("-", " ")))
            }

            catch (e) {
                console.log(e)
            }
        }
        else {
            setOppTeam(event_team.replaceAll("-", " "))

            setOppTeamId(team_ids[event_team.replaceAll(" ", "-")])

            try {
                setTeams(teams_data.filter((item) => item.season === season)[0]["teams"].filter((item) => item !== event_team.replaceAll("-", " ")))
            }
            catch (e) {
                console.log(e)
            }
        }

        setDisplayTeams(false)
        setDisplayOppTeams(false)

    }

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

    const rect_styles = {
        borderTop: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"],
        borderBottom: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"]
    }

    const [dataHome, setDataHome] = React.useState([])
    const [dataAway, setDataAway] = React.useState([])

    React.useEffect(() => {
        try {
            d3.csv(require("./../data/" + season + "/" + team.replace(/\s+/g, '-') + "/" + team.replace("-", " ") + " - " + oppTeam.replace("-", " ") + ".csv"))
                .then((data) => {
                    setDataHome(data)
                    setScore(GetScore(data, teamId, oppTeamId))
                    return () => undefined;
                })

        }
        catch (e) {
            setDataHome([])
            setScore("Not played yet")
        }
    }, [team, season, oppTeam]);

    React.useEffect(() => {
        try {
            d3.csv(require("./../data/" + season + "/" + oppTeam.replace(/\s+/g, '-') + "/" + team.replace("-", " ") + " - " + oppTeam.replace("-", " ") + ".csv"))
                .then((data) => {
                    setDataAway(data)
                    return () => undefined;
                })

        }
        catch (e) {
            setDataAway([])
        }
    }, [team, season, oppTeam]);

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
            <nav className="match-momentum--nav">
                <img src={require(`./../data/LigaBwin.png`)} ></img>
                <Dropdown placeholder={season} displayFlag={displaySeasons} li_elements={<><li className="dropdown--elem" onClick={(event) => handleSeasonChange(event)}>21-22</li><li className="dropdown--elem" onClick={(event) => handleSeasonChange(event)}>22-23</li></>}
                    styles={{ border: '2px solid #ffb404' }} textStyles={{ textShadow: "1px 0px 5px #ffb404, 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)" }} handleInputChange={handleSeasonDropDownChange} />
                <DropdownHide links={[{ "text": "Global", "link": "/global" }, { "text": "Team Stats", "link": "/team_stats" }, { "text": "Player Stats", "link": "/player_stats" }]} color={"#ffb404"} />
            </nav>

            <main className="match-momentum--main">
                <div style={rect_styles} className="result--container">
                    <div style={rect_styles} className="circle">
                        <img src={require("./../data/" + season + "/" + team.replaceAll(" ", "-") + ".png")} id="home_team" alt="" />
                    </div>
                    <div className="result-div">
                        <h1 style={{ textShadow: "1px 0px 5px #ffb404, 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)" }}>Match Momentum Chart</h1>
                        <div className="result">
                            <Dropdown placeholder={team} displayFlag={displayTeams} li_elements={teams.map((item) => <li className="dropdown--elem" onClick={(event) => handleTeamChange(event, "home")}><img src={require(`./../data/${season}/${item.replaceAll(" ", "-")}.png`)}></img>{item}</li>)}
                                styles={styles} textStyles={textStyles} handleInputChange={handleTeamDropDownChange} />
                            <span style={{ borderLeft: "2px solid" + teams_colors.filter((item) => (item.team === team))[0]["color"], borderRight: "2px solid" + teams_colors.filter((item) => (item.team === oppTeam))[0]["color"] }}>{score}</span>
                            <Dropdown placeholder={oppTeam} displayFlag={displayOppTeams} li_elements={oppTeams.map((item) => <li className="dropdown--elem" onClick={(event) => handleTeamChange(event, "away")}><img src={require(`./../data/${season}/${item.replaceAll(" ", "-")}.png`)}></img>{item}</li>)}
                                styles={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === oppTeam))[0]["color"], }} textStyles={{ textShadow: "1px 0px 5px " + teams_colors.filter((item) => (item.team === oppTeam))[0]["color"] + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)" }} handleInputChange={handleOppTeamDropDownChange} />
                        </div>
                    </div>
                    <div style={{ borderTop: '2px solid ' + teams_colors.filter((item) => (item.team === oppTeam))[0]["color"], borderBottom: '2px solid ' + teams_colors.filter((item) => (item.team === oppTeam))[0]["color"] }} className="circle">
                        <img src={require("./../data/" + season + "/" + oppTeam.replaceAll(" ", "-") + ".png")} id="home_team" alt="" />
                    </div>
                </div>
                <div style={{ border: "2px solid " + teams_colors.filter((item) => (item.team === team))[0]["color"] }} className="svg--container">
                    <MatchMomentumChart team={team} oppTeam={oppTeam} dataHome={dataHome} dataAway={dataAway} win_width={windowWidth} win_height={windowHeight} teamId={teamId} oppTeamId={oppTeamId} />
                </div>
            </main>
            <div style={background_styles} id="background_div"></div>
        </>
    )
}