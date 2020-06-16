import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

function TextMessage(props) {

    const getCoords = (url) => {
        console.log(url)
        const coords = url.split("=")[1].split(",")
        console.log([coords[1], coords[0]])
        return coords[1].toString() + ", " + coords[0].toString()
    }

    if (props.messageObject.type === "location") {
        getCoords(props.messageObject.content)
    }

    return (
        <div className="message" key={props.key}>
            {props.messageObject.owner === props.currentUser ? <div className="spacer"></div> : null}
            <div className={"message-area" + (props.messageObject.owner === props.currentUser ? " current-user" : " other-user")}>
                <div className="message-user">
                    {props.messageObject.owner}
                </div>
                {props.messageObject.type === "text"
                    ?
                    <div className="message-content">
                        {props.messageObject.content}
                    </div>
                    :
                    <div className="location-content">
                        <a href={props.messageObject.content}>{props.messageObject.content}</a>
                        <img src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${getCoords(props.messageObject.content)},11,0/400x200@2x?access_token=pk.eyJ1Ijoic2F0dmlrZGFuZGFsZSIsImEiOiJja2JpMmJkdGQwYjZhMnRwamlmYmhmZDQ5In0.xEAG7PvsDEt0lM4PCUQ_NA&logo=false`} alt="location-image" class="static-map"></img>
                    </div>
                }
                <div className="message-time">
                    {props.messageObject.time}
                </div>
            </div>
        </div>
    )
}


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
        console.log(this.props)
        return (
            <Scrollbars autoHide ref="messageScrollbar">
                {this.props.messageList.map((message, index) => {
                    let date = new Date(message.createdAt);
                    const time = date.toTimeString().split(" ")[0];
                    let messageObject = {
                        content: message.content,
                        owner: "unknown",
                        type: message.type,
                        time: time
                    }
                    if (message.owner) {
                        if (message.owner.username)
                            messageObject.owner = message.owner.username
                        else
                            messageObject.owner = message.owner
                    }

                    return (

                        <TextMessage
                            key={index}
                            messageObject={messageObject}
                            currentUser={this.props.currentUser}
                        />
                    )
                })}
            </Scrollbars>
        )
    }
}

export default MessageList;