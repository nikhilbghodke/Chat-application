import React from 'react'
import { connect } from 'react-redux';
import jwtDecode from "jwt-decode";
import LoadingOverlay from 'react-loading-overlay';

import { setAuthorizationToken, getCurrentUser, getAllRoomsOfUser, getAllPublicRooms } from '../store/actions/auth';
import { initRoom } from '../store/actions/chatActions'

import Icon from '../Assests/Images/icon-logo-2.png'
import Profile from '../Assests/Images/acc.png'
import searchIcon from "../Assests/Images/search-icon.png";

import './RoomPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { setTokenHeader } from '../services/api';
import { Link } from 'react-router-dom';

import { logout } from '../store/actions/auth'

class RoomPage extends React.Component {

    componentDidMount() {
        if (!localStorage.jwtToken) {
            this.props.history.push("/authenticate/signin")
        }
        // Token exists.
        // Add this token to api header
        setTokenHeader(localStorage.jwtToken)

        if (!this.props.isAuthenticated)
            this.props.getCurrentUser();

        // Get all rooms of this user
        this.props.getAllRoomsOfUser();

        console.log("GETTING PUBLIC ROOMS")
        // Get all the public rooms
        this.props.getAllPublicRooms();

    }

    roomList = () => {
        if (this.props.allRooms) {
            console.log(this.props.allRooms)
            return this.props.allRooms.map((roomObject, index) => {
                console.log(roomObject)
                return <button
                    type="button"
                    className="list-group-item list-group-item-action rounded border border-dark"
                    onClick={() => {
                        this.props.initRoom(roomObject.title)
                        this.props.history.push("/chat")
                    }
                    }
                >
                    {roomObject.title}
                </button>
            })
        }
    }

    logout = e => {
        e.preventDefault();
        this.props.logout();
    };

    render() {
        console.log(this.props)
        return (
            <LoadingOverlay
                active={!this.props.isRoomLoaded}
                spinner
                text="Retrieving the rooms that you are in..." >
                <ul className="nav">
                    <li className="nav-item">
                        <div className="icon-section-auth">
                            <img src={Icon} alt="icon" width="5px" className="icon" onClick={() => alert("ICON")} />
                        </div>
                    </li>
                    <li className="navbar-brand">
                        <Link to="/authenticate/signin" onCLick={this.logout}>Logout</Link>
                    </li>
                </ul>

                <div className="roompage">
                    <div className="verticalLine">
                        <div className="form2">

                            <div className="form">
                                <p className="form-title">
                                    Discover Public Rooms </p>
                                <p className="form-subtitle">
                                    Open to all !!  </p>

                                <nav className="navbar navbar-light bg-light justify-content-between">
                                    <a className="navbar-brand mb-0 h1">Choose your Interest :)</a>
                                    <form className="form-inline">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                        <button className="btn my-2 my-sm-0" type="submit">
                                            <img src={searchIcon} width="45" height="40" alt="search"></img>
                                        </button>
                                    </form>
                                </nav>

                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                                    <a href="#" className="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                                    <a href="#" className="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                                    <a href="#" className="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                                    <a href="#" className="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form1">
                        <div className="form">
                            <p className="form-title">
                                Welcome !</p>
                            <p className="form-subtitle">
                                Choose a Chat Room to get Started with :) </p>
                            <div className="list-group">
                                {/* <li className="list-group-item list-group-item-action rounded border border-dark">Cras justo odio </li> */}
                                {this.roomList()}
                            </div>
                            <button className="form-submit">
                                Let's go!</button>
                            <p className="form-bottom-text">
                                Don't have a room yet?
                                <a href="#"> Create One!</a>
                            </p>
                        </div>
                    </div>

                </div>

            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.currentUser.isAuthenticated,
        isRoomLoaded: state.currentUser.isRoomLoaded,
        allRooms: state.currentUser.allRooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentUser: () => { dispatch(getCurrentUser()) },
        getAllRoomsOfUser: () => { dispatch(getAllRoomsOfUser()) },
        initRoom: (roomName) => { dispatch(initRoom(roomName)) },
        getAllPublicRooms: () => { dispatch(getAllPublicRooms()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);