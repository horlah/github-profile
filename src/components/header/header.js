import React from "react";
import logo from "../../assets/img/logo.png";
import "./header.scss";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchValue: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ searchValue: event.target.value });
    }

    handleSubmit(e) {
        e.persist();
        e.preventDefault();
        window.location = `/search?q=${this.state.searchValue}`;
    }

    render() {
        return (
            <header className="App-header">
                <div>
                    <div>
                        <div id="logo">
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <nav>
                            <ul>
                                <li><a href="#">Why GitHub?</a></li>
                                <li><a href="https://github.com/enterprise">Enterprise</a></li>
                                <li><a href="#">Explore</a></li>
                                <li><a href="https://github.com/marketplace">Marketplace</a></li>
                                <li><a href="#">Pricing</a></li>
                            </ul>
                        </nav>
                    </div>

                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                value={this.state.searchValue}
                                placeholder="Search"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </form>
                        <li>
                            <a href="https://github.com/login?return_to=%2Fsearch%3Fq%3Dionic%26type%3DUsers">Sign in</a>
                        </li>
                        <li id="signup">
                            <a href="https://github.com/join?source=header">Sign up</a>
                        </li>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
