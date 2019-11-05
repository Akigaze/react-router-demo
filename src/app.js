import React, { Component } from "react";

import "./style/app.css";
import CustomLinkExample from "./demo/example";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello React Router!</h1>
        <CustomLinkExample/>
      </div>
    );
  }
}
