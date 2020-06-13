import React from 'react';
import { connect } from 'react-redux'

import Header from './header';
import SideBar from './sideTabBar';
import Dashboard from './Sub-Components/dashboard';
import People from './Sub-Components/people';
import Chats from './Sub-Components/chats';

import './mainChatWindow.css';

class MainChatWindow extends React.Component {
    state = {
        selected: "chats"  // Sidebar component clicked and selected
    }

    updatedSelected = (newChoice) => {
        this.setState({
            selected: newChoice
        })
    }

    renderContent = () => {
        if (this.state.selected === "chats")
            return <Chats />
        else if (this.state.selected === "people")
            return <People />
        return <Dashboard />
    }

    render() {
        return (
            <div className="outer-layout">
                <Header roomName={this.props.roomName} currentUser={this.props.currentUser}/>
                <div className="sub-window">
                    <SideBar updatedSelected={this.updatedSelected} current={this.state.selected}/>
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roomName: state.chatReducer.roomName,
        currentUser: state.chatReducer.currentUser
    }
}

export default connect(mapStateToProps)(MainChatWindow);