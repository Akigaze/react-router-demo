import React, { Component } from "react";

import "./style/app.css";
import RecursiveExample from "./demo/example";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello React Router!</h1>
        <RecursiveExample/>
      </div>
    );
  }
}
