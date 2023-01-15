import React, { useState, useEffect } from "react";
import "./../styles/landingpage.css"
import { get_first_place } from "./LandingPage/GetStats";
import Nav from "./Nav";
import * as d3 from "d3";

export default function LandingPage() {

    const [currentPosition, setCurrentPosition] = React.useState(1)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPosition((prev) => {
                if (prev < 8) return prev + 1
                else return 1
            })
        }, 7000);
        d3.select('.background-second')
        .style("background-image", 'url(' + require(`./../data/landing_page_${currentPosition}.jpg`) + ')')
        .style("opacity", 0.1)
        .transition().duration(1000)
        .style("opacity", 1)
        return () => clearInterval(interval);
    }, [currentPosition]);

    /*let navigate = useNavigate();
    function routeChange(path) {
        navigate(path);
        window.scrollTo(0, 0);
    }*/

    function Card(props){
        let first_place = get_first_place()
        console.log(first_place)
        return(
            <div className="block">
                <h2 className="block-content">{first_place}</h2>
            </div>
        )
    }


    return (
        <>
            <main className="landing-page">
                <Nav option = {"home"} color = "#FFB700" />
                <div className = "heading-container" style={{
                    backgroundImage: 'url(' + require(`./../images/landing_page_meteor.png`) + ')'
                }}>
                    <h2 className="first-header">
                        data-driven success on the pitch. <br/>
                        elevate your game with stats.
                    </h2>
                    <h1 className="second-header">
                        for the fans.
                    </h1>
                </div>
                <div className="cards-container">
                </div>
                <div style = 
                {{
                    opacity: 1,
                    zIndex: -2
                }} className="background-second"></div>
                <div style = {{
                    backgroundColor: "#2A2E30",
                    opacity: 0.95,
                    zIndex: -2
                }} className="background"></div>
            </main>
        </>
    )
}