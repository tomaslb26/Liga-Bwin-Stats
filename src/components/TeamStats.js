import React from "react";
import "./../styles/teamstats.css"
import * as d3 from "d3";
import LineXG from "./TeamStats/LineXG";
import BarChart from "./TeamStats/BarChart";
import Nav from "./Nav";
import Dropdown from "./Dropdown"
import stats from "./../data/stats"
import stats_conversion from "./../data/stats_conversion";
import PassingNetwork from "./PassingNetwork";
import Actions from "./Actions";
import teams_data from "./../data/teams"
import DropdownSection from "./DropdownSection";

export default function TeamStats(props) {


    var teams = teams_data.filter((item) => (item.season === props.season))[0]["teams"]
    teams = teams.filter((item) => (item !== props.team))

    const styles = {
        border: '2px solid ' + props.color,
        fontSize: "90%"
    }

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        d3.csv(require("./../data/" + props.season + "/allShotsLigaBwin" + props.season.replaceAll("-", "") + ".csv"))
            .then((data) => {
                data = data.filter(function (d) {
                    if (d.homeTeam === props.team || d.awayTeam === props.team) {
                        return d;
                    }
                })
                setData(data)
                return () => undefined;
            })
    }, [props.team, props.season]);

    const [dataBar, setDataBar] = React.useState([])

    React.useEffect(() => {
        d3.csv(require("./../data/" + props.season + "/calcs.csv"))
            .then((data) => {
                data = data.filter(function (d) {
                    if (d.team == props.team.replaceAll(" ", "-") && d.minutes > 220) return d
                })
                setDataBar(data)
                return () => undefined;
            })
    }, [props.team, props.season]);



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

    const textStyles = {
        textShadow: "1px 0px 5px " + props.color + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)",
    }

    const [displayStat, setDisplayStat] = React.useState(false)
    const [stat, setStat] = React.useState(stats[0])

    function handleInputChange() {
        setDisplayStat((prev) => (!prev))
    }

    function handleStatChange(event) {
        setStat(event.target.innerHTML)
        setDisplayStat(false)
    }

    const [side, setSide] = React.useState("Home")
    const [oppTeam, setOppTeam] = React.useState(teams[0])


    return (
        <>
            <Nav option = "team_stats" color = {props.color} />
            <DropdownSection teams = {props.teams} team = {props.team} handleTeamChange = {props.handleTeamChange} 
                            season = {props.season} handleSeasonChange = {props.handleSeasonChange}
                            options = {{season: true, teams: true, players : false}}
                            color={props.color}
                            />
            <main className="team-stats">
                <div className="team-grid">
                    <div style={{ border: '2px solid ' + props.color }} className="first-rectangle">
                        <LineXG data={data} team={props.team} color={props.color} season={props.season} win_width={windowWidth} win_height={windowHeight} />
                        <div className="stat-container">
                            <span>Rank By Stat:</span>
                            <div style={{ marginLeft: "1%" }}>
                                <Dropdown placeholder={stat} displayFlag={displayStat} li_elements={stats.map((item) => <li className="dropdown--elem" style={{ fontSize: "70%" }} onClick={(event) => handleStatChange(event)}>{item}</li>)} styles={styles} textStyles={textStyles} handleInputChange={handleInputChange} />
                            </div>
                        </div>
                        <BarChart data={dataBar} team={props.team} color={props.color} season={props.season} win_width={windowWidth} win_height={windowHeight} stat={stats_conversion[stat]} />
                    </div>
                    <div style={styles} className="second-rectangle">
                        <PassingNetwork team={props.team} season={props.season} color={props.color} win_width={windowWidth} win_height={windowHeight} side={side} oppTeam={oppTeam} setSide={setSide} setOppTeam={setOppTeam} teams={teams} />
                    </div>
                    <div style={styles} className="third-rectangle" id="third_rectangle">
                        <Actions teamId={props.teamId} team={props.team} season={props.season} color={props.color} win_width={windowWidth} win_height={windowHeight} side={side} oppTeam={oppTeam} setSide={setSide} setOppTeam={setOppTeam} />
                    </div>
                </div>
            </main>
        </>
    )
}