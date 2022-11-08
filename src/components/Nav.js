import React from "react";
import "./../styles/nav.css"
import { HashLink as Link } from 'react-router-hash-link';
import DropdownHide from "./DropdownHide";
import Dropdown from "./Dropdown"

export default function Nav(props) {

    function handleInputChange(event) {
        props.setDisplayTeams((prev) => {
            return !prev
        })
        props.setDisplaySeasons(false)
    }

    function handleInputChange2(event) {
        props.setDisplaySeasons((prev) => {
            return !prev
        })

        props.setDisplayTeams(false)
    }

    const styles = {
        border: '2px solid ' + props.color,
    }

    const textStyles = {
        textShadow: "1px 0px 5px " + props.color + ", 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)",
    }

    const underline = {
        textDecoration: "underline " + props.color
    }


    return (
        <nav>
            <img src={require(`./../data/${props.season}/${props.team.replaceAll(" ", "-")}.png`)} ></img>
            <div style={{ marginLeft: "1%" }}>
                <Dropdown placeholder={props.team} displayFlag={props.displayTeams} li_elements={props.teams.map((item) => <li className="dropdown--elem" onClick={(event) => props.handleTeamChange(event)}><img src={require(`./../data/${props.season}/${item.replaceAll(" ", "-")}.png`)}></img>{item}</li>)}
                    styles={styles} textStyles={textStyles} handleInputChange={handleInputChange} />
            </div>
            <div style={{ marginLeft: "0.5%" }}>
                <Dropdown placeholder={props.season} displayFlag={props.displaySeasons} li_elements={<><li className="dropdown--elem" onClick={(event) => props.handleSeasonChange(event)}>21-22</li><li className="dropdown--elem" onClick={(event) => props.handleSeasonChange(event)}>22-23</li></>}
                    styles={styles} textStyles={textStyles} handleInputChange={handleInputChange2} />
            </div>
            <DropdownHide links={[{ "text": "Global", "link": "/global" }, { "text": "Player Stats", "link": "/player_stats" }, { "text": "Match Momentum", "link": "/match_momentum" }]} color={props.color} />
        </nav >
    )
}