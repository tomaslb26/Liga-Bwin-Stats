import React from "react";
import Dropdown from "./DropdownSection/Dropdown";
import "./../styles/dropdownsection.css"

export default function DropdownSection(props){


    return(
        <>
            <div className="dropdown-section">
                {props.options.season && 
                    <div className="dropdown-box">
                        <h2>Season</h2>
                        <Dropdown color = {props.color} items = {["21-22", "22-23"]} item = {props.season} 
                        handleChange = {props.handleSeasonChange}  season = {props.season} 
                        option = "season" />
                    </div>
                }
                {props.options.teams && 
                <div className="dropdown-box">
                    <h2>Team</h2>
                    <Dropdown color = {props.color} items = {props.teams} item = {props.team} handleChange = {props.handleTeamChange}
                    option = "team"  />
                </div>}
                {props.options.players && 
                <div className="dropdown-box">
                    <h2>Player</h2>
                    <Dropdown color = {props.color} items = {props.players} item = {props.player} handleChange = {props.handlePlayerChange}
                    option = "player"  />
                </div>}
            </div>
        </>
    )
}