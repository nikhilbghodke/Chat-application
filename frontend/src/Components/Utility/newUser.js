import React from 'react'
import { NavLink } from 'react-router-dom'

export default function newUser() {
    return (
        <div className="form">
            <p className="form-title">
                Create a new account
            </p>
            <p className="form-subtitle">
                Get started! It is as simple as it gets
            </p>
            <input 
                id="name"
                type="text"
                placeholder="Username"
                name="name"
            />
            <input 
                id="email"
                type="email"
                placeholder="Your Email"
                name="email"
            />
            <input 
                id="password"
                type="password"
                placeholder="Your Password"
                name="password"
            />
            <br />
            <button className="form-submit form-submit-new">
                Let's go!
            </button>
            <p className="form-bottom-text">
                Already have an account? 
                <NavLink to="/authenticate/signin"> Log In!</NavLink>
            </p>
        </div>
    );
}