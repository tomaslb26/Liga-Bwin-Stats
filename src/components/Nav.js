import React from "react";
import "./../styles/nav.css"
import { HashLink as Link } from 'react-router-hash-link';

export default function Nav(props) {

    return(
        <nav>
            <div className="nav-items">
                <Link className="nav-item" style={{ color: props.option === "home" ? props.color : "rgba(255, 255, 255, 0.7)",
                                                    textDecoration: "none" 
                                                    }} smooth to={"/"}>{"Home"}</Link>
                <Link className="nav-item" style={{ color: props.option === "classification" ? props.color : "rgba(255, 255, 255, 0.7)",
                                                    textDecoration: "none" 
                                                    }} smooth to={"/global"}>{"Standings"}</Link>
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

}