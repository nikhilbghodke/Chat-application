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
        
        return (
            <Scrollbars autoHide ref="messageScrollbar">
                {this.props.messageList.map((message, index) => {
                    return (

                        <div className="message" key={index}>
                            {message.user === this.props.currentUser ? <div className="spacer"></div> : null}
                            <div className={"message-area" + (message.user === this.props.currentUser ? " current-user" : " other-user")}>
                                <div className="message-user">
                                    {message.user}
                                </div>
                                <div className="message-content">
                                    {message.message}
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