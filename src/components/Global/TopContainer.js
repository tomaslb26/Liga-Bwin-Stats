import React from "react";
import "./../../styles/global.css"

export default function TopContainer(props){
    return(
        <>
        {props.data.length !== 0 &&
            <div className="top-container">
                <div className="top-container-header">
                    <h3>{props.stat}</h3>
                    <h3>{String(props.data[0].stat).slice(0,4)}</h3>
                </div>
                <div className="top-container-first">
                    <div className="top-container-player">
                        <h6>{props.data[0].player}</h6>
                        <h6>Benfica</h6>
                    </div>
                    <img src={props.data[0].photo} />
                </div>
                {props.data.slice(1,5).map((player) => {
                    return(
                        <div className="top-container-line">
                        <h4>2</h4>
                        <span>{player.player}</span>
                        <img src={require(`./../../images/teams/${player.team}.png`)}></img>
                        <h4>{String(player.stat).slice(0,4)}</h4>
                    </div>
                    )
                })}
            </div>
            }
        </>
    )
}