import React from "react";
import GetStat from "./../GetStat";
import GetRGB from "./../GetHex";
import "./../../styles/playerstats.css"

export default function StatContainer(props) {
    return (
        <div style={{ backgroundColor: GetRGB(props.color, GetStat(props.data, props.playerId, "percentile", props.stat)) }} className="stat">
            <h5>{props.title}</h5>
            <h1>{props.option === "percentile" ? String(Math.round(GetStat(props.data, props.playerId, props.option, props.stat))).substring(0, 2) : String(GetStat(props.data, props.playerId, props.option, props.stat)).substring(0, 4)}</h1>
        </div>
    )
}