import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function QueryParamsExample() {
  return (
    <BrowserRouter>
      <h2>Accounts</h2>
      <ul>
        <li>
          <Link to="/account?name=netflix">Netflix</Link>
        </li>
        <li>
          <Link to="/account?name=zillow-group">Zillow Group</Link>
        </li>
        <li>
          <Link to="/account?name=yahoo">Yahoo</Link>
        </li>
        <li>
          <Link to="/account?name=modus-create">Modus Create</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          path="/account"
          component={({ location }) => <Account location={location} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

function Home() {
  return <h4>There is no name in the query string</h4>;
}

function Account({ location }) {
  //URLSearchParams 是web浏览器提供的一个解析请求参数的类
  const query = new URLSearchParams(location.search);
  return (
    <h4>
      The <code>name</code> in the query string is &quot;{query.get("name")}
      &quot;
    </h4>
  );
}
