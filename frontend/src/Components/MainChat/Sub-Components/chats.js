import React from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Scrollbars } from 'react-custom-scrollbars';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux'
import { changeSelectedChannel, changeCoversation } from '../../../store/actions/chatActions';
import ChatBox from './chatBox';

import './chats.css';

// const socket = openSocket('http://localhost:3001');
const username = "abcd";
const room = "Discussion"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZGI1MjdlNzdkNmRkMTNjNDAzOWZhNiIsImlhdCI6MTU5MTQzMTgwN30.pl0bRPyjpmzRwPmN5JHwyPQHscnyei5_qXj6hQTgnMg";

// var roomDetails = null;


class Chats extends React.Component {
    state = {
        channelCollapse: false,
        messageCollpase: false,
        roomDetails: null,
    }

    componentDidMount() {
        // console.log("SOCKET")

        // socket.emit('join', { username, room, token }, (error, data) => {
        //     if (error) {
        //         console.log(error)
        //         alert(JSON.stringify(error))
        //         // location.href="/"
        //     }
        //     else {
        //         console.log(data)
        //         this.setState({
        //             roomDetails: data
        //         })
        //     }
        // })
        setTimeout(() => {
            this.setState({
                channelCollapse: true,
                messageCollpase: true
            })
        },
            500)
    }

    listElement = (listToMap, isChannel = true) => {
        // If the list is of channels, name is channels[i].name
        // If the list is of users, name is users[i] directly
        return (
            <List component="nav">
                {listToMap.map((entity, index) => {
                    return (
                        <ul
                            key={index}
                            className={"channel-list-ul " + (index === 0 ? "first" : "")}
                            onClick={() => {
                                this.props.changeConversation(isChannel ? "channels" : "users", index)
                            }}
                        >
                            <div>{isChannel ? entity.name : entity.otherUserName}</div>
                        </ul>
                    )
                })}
            </List>
        )
    }

    render() {
        console.log(this.props)
        return (
            <div className="main-area chat-area">
                <div className="chat-list">
                    <div className="chat-list-subtitle">
                        <p>Your channels</p>
                    </div>
                    <div className="channel-list">
                        <Scrollbars autoHide>
                            <div className="channel-list-header" onClick={() => this.setState({ channelCollapse: !this.state.channelCollapse })}>
                                Channels
                            {this.state.channelCollapse ? <ExpandLess /> : <ExpandMore />}
                            </div>

                            <Collapse in={this.state.channelCollapse} timeout="auto" unmountOnExit>
                                <div>
                                    {this.listElement(this.props.channels)}
                                </div>
                            </Collapse>
                            <div className="channel-list-header" onClick={() => this.setState({ messageCollpase: !this.state.messageCollpase })}>
                                Direct Messages
                            {this.state.messageCollpase ? <ExpandLess /> : <ExpandMore />}
                            </div>

                            <Collapse in={this.state.messageCollpase} timeout="auto" unmountOnExit>
                                <div>
                                    {this.listElement(this.props.users, false)}
                                </div>
                            </Collapse>
                        </Scrollbars>
                    </div>
                </div>
                <div className="chat-box">
                    <ChatBox currentConversation={
                        // ["type", conversation]
                        this.props.selectedConversation[0] === "channels"
                        ? 
                        [this.props.selectedConversation[0], this.props.channels[this.props.selectedConversation[1]]]
                        :
                        [this.props.selectedConversation[0], this.props.users[this.props.selectedConversation[1]]]
                    } />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        channels: state.chatReducer.channels,
        users: state.chatReducer.users,
        selectedChannelIndex: state.chatReducer.selectedChannelIndex,
        selectedConversation: state.chatReducer.selectedConversation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSelectedChannel: (channelIndex) => { dispatch(changeSelectedChannel(channelIndex)) },
        changeConversation: (typeOfConversation, indexOfConversation) => { dispatch(changeCoversation(typeOfConversation, indexOfConversation)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);