import React from "react";
import * as d3 from "d3";
import "./../styles/actions.css"
import PlotActions from "./TeamStats/PlotActions";


export default function Actions(props) {

    const [option, setOption] = React.useState("actions")

    function handleInputChange(option) {
        setOption(option)
        setOptions({})
    }

    var backgroundActions, backgroundShots, backgroundDef = "transparent"

    if (option === "actions") backgroundActions = props.color
    else if (option === "shots") backgroundShots = props.color
    else if (option === "def_actions") backgroundDef = props.color

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        try {
            if (props.side === "Home") {
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

    const [options, setOptions] = React.useState({})

    function handleOptionChange(event) {
        const array = [...event.target.childNodes]
        const option_actions = array[0].data
        setOptions((prev) => {
            return {
                ...prev,
                [option_actions.toLowerCase().replaceAll(" ", "_")]: !options[option_actions.toLowerCase().replaceAll(" ", "_")]
            }
        })
    }

    function ActionsInputs() {
        const input_options = ["All Carries", "All Passes", "Progressive Carries", "Progressive Passes", "Unsuccessful Passes"]
        return (
            <>
                {
                    input_options.map((item) => {
                        return <div onClick={handleOptionChange} style={{ border: '2px solid ' + props.color, backgroundColor: options[item.toLowerCase().replaceAll(" ", "_")] ? props.color + "53" : "#2a2e30" }} className="actions-option">{item}</div>
                    })
                }
            </>
        )
    }

    function DefActions() {
        const input_options = [["Ball Recovery", "#42DC60"], ["Interception", "red"], ["Blocked Pass", "#42DCD5"], ["Clearance", "#D047D6"], ["Tackle", "#E38A18"]]
        return (
            <>
                {
                    input_options.map((item) => {
                        return <div style={{ backgroundColor: item[1] }} className="actions-option">{item[0]}</div>
                    })
                }
            </>
        )
    }

    return (
        <>
            <div className="buttons-team">
                <h1 className="actions-header">Plot:</h1>
                <div style={{ border: '2px solid ' + props.color, backgroundColor: backgroundActions }} onClick={() => handleInputChange("actions")} id="actions" className="button-teamstats">Actions</div>
                <div style={{ border: '2px solid ' + props.color, backgroundColor: backgroundShots }} onClick={() => handleInputChange("shots")} id="shots" className="button-teamstats">Shots</div>
                <div style={{ border: '2px solid ' + props.color, backgroundColor: backgroundDef }} onClick={() => handleInputChange("def_actions")} id="def_actions" className="button-teamstats">Def. Actions</div>
            </div>
            <div id="actions_svg">
                <PlotActions data={data} team={props.team} win_width={props.win_width} win_height={props.win_height} color={props.color} option={option} options={options} teamId={props.teamId} side={props.side} oppTeam={props.oppTeam} season={props.season} />
            </div>
            <div id="inputs" className="inputs">
                {option === "actions" &&
                    <>
                        <ActionsInputs />
                    </>}
                {option === "def_actions" &&
                    <>
                        <DefActions />
                    </>}
            </div>
        </>
    )
}