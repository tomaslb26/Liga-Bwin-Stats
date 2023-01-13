import React, { useState, useEffect } from "react";
import "./../styles/landingpage.css"
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function LandingPage() {

    useEffect(() => {
    }, []);

    let navigate = useNavigate();
    function routeChange(path) {
        navigate(path);
        window.scrollTo(0, 0);
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
                <div style = 
                {{
                    backgroundImage: 'url(' + require(`./../data/landing_page_1.jpg`) + ')',
                    opacity: 1,
                    zIndex: -1
                }} className="background"></div>
                <div style = {{
                    backgroundColor: "#2A2E30",
                    opacity: 0.95,
                    zIndex: -1
                }} className="background"></div>
            </main>
        </>
    )
}