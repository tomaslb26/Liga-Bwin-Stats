import React from "react";
import TeamStatsDisplay from "./components/TeamStatsDisplay";
import Global from "./components/Global"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchMomentum from "./components/MatchMomentum";
import PlayerStats from "./components/PlayerStats";
import LandingPage from "./components/LandingPage";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
              <LandingPage />
            } />
            <Route path="team_stats" element={<TeamStatsDisplay />} />
            <Route path="match_momentum" element={<MatchMomentum />} />
            <Route path="player_stats" element={<PlayerStats />} />
            <Route path="global" element={<Global />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
