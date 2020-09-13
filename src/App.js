import React from "react";
import { UnitTable } from "./UnitTable";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { LeaderTable } from "./LeaderTable";
import { PerkTable } from "./PerkTable";
import { Links } from "./Links";
import { TerrainTable } from "./TerrainTable";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "react-bootstrap/NavLink";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Navbar.Brand href="/">Fallout: Wasteland Warfare</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink href="/">Links</NavLink>
              <NavLink href="/units">Units</NavLink>
              <NavLink href="/leaders">Leaders</NavLink>
              <NavLink href="/perks">Perks</NavLink>
              <NavLink href="/terrain">Searchables &amp; Terrain</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main role="main" className="container">
          <Switch>
            <Route path="/" exact={true}>
              <div>
                <h1>Links</h1>
                <Links />
              </div>
            </Route>
            <Route path="/units">
              <div>
                <h1>Units</h1>
                <UnitTable />
              </div>
            </Route>
            <Route path="/terrain">
              <div>
                <h1>Searchables &amp; Terrain</h1>
                <TerrainTable />
              </div>
            </Route>
            <Route path="/leaders">
              <div>
                <h1>Leaders</h1>
                <LeaderTable />
              </div>
            </Route>
            <Route path="/perks">
              <div>
                <h1>Perks</h1>
                <PerkTable />
              </div>
            </Route>
          </Switch>
        </main>
      </Router>

      <h6 className="text-center">
        Source Code:{" "}
        <a href="https://github.com/spilth/foww">
          https://github.com/spilth/foww
        </a>
      </h6>
    </div>
  );
};

export default App;
