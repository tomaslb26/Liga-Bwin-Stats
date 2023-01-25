import React from "react";
import "./../../styles/global.css"
import teams_colors from "./../../data/teams_colors"


export default function Standings(props){

    return(
        <>
            {props.data.length !== 0 &&
            <table>
                <thead>
                    <tr>
                        {props.data.columns.map((item) => {
                            if(item === "Last 5") return 
                            return (<th>{item}</th>)
                         })
                        }
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((team) => {
                        return (
                            <tr>
                                {Object.entries(team).map((item) => {
                                        if(item[0] === "Last 5") return
                                        else if(item[0] === "Team") return (
                                            <td style={{backgroundColor: teams_colors.filter((color) => (color.team === item[1]))[0]["color"] + "45"}}>
                                                <img src={require("./../../images/teams/" + item[1].replaceAll(" ", "-") + ".png")}></img>
                                            </td>
                                        )
                                        else return(
                                            <td>{item[1]}</td>
                                        )
                                    }
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            }
        </>
    )
}