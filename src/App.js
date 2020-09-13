import React from "react";
import { UnitTable } from "./UnitTable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import {LeaderTable} from "./LeaderTable";
import {PerkTable} from "./PerkTable";
import { Links } from "./Links";

const App = () => {
  return (
    <div className="container">
      <h1>Fallout: Wasteland Warfare</h1>
      <Router>
        <div>
          <Nav variant="tabs" className="mt-2 mb-2">
            <LinkContainer to="/">
              <NavItem>
                <NavLink href="/">
                  Links
                </NavLink>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/units">
              <NavItem>
                <NavLink href="/units">
                  Units
                </NavLink>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/leaders">
              <NavItem>
                <NavLink href="/leaders">
                  Leaders
                </NavLink>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/perks">
              <NavItem>
                <NavLink href="/perks">
                  Perks
                </NavLink>
              </NavItem>
            </LinkContainer>

          </Nav>

          <Switch>
            <Route path="/" exact={true}>
              <Links />
            </Route>
            <Route path="/units">
              <UnitTable />
            </Route>
            <Route path="/leaders">
              <LeaderTable />
            </Route>
            <Route path="/perks">
              <PerkTable />
            </Route>
          </Switch>
        </div>
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
