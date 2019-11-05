import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

export default function AuthExample() {
  return (
    <BrowserRouter>
      <Route component={({ history }) => <AuthButton history={history} />} />
      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/public">
          <PublicPage />
        </Route>
        <Route
          path="/login"
          component={({ history }) => <LoginPage history={history} />}
        />
        <ProtectedRoute path="/protected">
          <ProtectedPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(fn) {
    this.isAuthenticated = true;
    setTimeout(fn, 200);
  },
  signout(fn) {
    this.isAuthenticated = false;
    setTimeout(fn, 200);
  }
};

function AuthButton({ history }) {
  console.log(history);

  return (
    <div>
      {fakeAuth.isAuthenticated ? (
        <p>
          Welcome!{" "}
          <button onClick={() => fakeAuth.signout(() => history.push("/"))} >Sign out</button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function ProtectedRoute({ children, ...reset }) {
  return (
    <Route {...reset}>
      {fakeAuth.isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  );
}

function LoginPage({ history }) {
  return (
    <div>
      <p>You must log in to view the page at /protected</p>
      <button
        onClick={() => fakeAuth.authenticate(() => history.push("/protected"))}
      >
        login in
      </button>
    </div>
  );
}
