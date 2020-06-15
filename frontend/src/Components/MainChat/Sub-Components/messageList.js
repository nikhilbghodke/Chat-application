import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

// function Message() {
//     return (
//         <div className="message">

//         </div>
//     )
// }

class MessageList extends React.Component {
    componentDidMount() {
        const height = this.refs.messageScrollbar.getScrollHeight();
        this.refs.messageScrollbar.scrollTop(height);
    }

    componentDidUpdate() {
        const height = this.refs.messageScrollbar.getScrollHeight();
        this.refs.messageScrollbar.scrollTop(height);
    }

    render() {
        // console.log(this.props)
        return (
            <Scrollbars autoHide ref="messageScrollbar">
                {this.props.messageList.map((message, index) => {
                    let date = new Date(message.createdAt);
                    const time = date.toTimeString().split(" ")[0];
                    let messageObject = {
                        content: message.content,
                        owner: "unknown"
                    }
                    if (message.owner){
                        messageObject.owner = message.owner.username
                    }

                    return (

                        <div className="message" key={index}>
                            {messageObject.owner === this.props.currentUser ? <div className="spacer"></div> : null}
                            <div className={"message-area" + (messageObject.owner === this.props.currentUser ? " current-user" : " other-user")}>
                                <div className="message-user">
                                    {messageObject.owner}
                                </div>
                                <div className="message-content">
                                    {messageObject.content}
                                </div>
                                <div className="message-time">
                                    {time}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Scrollbars>
        )
    }
}

export default MessageList;