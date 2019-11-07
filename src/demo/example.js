import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const routes = [
  { path: "/sandwiches", component: Sandwiches },
  {
    path: "/tacos",
    component: Tacos,
    routes: [
      { path: "/tacos/bus", component: Bus },
      { path: "/tacos/cart", component: Cart }
    ]
  }
];

export default function RouteConfigExample() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/tacos">Tacos</Link>
        </li>
        <li>
          <Link to="/sandwiches">Sandwiches</Link>
        </li>
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
  console.log(route);
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
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
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
