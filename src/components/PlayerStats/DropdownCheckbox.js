import "./../../styles/dropdowncheckbox.css"
import React from "react"


export default function DropdownCheckbox(props) {

    const [clicked, setClicked] = React.useState(false)

    const carrotStyle = {
        transform: clicked ? "rotate(90deg)" : "rotate(0deg)",
        transition: "0.5s ease"
    }

    return (
        <div style={{ border: "2px solid " + props.color }} className="menu-dropdown-checkbox">
            <div className="dropdown-checkbox"
                style={{ backgroundColor: props.color + "b0" }}
                onClick={() => setClicked((prev) => !prev)}
            >
                <span>{props.title} <i style={carrotStyle} id={"icon"} className="fa fa-caret-down fa-lg" /></span>
            </div>
            {clicked &&
                <div className="dropdown-checkbox-submenu">
                    {props.setOptions.map((item) => {
                        return (
                            <li className="dropdown-checkbox-element"
                                onClick={props.handleOptionChange}
                            >
                                {item}
                                <div style={{ backgroundColor: props.color }} className="check">
                                    {props.options[item.toLowerCase().replaceAll(" ", "_")] && <i style={{ color: "white" }} className="fas fa-check" />}
                                    {!props.options[item.toLowerCase().replaceAll(" ", "_")] && <i style={{ color: "rgba(255, 255, 255, 0.3)" }} className="fas fa-check" />}
                                </div>
                            </li>
                        )
                    })}
                </div>
            }
        </div>
    )
}