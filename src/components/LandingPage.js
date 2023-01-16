import React, { useState, useEffect } from "react";
import "./../styles/landingpage.css"
import { get_first_place } from "./LandingPage/GetStats";
import Nav from "./Nav";
import * as d3 from "d3";
import { useNavigate } from "react-router";

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

    React.useEffect(() => {
        const faceArray = ["1", "2", "3", "4","5","6","7","8"]
        faceArray.forEach((face) => {
            const img = new Image();
            img.src = require(`./../data/landing_page_${face}.jpg`);
        });
    }, []);

    let navigate = useNavigate();

    function Card(props){
        return(
            <div onClick = {() => navigate(props.redirect)} className="card glow">
                <img src={require("./../images/" + props.photo + ".jpg")} />
                <h2>{props.header}</h2>
                <div className="card-bullets">
                    {props.bullets.map((item) => <li>{item}</li>)}
                </div>
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
                    <Card redirect = "global" photo = "classification" header = "Classification" bullets = {["classification table", "general stats", "attendance"]} />
                    <Card redirect = "match_momentum" photo = "match_momentum" header = "match momentum" bullets = {["threat created", "match dominance", "all games"]} />
                    <Card redirect = "player_stats" photo = "player_stats" header = "player stats" bullets = {["rank amongst the league", "plot passes, shots and others", "and more"]} />
                    <Card redirect = "team_stats" photo = "team_stats" header = "team stats" bullets = {["Passing network", "xG Performance", "and more"]} />
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