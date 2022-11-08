import React, { useState, useEffect } from "react";
import "./../styles/landingpage.css"
import background_triangles from "./../data/background";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    var triangles = []
    for (var i = 0; i < background_triangles.length; i++) {
        triangles.push(<div style={{ position: "absolute", left: background_triangles[i][0] + "%", top: background_triangles[i][1] + "%", transform: `rotate(${background_triangles[i][2]}deg)` }} className="triangle"></div>)
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    let navigate = useNavigate();
    function routeChange(path) {
        navigate(path);
        window.scrollTo(0, 0);
    }

    return (
        <>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) :
                (

                    <div className="container">
                        {triangles}
                        <div className="container-flex">
                            <div className="text-container">
                                <div className="title-container">
                                    <h1 style={{ color: "white" }}>Liga Bwin</h1>
                                    <h1 style={{ color: "#FFB700" }}>Stats</h1>
                                </div>
                                <div className="title-container">
                                    <span style={{ color: "white" }}>The place to check all the stats of your favorite <span style={{ color: "#FFB700" }}>teams</span> and <span style={{ color: "#FFB700" }}>players</span>.</span>
                                </div>
                                <div className="button-container">
                                    <div style={{ border: "1px solid white" }} className="button-landing" onClick={() => routeChange("global")}>
                                        <img src={require("./../data/podium.png")}></img>
                                        <h5 style={{ color: "white" }}>Global</h5>
                                    </div>
                                    <div style={{ border: "1px solid #FFB700" }} className="button-landing" onClick={() => routeChange("team_stats")}>
                                        <img src={require("./../data/team_icon.png")}></img>
                                        <h5 style={{ color: "#FFB700" }}>Team Stats</h5>
                                    </div>
                                    <div style={{ border: "1px solid white" }} className="button-landing" onClick={() => routeChange("player_stats")}>
                                        <img style={{ height: "40px" }} src={require("./../data/player_icon.png")}></img>
                                        <h5 style={{ color: "white" }}>Player Stats</h5>
                                    </div>
                                    <div style={{ border: "1px solid #FFB700" }} className="button-landing" onClick={() => routeChange("match_momentum")}>
                                        <img style={{ height: "40px" }} src={require("./../data/momentum_icon.png")}></img>
                                        <h5 style={{ color: "#FFB700" }}>Match Momentum</h5>
                                    </div>
                                </div>

                            </div>
                            <div className="image-container">
                                <div className="image-grid">
                                    <div className="photo-container">
                                        <img src={require("./../data/landing_page_1.jpg")}></img>
                                    </div>
                                    <div style={{ border: "1px solid #FFB700" }} className="photo-container">
                                        <img src={require("./../data/landing_page_2.jpg")}></img>
                                    </div>
                                    <div style={{ border: "1px solid #FFB700" }} className="photo-container">
                                        <img src={require("./../data/landing_page_3.jpeg")}></img>
                                    </div>
                                    <div className="photo-container">
                                        <img src={require("./../data/landing_page_4.jpg")}></img>
                                    </div>
                                    <div className="photo-container">
                                        <img src={require("./../data/landing_page_5.png")}></img>
                                    </div>
                                    <div style={{ border: "1px solid #FFB700" }} className="photo-container">
                                        <img src={require("./../data/landing_page_6.jpg")}></img>
                                    </div>
                                    <div style={{ border: "1px solid #FFB700" }} className="photo-container">
                                        <img src={require("./../data/landing_page_7.jpg")}></img>
                                    </div>
                                    <div className="photo-container">
                                        <img src={require("./../data/landing_page_8.jpg")}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer>
                            <img src={require(`./../data/LigaBwin.png`)} ></img>
                            <h5 style={{ color: "white" }}>Last updated on: <span style={{ color: "#FFB700" }}>8/11/2022</span></h5>
                            <a href="https://twitter.com/positioniskeypt" className="services--functions"><i className="fab fa-twitter-square fa-lg"></i></a>
                            <a href="https://linkedin.com/in/tomás-sequeira" className="services--functions"><i className="fab fa-linkedin fa-lg"></i></a>
                        </footer>
                    </div>
                )
            }
        </>
    )
}