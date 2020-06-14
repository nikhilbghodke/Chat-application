import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
// import { render } from '@testing-library/react';
import currentUser from '../../store/reducers/currentUser';

class UserSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: ""
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = "login";
        this.props
            .onAuth(authType, this.state)
            .then(() => {
                console.log(currentUser.isAuthenticated)
                if(this.props.currentUser.isAuthenticated){
                    console.log(currentUser)
                    this.props.history.push("/rooms");
                }
            })
            .catch(() => {
                return;
            });
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="form">
                <p className="form-title">
                    Sign in to your account
            </p>
                <p className="form-subtitle">
                    Enter your email ID password
            </p>
            <form onSubmit={this.handleSubmit}>
                <input
                    id="email"
                    type="email"
                    placeholder="someone@domain.com"
                    name="email"
                    onChange={this.handleChange}
                />
                <input
                    id="password"
                    type="password"
                    placeholder="*******"
                    name="password"
                    onChange={this.handleChange}
                />
                <br />
                <button className="form-submit form-submit-new">
                    Let's go!
            </button>
            </form>
                <p className="form-bottom-text">
                    Don't have an account yet?
                <NavLink to="/authenticate/signup"> Create One!</NavLink>
                </p>
            </div>
        );
    }
}
export default withRouter(UserSignIn);