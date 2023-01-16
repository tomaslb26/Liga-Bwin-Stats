import React from "react";
import "./../styles/teamstats.css"
import Dropdown from "./Dropdown"
import * as d3 from "d3";
import PlotPassingNetwork from "./TeamStats/PlotPassingNetwork";

export default function PassingNetwork(props) {

    const styles = {
        border: '2px solid ' + props.color,
        fontSize: "100%"
    }

    const textStyles = {
        textShadow: "1px 0px 5px " + props.color + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)",
    }

    const [displayOppTeam, setDisplayOppTeam] = React.useState(false)

    const [displaySide, setDisplaySide] = React.useState(false)

    function handleInputChange() {
        setDisplayOppTeam((prev) => (!prev))
    }

    function handleInputChange2() {
        setDisplaySide((prev) => (!prev))
    }

    function handleSideChange(event) {
        props.setSide(event.target.innerHTML)
        setDisplaySide(false)
    }

    function handleOppTeamChange(event) {
        const array = [...event.target.childNodes]
        const event_team = array[1].data
        props.setOppTeam(event_team.replaceAll("-", " "))
        setDisplayOppTeam(false)
    }

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        try {
            if (props.side === "Home") {
                d3.csv(require("./../data/" + props.season + "/PassNetworks/" + props.team.replaceAll(" ", "-") + "/PassNetwork" + props.team.replaceAll(" ", "-") + props.oppTeam.replaceAll(" ", "-") + ".csv"))
                    .then((data) => {
                        setData(data)
                        return () => undefined;
                    })
            }
            else {
                d3.csv(require("./../data/" + props.season + "/PassNetworks/" + props.team.replaceAll(" ", "-") + "/PassNetwork" + props.oppTeam.replaceAll(" ", "-") + props.team.replaceAll(" ", "-") + ".csv"))
                    .then((data) => {
                        setData(data)
                        return () => undefined;
                    })
            }
        }
        catch (e) {
            setData(null)
        }
    }, [props.team, props.season, props.side, props.oppTeam]);

    return (
        <>
            <h1 className="passing-network-header">Passing Network</h1>
            <div className="choose-game">
                <span>Game:</span>
                <div style={{ marginLeft: "1%" }}>
                    <Dropdown placeholder={props.oppTeam} displayFlag={displayOppTeam} li_elements={props.teams.map((item) => <li className="dropdown--elem" onClick={(event) => handleOppTeamChange(event)}><img alt = "player" src={require(`./../data/${props.season}/${item.replaceAll(" ", "-")}.png`)}></img>{item}</li>)}
                        styles={styles} textStyles={textStyles} handleInputChange={handleInputChange} />
                </div>
                <div style={{ marginLeft: "1%" }}>
                    <Dropdown placeholder={props.side} displayFlag={displaySide} li_elements={<><li className="dropdown--elem" onClick={(event) => handleSideChange(event)}>Away</li><li className="dropdown--elem" onClick={(event) => handleSideChange(event)}>Home</li></>}
                        styles={styles} textStyles={textStyles} handleInputChange={handleInputChange2} />
                </div>
            </div>
            <div id="chart">
                <PlotPassingNetwork data={data} team={props.team} win_width={props.win_width} win_height={props.win_height} color={props.color} season={props.season} />
            </div>
        </>
    )
}