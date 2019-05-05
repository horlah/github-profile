import React from "react";
import "./search.scss";
import location from "../../assets/img/location.svg";
import axios from "axios";
import queryString from 'query-string';
import { Link } from "react-router-dom";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], searchValue: '', users_count: '' };
    }

    componentDidMount() {
        const searchValue = queryString.parse(this.props.location.search).q;
        this.setState({ searchValue });

        if (!searchValue) {
            this.props.history.push('/');
        } else {

        }

        axios.get(`https://api.github.com/search/users?q=${searchValue}&per_page=10`)
            .then(res => {
                const users = res.data.items;
                const users_count = res.data.total_count;
                this.setState({ users, users_count });
            });
    }

    paginate(searchValue, navigator) {
        axios.get(`https://api.github.com/search/users?q=${searchValue}&per_page=10&rel='${navigator}'`)
            .then(res => {
                const users = res.data.items;
                const users_count = res.data.total_count;
                this.setState({ users, users_count });
            });
    }

    render() {
        return (
            <div id="searchPage">
                <main>
                    <div id="head">
                        <h1>{this.state.users_count} users</h1>
                    </div>

                    <div id="users">
                        {this.state.users.map((user, i) => (
                            <div className="user">
                                <div className="content">
                                    <Link to={`/user/${user.login}`}>
                                        <img src={user.avatar_url} width="48" height="48" alt="user" />
                                    </Link>
                                    <div>
                                        <h3>
                                            <Link to={`/user/${user.login}`}>{user.login}</Link>
                                        </h3>
                                        <p>Description</p>
                                        <p>
                                            <img src={location} alt="location" />
                                            LA
                                        </p>
                                    </div>
                                </div>
                                <div className="button">
                                    <Link to={`/user/${user.login}`}>Follow</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <div id="pagination">
                    <ul>
                        <button onClick={(e) => this.paginate(this.state.searchValue, 'prev')}>Previous</button>
                        <button onClick={(e) => this.paginate(this.state.searchValue, 'next')}>Next</button>
                    </ul>
                </div>
            </div>
        );
    }
}
