import React from "react";
import GetStats from "./../GetStats";
import teams_colors from "./../../data/teams_colors"
import PlotActions from "./PlotActions";
import * as d3 from "d3";
import "./../../styles/playerstats.css";
import DropdownCheckbox from "./DropdownCheckbox";


export default function PitchSection(props) {

    const [plotOption, setPlotOption] = React.useState("actions")
    function handlePlotChange(option) {
        setPlotOption(option)
    }

    const [dataPlot, setDataPlot] = React.useState([])

    React.useEffect(() => {
        try {
            if (plotOption == "actions") {
                d3.csv(require("./../../data/" + props.season + "/" + props.team.replaceAll(" ", '-') + "/events_" + props.team.replaceAll(" ", "-") + ".csv"))
                    .then((data) => {
                        setDataPlot(data)
                        return () => undefined;
                    })
            }
            else {
                d3.csv(require("./../../data/" + props.season + "/allShotsLigaBwin" + props.season.replaceAll("-", "") + ".csv"))
                    .then((data) => {
                        setDataPlot(data)
                        return () => undefined;
                    })
            }

        }
        catch (e) {
            console.log(e)
        }
    }, [props.team, props.season, plotOption]);

    const [options, setOptions] = React.useState({})

    function handleOptionChange(event) {
        const array = [...event.target.childNodes]
        const option = array[0].data
        setOptions((prev) => {
            return {
                ...prev,
                [option.toLowerCase().replaceAll(" ", "_")]: !options[option.toLowerCase().replaceAll(" ", "_")]
            }
        })
    }

    var backgroundActions, backgroundShots = "transparent"
    if (plotOption === "actions") backgroundActions = teams_colors.filter((item) => (item.team === props.team))[0]["color"]
    else if (plotOption === "shots") backgroundShots = teams_colors.filter((item) => (item.team === props.team))[0]["color"]

    function StatsDisplay() {

        const stats = ["Minutes", "Goals", "Assists"]
        return (
            <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === props.team))[0]["color"] }} className="stats-display">
                {stats.map((item) => {
                    return (
                        <div className="stat-short">
                            <span>{item}</span>
                            <span>{GetStats(props.data, props.playerId)[item]}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === props.team))[0]["color"] }} className="pitch-section">
            <div className="buttons">
                <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === props.team))[0]["color"], backgroundColor: backgroundActions, padding: "0.7% 1%" }} onClick={() => handlePlotChange("actions")} className="button">Actions</div>
                <div style={{ border: '2px solid ' + teams_colors.filter((item) => (item.team === props.team))[0]["color"], backgroundColor: backgroundShots, padding: "0.7% 1%" }} onClick={() => handlePlotChange("shots")} className="button">Shots</div>
            </div>
            <StatsDisplay />
            <div className="row-pitch">
                <div className="options">
                    <h2>Options:</h2>
                    {plotOption === "actions" && <>
                        <DropdownCheckbox color={teams_colors.filter((item) => (item.team === props.team))[0]["color"]} options={options}
                            setOptions={["All Passes", "Progressive Passes", "Unsuccessful Passes"]} title="Passing" handleOptionChange={handleOptionChange} />
                        <DropdownCheckbox color={teams_colors.filter((item) => (item.team === props.team))[0]["color"]} options={options}
                            setOptions={["All Carries", "Progressive Carries"]} title="Carrying" handleOptionChange={handleOptionChange} />
                        <DropdownCheckbox color={teams_colors.filter((item) => (item.team === props.team))[0]["color"]} options={options}
                            setOptions={["Ball Recovery", "Blocked Pass", "Clearance", "Interception", "Tackle"]} title="Defense" handleOptionChange={handleOptionChange} />
                        <DropdownCheckbox color={teams_colors.filter((item) => (item.team === props.team))[0]["color"]} options={options}
                            setOptions={["All Touches", "Heatmap"]} title="Misc" handleOptionChange={handleOptionChange} />
                    </>}
                    {plotOption === "shots" && <>
                        <DropdownCheckbox color={teams_colors.filter((item) => (item.team === props.team))[0]["color"]} options={options}
                            setOptions={["Goal", "Saved", "Miss", "Post"]} title="Attack" handleOptionChange={handleOptionChange} />
                    </>}
                </div>
                <div className="pitch">
                    <PlotActions color={teams_colors.filter((item) => (item.team === props.team))[0]["color"]} win_width={props.windowWidth} win_height={props.windowHeight} data={dataPlot} playerId={props.playerId} fotmobPlayerId={props.fotmobPlayerId}
                        options={options} />
                </div>
            </div>
        </div>
    )
}