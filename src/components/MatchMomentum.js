import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown"
import teams_data from "./../data/teams"
import teams_colors from "./../data/teams_colors"
import teams_ids from "./../data/team_ids"
import team_ids from "./../data/team_ids";
import * as d3 from "d3";
import "./../styles/match_momentum.css"
import GetScore from "./GetScore";
import MatchMomentumChart from "./MatchMomentum/MatchMomentumChart"
import Nav from "./Nav";
import DropdownSection from "./DropdownSection";

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

    const [season, setSeason] = useState("22-23")

    function handleTeamDropDownChange() {
        setDisplayTeams((prev) => { return !prev })
        setDisplayOppTeams(false)
    }

    function handleOppTeamDropDownChange() {
        setDisplayOppTeams((prev) => { return !prev })
        setDisplayTeams(false)
    }

    function handleSeasonChange(event) {
        let season = ""
        if(event.target.tagName.toLowerCase() === "li") season = event.target.getElementsByTagName('span')[0].innerHTML
        else if(event.target.tagName.toLowerCase() === "span") season = event.target.innerHTML
        else season = event.target.src.split("media/")[1].split(".")[0].replaceAll("-", " ")

        setSeason(season)

        setOppTeams(teams_data.filter((item) => item.season === season)[0]["teams"].filter((item) => item !== team.replaceAll("-", " ")))
        setTeams(teams_data.filter((item) => item.season === season)[0]["teams"].filter((item) => item !== oppTeam.replaceAll("-", " ")))

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
            d3.csv(require("./../data/" + season + "/" + oppTeam.replace(/\s+/g, '-') + "/" + team.replace("-", " ") + " - " + oppTeam.replace("-", " ") + ".csv"))
            .then((data) => {
                setDataAway(data)
                return () => undefined;
            })

        }
        catch (e) {
            setDataHome([])
            setDataAway([])
            setScore("Not played yet")
        }
    }, [team, season, oppTeam, teamId, oppTeamId]);

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

    function CircleLogo(props){
        return(
            <div style={{borderTop: "2px solid" + props.color, borderBottom: "2px solid" + props.color}} className="circle">
                <img alt = "logo-1" src={require("./../data/" + props.season + "/" + props.team.replaceAll(" ", "-") + ".png")} id="home_team" />
            </div>
        )
    }


    return (
        <>
            <Nav option = "match momentum" color = {"#FFB700"} />
            <DropdownSection season = {season} handleSeasonChange = {handleSeasonChange}
                            options = {{season: true, teams: false, players : false}}
                            color={"#FFB700"}
                            />
            <main className="match-momentum--main">
                <div style={{borderTop: "2px solid" + teams_colors.filter((item) => (item.team === team))[0]["color"],
                             borderBottom: "2px solid" + teams_colors.filter((item) => (item.team === team))[0]["color"]}} 
                className="result--container">
                    <CircleLogo team = {team} season = {season} color = {teams_colors.filter((item) => (item.team === team))[0]["color"]} />
                    <div className="result-div">
                        <h1 style={{ textShadow: "1px 0px 5px #ffb404, 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)" }}>Match Momentum Chart</h1>
                        <div className="result">
                            <Dropdown placeholder={team} displayFlag={displayTeams} li_elements={teams.map((item) => <li className="dropdown--elem" onClick={(event) => handleTeamChange(event, "home")}><img alt = "team-logo" src={require(`./../data/${season}/${item.replaceAll(" ", "-")}.png`)}></img>{item}</li>)}
                                styles={{border: '2px solid ' + teams_colors.filter((item) => (item.team === team))[0]["color"]}}
                                textStyles={{textShadow: "1px 0px 5px " + teams_colors.filter((item) => (item.team === team))[0]["color"] + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)"}} 
                                handleInputChange={handleTeamDropDownChange} />
                            <span style={{ borderLeft: "2px solid" + teams_colors.filter((item) => (item.team === team))[0]["color"], borderRight: "2px solid" + teams_colors.filter((item) => (item.team === oppTeam))[0]["color"] }}>{score}</span>
                            <Dropdown placeholder={oppTeam} displayFlag={displayOppTeams} li_elements={oppTeams.map((item) => <li className="dropdown--elem" onClick={(event) => handleTeamChange(event, "away")}><img alt = "team-logo" src={require(`./../data/${season}/${item.replaceAll(" ", "-")}.png`)}></img>{item}</li>)}
                                styles={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === oppTeam))[0]["color"], }} 
                                textStyles={{ textShadow: "1px 0px 5px " + teams_colors.filter((item) => (item.team === oppTeam))[0]["color"] + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)" }} 
                                handleInputChange={handleOppTeamDropDownChange} />
                        </div>
                    </div>
                    <CircleLogo team = {oppTeam} season = {season} color = {teams_colors.filter((item) => (item.team === oppTeam))[0]["color"]} />
                </div>
                <div style={{ border: "2px solid " + teams_colors.filter((item) => (item.team === team))[0]["color"] }} className="svg--container">
                    <MatchMomentumChart season={season} team={team} oppTeam={oppTeam} dataHome={dataHome} dataAway={dataAway} win_width={windowWidth} win_height={windowHeight} teamId={teamId} oppTeamId={oppTeamId} />
                </div>
            </main>
            <div className = "background-filter"></div>
            <div className = "background-team" style={{backgroundImage: 'url(' + require(`./../data/${season}/estadio_${team.replaceAll(" ", "-")}.jpg`) + ')'}}></div>
        </>
    )
}