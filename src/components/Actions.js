import React from "react";
import * as d3 from "d3";
import "./../styles/actions.css"
import PlotActions from "./TeamStats/PlotActions";


export default function Actions(props) {

    const [option, setOption] = React.useState("actions")

    function handleInputChange(option) {
        setOption(option)
        setAllCarries(false)
        setAllPasses(false)
        setUnsuccessfulPasses(false)
        setProgCarries(false)
        setProgPasses(false)
    }

    var backgroundActions, backgroundShots, backgroundDef = "transparent"

    if (option === "actions") backgroundActions = props.color
    else if (option === "shots") backgroundShots = props.color
    else if (option === "def_actions") backgroundDef = props.color

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        try {
            if (props.side == "Home") {
                d3.csv(require("./../data/" + props.season + "/" + props.team.replaceAll(" ", "-") + "/" + props.team + " - " + props.oppTeam + ".csv"))
                    .then((data) => {
                        setData(data)
                        return () => undefined;
                    })
            }
            else {
                d3.csv(require("./../data/" + props.season + "/" + props.team.replaceAll(" ", "-") + "/" + props.oppTeam + " - " + props.team + ".csv"))
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

    const [progPasses, setProgPasses] = React.useState(false)
    const [allPasses, setAllPasses] = React.useState(false)
    const [unsuccessfulPasses, setUnsuccessfulPasses] = React.useState(false)
    const [allCarries, setAllCarries] = React.useState(false)
    const [progCarries, setProgCarries] = React.useState(false)

    return (
        <>
            <div className="buttons-team">
                <h1 className="actions-header">Plot:</h1>
                <div style={{ border: '2px solid ' + props.color, backgroundColor: backgroundActions }} onClick={() => handleInputChange("actions")} id="actions" className="button-teamstats">Actions</div>
                <div style={{ border: '2px solid ' + props.color, backgroundColor: backgroundShots }} onClick={() => handleInputChange("shots")} id="shots" className="button-teamstats">Shots</div>
                <div style={{ border: '2px solid ' + props.color, backgroundColor: backgroundDef }} onClick={() => handleInputChange("def_actions")} id="def_actions" className="button-teamstats">Def. Actions</div>
            </div>
            <div id="actions_svg">
                <PlotActions data={data} team={props.team} win_width={props.win_width} win_height={props.win_height} color={props.color} option={option} progPasses={progPasses} allPasses={allPasses} unsuccessfulPasses={unsuccessfulPasses} allCarries={allCarries} progressiveCarries={progCarries} teamId={props.teamId} side={props.side} oppTeam={props.oppTeam} season={props.season} />
            </div>
            <div id="inputs" className="inputs">
                {option === "actions" &&
                    <>
                        <label htmlFor="unsuccessful_passes">Unsuccessful Passes</label>
                        <input
                            className="checkbox-flip"
                            type="checkbox"
                            id="unsuccessful_passes"
                            checked={unsuccessfulPasses}
                            onChange={() => setUnsuccessfulPasses((prev) => (!prev))}
                            name="unsuccessful_passes"
                        />
                        <label htmlFor="all_passes">All Passes</label>
                        <input
                            className="checkbox-flip"
                            type="checkbox"
                            id="all_passes"
                            checked={allPasses}
                            onChange={() => setAllPasses((prev) => (!prev))}
                            name="all_passes"
                        />
                        <label htmlFor="prog_passes">Progressive Passes</label>
                        <input
                            className="checkbox-flip"
                            type="checkbox"
                            id="prog_passes"
                            checked={progPasses}
                            onChange={() => setProgPasses((prev) => (!prev))}
                            name="prog_passes"
                            style={{ border: "1px solid " + props.color }}
                        />
                        <br></br>
                        <label htmlFor="all_carries">All Carries</label>
                        <input
                            className="checkbox-flip"
                            type="checkbox"
                            id="all_carries"
                            checked={allCarries}
                            onChange={() => setAllCarries((prev) => (!prev))}
                            name="all_carries"
                        />
                        <label htmlFor="prog_carries">Progressive Carries</label>
                        <input
                            className="checkbox-flip"
                            type="checkbox"
                            id="prog_carries"
                            checked={progCarries}
                            onChange={() => setProgCarries((prev) => (!prev))}
                            name="prog_carries"
                            style={{ border: "1px solid #48EDDB" }}
                        />
                    </>}
                {option === "def_actions" &&
                    <>
                        <label htmlFor="ball_recovery">Ball Recovery</label>
                        <div
                            className="def_action"
                            style={{ backgroundColor: "#42DC60" }}
                            id="ball_recovery"
                        />
                        <label htmlFor="interception">Interception</label>
                        <div
                            className="def_action"
                            style={{ backgroundColor: "red" }}
                            id="interception"
                        />
                        <label htmlFor="blocked_pass">Blocked Pass</label>
                        <div
                            className="def_action"
                            style={{ backgroundColor: "#42DCD5" }}
                            id="blocked_pass"
                        />
                        <br></br>
                        <label htmlFor="clearance">Clearance</label>
                        <div
                            className="def_action"
                            style={{ backgroundColor: "#D047D6" }}
                            id="clearance"
                        />
                        <label htmlFor="tackle">Tackle</label>
                        <div
                            className="def_action"
                            style={{ backgroundColor: "#E38A18" }}
                            id="tackle"
                        />
                    </>}
            </div>
        </>
    )
}