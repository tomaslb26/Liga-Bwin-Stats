import React from "react";
import "./../styles/global.css"
import Dropdown from "./Dropdown"
import Misc from "./Global/Misc";
import { useState } from "react";
import misc_stats from "./../data/misc_stats"
import * as d3 from "d3";
import Nav from "./Nav";
import Standings from "./Global/Standings";
import DropdownSection from "./DropdownSection";
import TopContainer from "./Global/TopContainer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination } from "swiper";
import GetTop5Players from "./GetTop5Players";

export default function Global(props) {

    const stats = [
            "prog_passes",
            "prog_carries",
            "defensive_actions", 
            "suc_take_ons",
            "total_passes",
            "suc_passes",
            "take_ons", 
            "xt",
            "final_third_entries", 
            "final_third_passes",
            "penalty_box_entries",
            "penalty_box_passes", 
            "key_passes", 
            "Goals",
            "Assists",
            "Shots",
            "xG",
            "xGOT",
            "xA",
            "ChancesCreated"
             ]

    const styles = {
        border: '2px solid #ffb404',
    }

    const textStyles = {
        textShadow: "1px 0px 5px #ffb404, 2px 7px 5px rgba(0, 0, 0, 0.3), 0px -4px 10px rgba(0, 0, 0, 0.3)",
    }

    const [season, setSeason] = useState("22-23")

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight)
    const setWindowDimensions = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }

    React.useEffect(() => {
        window.addEventListener('resize', setWindowDimensions);
        return () => {
            window.removeEventListener('resize', setWindowDimensions)
        }
    }, [])


    function handleSeasonChange(event) {
        let season = ""
        if(event.target.tagName.toLowerCase() === "li") season = event.target.getElementsByTagName('span')[0].innerHTML
        else if(event.target.tagName.toLowerCase() === "span") season = event.target.innerHTML
        else season = event.target.src.split("media/")[1].split(".")[0].replaceAll("-", " ")

        setSeason(season)
    }

    const [dataCalcs, setDataCalcs] = React.useState([])
    const [dataClassification, setDataClassification] = React.useState([])
    const [dataMisc, setDataMisc] = React.useState([])

    React.useEffect(() => {
        d3.csv(require("./../data/" + season + "/classification.csv"))
            .then((data) => {
                setDataClassification(data)
                return () => undefined;
            })
        d3.csv(require("./../data/" + season + "/calcs.csv"))
        .then((data) => {
            setDataCalcs(data)
            return () => undefined;
        })
        d3.csv(require("./../data/" + season + "/misc.csv"))
        .then((data) => {
            setDataMisc(data)
            return () => undefined;
        })
    }, [season]);

    const [displayStat, setDisplayStat] = React.useState(false)
    const [stat, setStat] = React.useState(misc_stats[0])

    function handleInputChange2() {
        setDisplayStat((prev) => (!prev))
    }

    function handleStatChange(event) {
        setStat(event.target.innerHTML)
        setDisplayStat(false)
    }

    return (
        <>
            <Nav option = "classification" color = {"#FFB700"} />
            <DropdownSection season = {season} handleSeasonChange = {handleSeasonChange}
                            options = {{season: true, teams: false, players : false}}
                            color={"#FFB700"}
                            />
            <main className="global">
                <Standings data={dataClassification} />
                <Swiper
                    style={{
                        "--swiper-pagination-color": "#ffb404",
                    }}
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                      }}
                    modules={[Pagination]}
                    className="mySwiper"
                    >
                    {stats.map((item) => <SwiperSlide><TopContainer stat = {item} data = {GetTop5Players(dataCalcs, item)} /></SwiperSlide>)}
                </Swiper>
                <div className="misc">
                        <div style={{ marginLeft: "2%" }}>
                            <Dropdown placeholder={stat} displayFlag={displayStat} li_elements={misc_stats.map((item) => <li className="dropdown--elem" onClick={(event) => handleStatChange(event)}>{item}</li>)} styles={styles} textStyles={textStyles} handleInputChange={handleInputChange2} />
                        </div>
                        <Misc data={dataMisc} win_width={windowWidth} win_height={windowHeight} season={season} stat={stat} />
                    </div>
            </main>
        </>
    )

    /*
    return (
        <>
            <Nav option = "classification" color = {"#FFB700"} />
            <DropdownSection season = {season} handleSeasonChange = {handleSeasonChange}
                            options = {{season: true, teams: false, players : false}}
                            color={"#FFB700"}
                            />
            <main className="global">
                <div className="global-grid">
                    <div className="classification">
                        <Classification data={dataClassification} win_width={windowWidth} win_height={windowHeight} season={season} />
                    </div>
                    <div className="misc">
                        <div style={{ marginLeft: "2%" }}>
                            <Dropdown placeholder={stat} displayFlag={displayStat} li_elements={misc_stats.map((item) => <li className="dropdown--elem" onClick={(event) => handleStatChange(event)}>{item}</li>)} styles={styles} textStyles={textStyles} handleInputChange={handleInputChange2} />
                        </div>
                        <Misc data={dataMisc} win_width={windowWidth} win_height={windowHeight} season={season} stat={stat} />
                    </div>
                </div>
            </main>
        </>
    )*/
}