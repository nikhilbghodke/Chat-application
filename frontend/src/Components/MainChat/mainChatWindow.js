import React from 'react';
import { connect } from 'react-redux'

import Header from './header';
import SideBar from './sideTabBar';
import Dashboard from './Sub-Components/dashboard';
import People from './Sub-Components/people';
import Chats from './Sub-Components/chats';
import LoadingOverlay from 'react-loading-overlay';
import Edit from './Sub-Components/edit';

import './mainChatWindow.css';


class MainChatWindow extends React.Component {
    state = {
        selected: "chats",  // Sidebar component clicked and selected
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
         else if (this.state.selected === "edit")
            return <Edit />
        return <Dashboard />
    }

    render() {
        
        return (
            <div className="outer-layout">
                <Header roomName={this.props.roomName} currentUser={this.props.currentUser}/>
                <LoadingOverlay
                    active={!this.props.isChatLoaded || this.props.joingNewRoom}
                    spinner
                    text="Please wait while we load your chats..."
                >
                    <div className="sub-window">
                        <SideBar updatedSelected={this.updatedSelected} current={this.state.selected}/>
                        {this.renderContent()}
                    </div>
                </LoadingOverlay>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isChatLoaded: state.chatReducer.isChatLoaded,
        roomName: state.chatReducer.roomName,
        currentUser: state.chatReducer.currentUser,
        joingNewRoom: state.currentUser.joingNewRoom
    }
}

export default connect(mapStateToProps)(MainChatWindow);