import React from "react";
import "./App.scss";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Search from "./components/search/search";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />

                <br />
                <br />

                <div id="main">
                    <Route path="/" exact component={Home} />
                    <Route path="/user/:user" exact component={Home} />
                    <Route path="/search" component={Search} />
                </div>
            </div>
        </Router>
    );
}

export default App;
