import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  matchPath
} from "react-router-dom";

export default function CustomLinkExample() {
  return (
    <BrowserRouter>
      <Route
        path="/"
        component={({ location }) => (
          <div>
            <OldSchoolMenuLink exact location={location} label="Home" to="/" />
            <OldSchoolMenuLink location={location} label="About" to="/about" />
          </div>
        )}
      />
      <hr />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function OldSchoolMenuLink({ location, label, exact, to, ...reset }) {
  const match = matchPath(location.pathname, { path: to, exact });
  return (
    <div>
      {match && "> "}
      <Link to={to} {...reset}>
        {label}
      </Link>
    </div>
  );
}
