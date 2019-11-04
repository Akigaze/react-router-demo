import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function ParamsExample() {
  return (
    <BrowserRouter>
      <h2>Account</h2>
      <ul>
        <li>
          <Link to="/netflix">Netflix</Link>
        </li>
        <li>
          <Link to="/zillow-group">Zillow Group</Link>
        </li>
        <li>
          <Link to="/yahoo">Yahoo</Link>
        </li>
        <li>
          <Link to="/modus-create">Modus Create</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/:id" children={({ match }) => <Child {...match} />} />
      </Switch>
    </BrowserRouter>
  );
}

function Child({ params }) {
  return <h3>ID: {params.id}</h3>;
}
