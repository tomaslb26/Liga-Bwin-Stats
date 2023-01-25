import React from "react";
import "./../../styles/global.css"
import stats_conversion from "./../../data/stats_conversion";
import teams_colors from "./../../data/teams_colors";

export default function TopContainer(props){
    function inverse(obj){
        var retobj = {};
        for(var key in obj){
          retobj[obj[key]] = key;
        }
        return retobj;
    }

    const new_stats = inverse(stats_conversion)

    return(
        <>
        {props.data.length !== 0 &&
            <div className="top-container">
                <div className="top-container-header">
                    <h3>{new_stats[props.stat]}</h3>
                    <h3>{String(Number(props.data[0].stat)).slice(0,4)}</h3>
                </div>
                <div className="top-container-first">
                    <div className="top-container-player">
                        <h6>{props.data[0].name}</h6>
                        <h6>{props.data[0].team}</h6>
                    </div>
                    <img style = {{border: "2px solid " + teams_colors.filter((color) => (color.team === props.data[0].team.replaceAll("-", " ")))[0]["color"]}} 
                    src={props.data[0].photo} />
                </div>
                {props.data.slice(1,5).map((player, index) => {
                    return(
                        <div className="top-container-line">
                        <h4>{index + 2}</h4>
                        <span>{player.name}</span>
                        <img src={require(`./../../images/teams/${player.team}.png`)}></img>
                        <h4>{String(Number(player.stat)).slice(0,4)}</h4>
                    </div>
                    )
                })}
            </div>
            }
        </>
    )
}