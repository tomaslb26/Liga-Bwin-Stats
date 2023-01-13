import React from "react";
import GetPhoto from "../GetPhoto";
import "./../../styles/dropdownsection.css"

export default function Dropdown(props){

    const [expanded, setExpanded] = React.useState(false)


    return(
        <>
            <div className="dropdown-simple">
                <div onClick = {() => setExpanded((prev) => !prev)}
                     className="dropdown-label"
                     style={{border: "2px solid " + props.color}}>
                    {props.option == "team" && <img className = "dropdown-image" src={require(`./../../images/teams/${props.item.replaceAll(" ", "-")}.png`)}/>}
                    {props.option == "player" && <img className = "dropdown-image" src={GetPhoto(props.items, props.item)}/>}
                    <span>
                        {props.item.slice(0,10)} 
                    </span>
                    <span>
                        <i style = {{marginLeft: "0px"}} className="fa fa-caret-down fa-lg"/>
                    </span>
                </div>
                {
                    expanded && 
                    <div className="dropdown-expand">
                        {props.option == "team" && props.items.map((item) => {
                                return (<li onClick = {(event) => {
                                                    setExpanded(false)
                                                    props.handleChange(event)
                                                }}
                                            className="dropdown-item">
                                            <img src = {require(`./../../images/teams/${item.replaceAll(" ", "-")}.png`)} className="dropdown-item-image"></img>
                                            <span>{item}</span>
                                        </li>)
                        })}
                        {props.option == "season" && props.items.map((item) => {
                                return (<li onClick = {(event) => {
                                                    setExpanded(false)
                                                    props.handleChange(event)
                                                }}
                                            className="dropdown-item">
                                            <span>{item}</span>
                                        </li>)
                        })}
                        {props.option == "player" && props.items.map((item) => {
                                return (<li onClick = {(event) => {
                                                    setExpanded(false)
                                                    props.handleChange(event)
                                                }}
                                            className="dropdown-item">
                                            <img src = {item.photo} className="dropdown-item-image"></img>
                                            <span>{item.name}</span>
                                        </li>)
                        })}
                    </div>
                }
            </div>
        </>

    )
}