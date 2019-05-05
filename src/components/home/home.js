import React from "react";
import star from "../../assets/img/star.svg";
import fork from "../../assets/img/repo-forked.svg";
import repo_icon from "../../assets/img/repo.svg";
import location from "../../assets/img/location.svg";
import link from "../../assets/img/link.svg";
import "./home.scss";
import axios from "axios";
import data from "../../github-language-colors";

function Organisations(props) {
    return (
        <ul>
            {props.org.map((org, i) => (
                <li key={i}>
                    <img
                        width="35"
                        height="35"
                        src={org.avatar_url}
                        alt="org"
                    />
                </li>
            ))}
        </ul>
    );
}

function Repos(props) {
    return (
        <ol id="pins">
            {props.repos.map((repo, i) => (
                <li key={i}>
                    <h3>
                        <img src={repo_icon} alt="repository" />
                        <a href={repo.url}>{repo.name}</a>
                    </h3>
                    <p id="description">{repo.description}</p>
                    <p>
                        <span id="language">
                            <span style={{ background: repo.language ? data[repo.language].color : 'black'}} />
                            {repo.language}
                        </span>
                        <span id="stars">
                            <span>
                                <img src={star} alt="star" />
                            </span>
                            {repo.stargazers_count}
                        </span>
                        <span id="members">
                            <span>
                                <img src={fork} alt="star" />
                            </span>
                            {repo.forks_count}
                        </span>
                    </p>
                </li>
            ))}
        </ol>
    );
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { person: [], organisations: [], repos: [] };
    }

    componentDidMount() {
        let username = this.props.location.pathname.split('/')[2];

        axios
            .get(`https://api.github.com/users/${username ? username : 'horlah'}`)
            .then(res => {
                console.log(res.data);
                const person = res.data;
                this.setState({ person });
            })
            .then(() => {
                axios
                    .get(`${this.state.person.organizations_url}`)
                    .then(res => {
                        console.log(res.data);
                        const organisations = res.data;
                        this.setState({ organisations });
                    });
                axios
                    .get(`${this.state.person.repos_url}?page=1&per_page=6`)
                    .then(res => {
                        console.log(res.data);
                        const repos = res.data;
                        this.setState({ repos });
                    });
            });

        // axios.get(`https://api.github.com/users/blinry`).then(res => {
        //     console.log(res.data);
        //     // const person = res.data;
        //     // this.setState({ person });
        // });
    }

    render() {
        return (
            <div>
                <aside>
                    <div id="display-picture">
                        <img src={this.state.person.avatar_url} alt="user" />
                    </div>
                    <div id="name">
                        <h1>{this.state.person.name}</h1>
                        <p>{this.state.person.login}</p>
                    </div>

                    <div id="block-user">
                        <p>Block or report user</p>
                    </div>

                    <div id="badge">
                        <li>
                            <img src={star} alt="star" />
                        </li>
                        <span>PRO</span>
                    </div>

                    <div id="profile-description">
                        <p>{this.state.person.bio}</p>
                        <li>
                            <img src={link} alt="location" />
                            <a href="/">{this.state.person.blog}</a>
                        </li>
                        <li>
                            <img src={location} alt="location" />
                            {this.state.person.location}
                        </li>
                    </div>

                    {this.state.organisations[0] &&
                        <div id="organisations">
                            <h2>Organizations</h2>
                            <Organisations org={this.state.organisations} />
                        </div>
                    }
                    {/* <div id="organisations">
                        <h2>Organizations</h2>
                        <Organisations org={this.state.organisations} />
                    </div> */}
                </aside>

                <main>
                    <div id="head">
                        <nav>
                            <li>
                                <a href={this.state.person.url}>Overview</a>
                            </li>
                            <li>
                                <a href={this.state.person.repos_url}>
                                    Repositories{" "}
                                    <span>{this.state.person.public_repos}</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    Projects <span>0</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    Stars <span>0</span>
                                </a>
                            </li>
                            <li>
                                <a href={this.state.person.followers_url}>
                                    Followers{" "}
                                    <span>{this.state.person.followers}</span>
                                </a>
                            </li>
                            <li>
                                <a href={this.state.person.following_url}>
                                    Following{" "}
                                    <span>{this.state.person.following}</span>
                                </a>
                            </li>
                        </nav>
                    </div>

                    <div id="pinned">
                        <h2>Pinned</h2>

                        <Repos repos={this.state.repos} />
                    </div>
                </main>
            </div>
        );
    }
}
