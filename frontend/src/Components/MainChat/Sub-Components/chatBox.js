import React from 'react';
import TextField from '@material-ui/core/TextField';
import MessageList from './messageList';
import { connect } from 'react-redux';

import { addNewMessage, } from '../../../store/actions/chatActions';

class ChatBox extends React.Component {
    state = {
        message: ""
    }
    handleNewMessageChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    addNewMessage = () => {
        if (this.state.message.length === 0) 
            return;
        
        const message = {
            content: this.state.message,
            owner: {username: this.props.currentUser},
            createdAt: new Date(Date.now()).toISOString()
        }
        let nameOfConversation = "";

        // Send the message through socket
        if (this.props.currentConversation[0] === "channels") {
            nameOfConversation = this.props.currentConversation[1].name
            this.props.sendMessage(this.state.message, nameOfConversation, true)
        } else {
            nameOfConversation = this.props.currentConversation[1].name
            this.props.sendMessage(this.state.message, nameOfConversation, false)
        }
        this.props.addNewMessage(message, this.props.currentConversation[0], nameOfConversation)
        this.setState({
            message: ""
        })
        
    }
    render() {
        // console.log(this.props)
        let title = "";
        let description = null;
        let isPersonal = "";
        let conversation = null;

        if (this.props.currentConversation[0] === "channels") {
            conversation = this.props.currentConversation[1];
            title = conversation.name;
            description = conversation.description;
            isPersonal = false;
        } else {
            conversation = this.props.currentConversation[1];
            title = conversation.name;
            isPersonal = true;
        }

        return (
            <div className="chat-area-border">
                <div className="chat-header">
                    <div className="chat-name">
                        {title}
                    </div>
                    <div className="chat-description">
                        {description || "No Description"}
                    </div>
                </div>
                <div className="chat-message">
                    <MessageList currentUser={this.props.currentUser} messageList={conversation.messages} />
                </div>
                <div className="new-message">
                    <div className="message-options">
                        Attach
                </div>
                    <div className="message-text">
                        <TextField
                            name="new-message"
                            placeholder="New Message"
                            id="new-message-text-field"
                            variant="outlined"
                            multiline
                            value={this.state.message}
                            // rows={2}
                            onChange={this.handleNewMessageChange}
                        >

                        </TextField>
                    </div>
                    <button className="send-button" onClick={this.addNewMessage}>
                        Send
                </button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewMessage: (message, typeOfConversation, conversationName) => {dispatch(addNewMessage(message, typeOfConversation, conversationName))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);