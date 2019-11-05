import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

export default function NoMatchExample() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/old-match">Old Match, to be redirected</Link>
        </li>
        <li>
          <Link to="/will-match">Will Match</Link>
        </li>
        <li>
          <Link to="/will-not-match">Will Not Match</Link>
        </li>
        <li>
          <Link to="/also/will/not/match">Also Will Not Match</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/old-match">
          <Redirect to="/will-match" />
        </Route>
        <Route path="/will-match">
          <WillMatch />
        </Route>
        <Route path="*" component={({ match }) => <NotMatch {...match} />} />
      </Switch>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function WillMatch() {
  return <h2>Matched!</h2>;
}

function NotMatch({ url }) {
  return (
    <div>
      <h2 style={{ display: "inline-block" }}>No match for</h2>{" "}
      <code>{url}</code>
    </div>
  );
}
