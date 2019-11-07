import React from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

const PEEPS = [
  { id: 0, name: "Michelle", friends: [1, 2, 3] },
  { id: 1, name: "Sean", friends: [0, 3] },
  { id: 2, name: "Kim", friends: [0, 1, 3] },
  { id: 3, name: "David", friends: [1, 2] }
];

function find(id) {
  return PEEPS.find(peep => peep.id === id);
}

export default function RecursiveExample() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/0" />
        </Route>
        <Route path="/:id" component={({ match }) => <Person {...match} />} />
      </Switch>
    </BrowserRouter>
  );
}

function Person({ url, params }) {
  const person = find(parseInt(params.id));
  if (!person) return null;
  return (
    <div>
      <h2>{`${person.name}'s Friends`}</h2>
      <ul>
        {person.friends.map(id => {
          return (
            <li key={id}>
              <Link to={`${url}/${id}`}>{find(id).name}</Link>
            </li>
          );
        })}
      </ul>
      <Switch>
        <Route
          path={`${url}/:id`}
          component={({ match }) => <Person {...match} />}
        />
      </Switch>
    </div>
  );
}
