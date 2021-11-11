import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Character from "./components/characters.js";
import CharacterList from "./components/character-list.js";
import Tactic from "./components/tactics.js";
import TacticList from "./components/tactic-list.js";
import Crisis from "./components/crisis.js";
import CrisisList from "./components/crisis-list.js";

function App() {

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/characters" className="navbar-brand">
          MCP list
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/characters"} className="nav-link">
              Characters
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/tactics"} className="nav-link">
              Tactics
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/crises"} className="nav-link">
              Crises
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="characters" element={<CharacterList/>} />
          <Route path="tactics" element={<TacticList/>} />
          <Route path="crises" element={<CrisisList/>} />
          {/* <Route 
            path="/tactics"

          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} />
            )}
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
