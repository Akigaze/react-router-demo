import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <code>home!</code>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    sidebar: () => <code>bubblegum!</code>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    sidebar: () => <code>shoelaces!</code>,
    main: () => <h2>Shoelaces</h2>
  }
];

export default function SidebarExample() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <div
          style={{
            maxWidth: "250px",
            minWidth: "100px",
            width: "40%",
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            padding: "10px"
          }}
        >
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bubblegum">Bubblegum</Link>
            </li>
            <li>
              <Link to="/shoelaces">Shoelaces</Link>
            </li>
          </ul>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route key={index} path={route.path} exact={route.exact}>
                  <route.sidebar />
                </Route>
              );
            })}
          </Switch>
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route key={index} path={route.path} exact={route.exact}>
                  <route.main />
                </Route>
              );
            })}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
