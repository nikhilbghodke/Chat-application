import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

 function UserSignIn(props) {
    return (
        <div className="form">
            <p className="form-title">
                Sign in to your account
            </p>
            <p className="form-subtitle">
                Enter your email ID password
            </p>
            <input 
                id="email"
                type="email"
                placeholder="someone@domain.com"
                name="email"
            />
            <input 
                id="password"
                type="password"
                placeholder="*******"
                name="password"
            />
            <br />
            <button type="button" className="form-submit" onClick={() => props.history.push("/rooms")} >
                Let's go!
            </button>
            <p className="form-bottom-text">
                Don't have an account yet? 
                <NavLink to="/authenticate/signup"> Create One!</NavLink>
            </p>
        </div>
    );
}
export default withRouter(UserSignIn);