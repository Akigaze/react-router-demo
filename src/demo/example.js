import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  withRouter
} from "react-router-dom";

const PALETTE = [
  { title: "Red", name: "red", color: "red" },
  { title: "Green", name: "green", color: "green" },
  { title: "Blue", name: "blue", color: "blue" },
  { title: "Orange", name: "orange", color: "orange" },
  { title: "Pink", name: "pink", color: "pink" }
];

function findByName(name) {
  return PALETTE.find(p => p.name === name);
}
export default function BackForwardExample() {
  return (
    <BrowserRouter>
      <div>
        <BackAndForward />
        <NavBar />
        <Switch>
          <Route exact path="/">
            <p>No color selected</p>
          </Route>
          <Route
            path="/:color"
            component={({ match }) => <Card {...match} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const BackAndForward = withRouter(({ history, location }) => {
  console.log(history);
  function back() {
    history.goBack();
  }
  function forward() {
    history.goForward();
  }
  function toHome() {
    if (location.pathname !== "/") {
      history.length = 0;
      history.push("/");
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <button onClick={back}>&lt;</button>
      <button onClick={toHome}>Home</button>
      <button onClick={forward}>&gt;</button>
    </div>
  );
});

function NavBar() {
  return (
    <ul>
      {PALETTE.map(p => {
        return (
          <li key={p.color}>
            <NavLink
              style={{ color: "inherit" }}
              activeStyle={{ color: p.color, fontStyle: "italic" }}
              to={p.name}
            >
              {p.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

function Card({ params }) {
  const p = findByName(params.color);
  if (!p) return <p>Color not found!</p>;
  return (
    <div style={{ backgroundColor: p.color, ...styles.card }}>
      {p.title}: {p.color}
    </div>
  );
}

const styles = {};
styles.card = {
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px",
  height: "500px",
  fontWeight: "bold"
};
