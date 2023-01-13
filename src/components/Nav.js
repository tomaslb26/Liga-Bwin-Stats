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

    return(
        <nav>
            <div className="nav-items">
                <Link className="nav-item" style={{ color: props.option === "home" ? props.color : "rgba(255, 255, 255, 0.7)",
                                                    textDecoration: "none" 
                                                    }} smooth to={"/"}>{"Home"}</Link>
                <Link className="nav-item" style={{ color: props.option === "classification" ? props.color : "rgba(255, 255, 255, 0.7)",
                                                    textDecoration: "none" 
                                                    }} smooth to={"/global"}>{"Classification"}</Link>
                <Link className="nav-item" style={{ color: props.option === "match momentum" ? props.color : "rgba(255, 255, 255, 0.7)",
                                                    textDecoration: "none" 
                                                    }} smooth to={"/match_momentum"}>{"Match Momentum"}</Link>
                <Link className="nav-item" style={{ color: props.option === "player_stats" ? props.color : "rgba(255, 255, 255, 0.7)",
                                                    textDecoration: "none" 
                                                    }} smooth to={"/player_stats"}>{"Player Stats"}</Link>
                <Link className="nav-item" style={{ color: props.option === "team_stats" ? props.color : "rgba(255, 255, 255, 0.7)",
                                                    textDecoration: "none" 
                                                    }} smooth to={"/team_stats"}>{"Team Stats"}</Link>
            </div>
        </nav>
    )


    /*
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
    */
}