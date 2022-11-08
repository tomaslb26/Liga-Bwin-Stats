import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "./../styles/dropdownhide.css"

export default function DropdownHide(props) {

    const links = props.links.map((item) => <Link className="nav-link" style={{ textDecoration: "underline " + props.color }} smooth to={item.link}>{item.text}</Link>)
    const li_links = props.links.map((item) => <li className="nav-hide"><Link className="nav-link" style={{ textDecoration: "none" }} smooth to={item.link}>{item.text}</Link></li>)

    return (
        <>
            <div className="links">
                {links}
            </div>
            <div className="dropdown-hide">
                <li className="sub-menu-parent-hide" tab-index="0">
                    <a ><i id="icon-hide" className="fa fa-caret-down fa-lg"></i></a>
                    <ul className={"sub-menu-hide"}>
                        {li_links}
                    </ul>
                </li>
            </div>
        </>
    )
}