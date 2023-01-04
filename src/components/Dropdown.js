import "./../styles/dropdown.css"



export default function Dropdown(props) {

    const carrotStyle = {
        transform: props.displayFlag ? "rotate(180deg)" : "rotate(0deg)",
        transition: "0.5s ease"
    }

    const ulStyles = {
        visibility: props.displayFlag ? "visible" : "hidden",
        transform: "translateY(0%)",
        transitionDelay: "0.3s",
        opacity: props.displayFlag ? 1 : 0,
        transition: "opacity .5s ease-in-out, visibility 0s ease-in-out 0.3s",
    }
    console.log(props.placeholder)
    return (
        <div className="dropdown">
            <li className="sub-menu-parent" tab-index="0">
                <label>
                    <input type="checkbox" className="nav--checkbox" onChange={() => props.handleInputChange()}></input>
                    <span style={{ ...props.styles, ...props.textStyles }} className="placeholder">{props.placeholder} <i style={carrotStyle} id={"icon"} className="fa fa-caret-down fa-lg"></i> </span>
                </label>
                <ul style={ulStyles} className={"sub-menu"}>
                    {props.li_elements}
                </ul>
            </li>
        </div>
    )
}