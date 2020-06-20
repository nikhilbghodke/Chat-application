import React, { Component } from 'react';

import Icon from '../../Assests/Images/icon-logo-2.png'
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth'
import { withRouter } from 'react-router-dom';

class Header extends Component{
    constructor(props) {
        super(props);
    }

    handlelogout = e => {
        e.preventDefault();
        console.log("called logout")
        this.props.history.push("/authenticate/signin")
        this.props.logout();
    };
    render() {
        return (
            <div className="header" >
                <div className="header-icon-box">
                    <img src={Icon} className="icon" alt="header-logo" />
                </div>
                <div className="chat-window-header">
                    <div className="room-option-button">
                        <p className="heading">{this.props.roomName}</p>
                    </div>
                    <div className="spacer"></div>
                    <div className="user-section">
                        <button type="button" class="btn btn-link" data-toggle="tooltip" data-placement="bottom" title="Logout" onClick={this.handlelogout}>
                            {this.props.currentUser.username}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logout()) },
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));