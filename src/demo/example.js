import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const routes = [
  { path: "/sandwiches", component: Sandwiches, link: "Sandwiches" },
  {
    path: "/tacos",
    component: Tacos,
    link: "Tacos",
    routes: [
      { path: "/tacos/bus", component: Bus, link: "Bus" },
      { path: "/tacos/cart", component: Cart, link: "Cart" }
    ]
  }
];

export default function RouteConfigExample() {
  return (
    <BrowserRouter>
      <ul>
        {routes.map((route, index) => {
          return (
            <li key={index}>
              <Link to={route.path}>{route.link}</Link>
            </li>
          );
        })}
      </ul>
      <Switch>
        {routes.map((route, index) => {
          return <RouteWithSubRoute key={index} {...route} />;
        })}
      </Switch>
    </BrowserRouter>
  );
}

function RouteWithSubRoute(route) {
  return (
    <Route
      path={route.path}
      component={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

function Sandwiches() {
  return <h2>Sandwiches</h2>;
}

function Tacos(props) {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        {props.routes.map((route, index) => {
          return (
            <li key={index}>
              <Link to={route.path}>{route.link}</Link>
            </li>
          );
        })}
      </ul>
      <div>
        {props.routes.map((route, index) => {
          return <RouteWithSubRoute key={index} {...route} />;
        })}
      </div>
    </div>
  );
}

function Bus() {
  return <h2>Bus</h2>;
}

function Cart() {
  return <h2>Cart</h2>;
}
