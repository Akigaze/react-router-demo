import React, {Component} from "react";

import "./style/app.css";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <h1 className="hurray">Hello React!</h1>
            </div>
        )
    }
}
