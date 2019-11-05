import React from "react";
import { BrowserRouter, Switch, Route, Link, Prompt } from "react-router-dom";

export default function PreventingTransitionsExample() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Form</Link>
        </li>
        <li>
          <Link to="/one">One</Link>
        </li>
        <li>
          <Link to="/two">Two</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <BlockingForm />
        </Route>
        <Route path="/one">
          <OnePage />
        </Route>
        <Route path="/two">
          <TwoPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function OnePage() {
  return <h2>One</h2>;
}

function TwoPage() {
  return <h2>Two</h2>;
}

class BlockingForm extends React.Component {
  state = {
    isBlocking: false
  };

  setBlocking = blocking => {
    this.setState({ isBlocking: blocking });
  };

  render() {
    const { isBlocking } = this.state;
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          event.target.reset();
          this.setBlocking(false);
        }}
      >
        <Prompt
          when={isBlocking}
          message={location => {
            return `Are you sure you want to go to ${location.pathname}`;
          }}
        />
        <p>
          Blocking?{" "}
          {isBlocking ? "Yes, click a link or the back button" : "Nope"}
        </p>
        <p>
          <input
            size="50"
            placeholder="type something to block transitions"
            onChange={event => this.setBlocking(event.target.value.length > 0)}
          />
        </p>
        <p>
          <button>Submit to stop blocking</button>
        </p>
      </form>
    );
  }
}
