import React from 'react';
import TextField from '@material-ui/core/TextField';
import MessageList from './messageList';
import { connect } from 'react-redux';

import { addNewMessage, changeSelectedChannel } from '../../../store/actions/chatActions';

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
        // const room = "Discussion";
        // const channel = props.roomDetails.channels[0].title;
        // const token = props.token;
        // const type="text";

        // const messageObject = {
        //     room,
        //     channel,
        //     type,
        //     token,
        //     message
        // }

        // var packet = {room, channel, message, token, type};

        // console.log(props)

        // this.setmessageList({ user: "User A", message: this.state.message })
        if (this.state.message.length === 0) 
            return;
        
        const message = {
            message: this.state.message,
            user: "User A"
        }
        let nameOfConversation = "";
        if (this.props.currentConversation[0] === "channels") {
            console.log("HI")
            nameOfConversation = this.props.currentConversation[1].name
        } else {
            nameOfConversation = this.props.currentConversation[1].otherUserName
        }
        this.props.addNewMessage(message, this.props.currentConversation[0], nameOfConversation)
        this.setState({
            message: ""
        })
    }
    render() {
        // console.log(this.props)

        // const [messageList, setmessageList] = useState(props.currentChannel.messages);
        // console.log(messageList)
        // const [message, setMessage] = useState("");
        // let message = "";

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
            title = conversation.otherUserName;
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
        currentUser: state.chatReducer.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewMessage: (message, typeOfConversation, conversationName) => {dispatch(addNewMessage(message, typeOfConversation, conversationName))},
        changeSelectedChannel: (channelIndex) => {dispatch(changeSelectedChannel(channelIndex))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);