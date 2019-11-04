import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function NestingExample() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          path="/topics"
          component={({ match }) => <Topics {...match} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

function Topics({ url, path }) {
  console.log("Topics: ", url, path);
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-vs-state`}>Props v. State</Link>
        </li>
      </ul>
      <Switch>
        <Route
          path={`${path}/:topicId`}
          children={({ match }) => <Topic {...match} />}
        />
        <Route path={`${path}`}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return <h3>Home</h3>;
}

function Topic({ params }) {
  console.log("Topic params:", params);
  return <h3>{params.topicId}</h3>;
}
