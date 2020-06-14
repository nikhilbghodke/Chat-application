// This will be the reducers related to chat operations

// Right now the REDUX store will deal with the data from one room only.

/* 
    The initial state will have 
        * currentUser: The current User logged in to this client
        * roomName  : String
        * channels  : Array of channel objects
            channel Object:
                * name
                * channelDescription
                * messages: All the messages in that channel
        * users     : Array of userConversation object
            userConversation Object:
                * otherUserName: With which person currentUser has had conversations with
                * messages: All the messages in that conversation
        * selectedChannelIndex: The index of channel selected for chatbox
        * selectedCoversation: The type of chat and the index of that chat which is selected
*/
import { NEW_MESSAGE, CHANGE_SELECTED_CHANNEL, CHANGE_CONVERSATION } from "../actionTypes";

const dummyMessageList = [
    {
        user: "User A",
        message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
    },
    {
        user: "User B",
        message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
    },
    {
        user: "User C",
        message: "Cupidatat do quis velit laboris incididunt elit irure."
    },
    {
        user: "User A",
        message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
    },
    {
        user: "User B",
        message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
    },
    {
        user: "User C",
        message: "Cupidatat do quis velit laboris incididunt elit irure."
    },
    {
        user: "User A",
        message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
    },
    {
        user: "User B",
        message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
    },
    {
        user: "User C",
        message: "Cupidatat do quis velit laboris incididunt elit irure."
    },
    {
        user: "User A",
        message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
    },
    {
        user: "User B",
        message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
    },
    {
        user: "User C",
        message: "Cupidatat do quis velit laboris incididunt elit irure."
    },
]

const dummyArrayOfUserConversations = [
    {
        otherUserName: "User B",
        messages: [
            {
                user: "User A",
                message: "Incididunt aliquip officia commodo elit ullamco ad id ad reprehenderit."
            },
            {
                user: "User B",
                message: "Cupidatat laboris incididunt magna aliquip incididunt aliquip est elit."
            },
            {
                user: "User B",
                message: "Lorem Lorem ad laboris pariatur mollit commodo nisi exercitation id aliqua consectetur Lorem qui laborum."
            },
        ]
    },
    {
        otherUserName: "User C",
        messages: [
            {
                user: "User C",
                message: "Eiusmod esse pariatur adipisicing amet Lorem pariatur exercitation dolore."
            },
            {
                user: "User A",
                message: "Amet veniam tempor officia sit adipisicing cillum adipisicing dolore adipisicing ullamco cillum aute."
            },
            {
                user: "User C",
                message: "Quis labore minim veniam ipsum duis nulla magna aliqua laborum."
            },
        ]
    },
]

const initialState = {
    currentUser: "User A",
    roomName: "Room A",
    channels: [
        {
            name: "Channel-1",
            description: "Some Channel - 1",
            messages: dummyMessageList
        },
        {
            name: "Channel-2",
            description: "Some Channel - 2",
            messages: []
        },
        {
            name: "Channel-3",
            description: "Some Channel - 3",
            messages: []
        }
    ],
    users: dummyArrayOfUserConversations,
    selectedChannelIndex: 0,
    selectedConversation: ["channels", 0],
    // selectedCoversation: ["users", 0]    
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE:
            if (action.typeOfConversation === "channels") {
                const index = state.channels.findIndex(channel => channel.name === action.conversationName);
                console.log(index)
                let newChannels = [...state.channels];
                let oldMessages = newChannels[index].messages;
                newChannels[index] = { ...newChannels[index], messages: [...oldMessages, action.message] }
    
                return {
                    ...state,
                    channels: newChannels
                }
            }
            // Else this is user conversation
            const index = state.users.findIndex(userConversation => userConversation.otherUserName === action.conversationName);
            let newUserConversations = [...state.users];
            let oldMessages = newUserConversations[index].messages;
            newUserConversations[index] = { ...newUserConversations[index], messages: [...oldMessages, action.message] }

            return {
                ...state,
                users: newUserConversations
            }


        case CHANGE_SELECTED_CHANNEL:
            return {
                ...state,
                selectedChannelIndex: action.channelIndex
            }

        case CHANGE_CONVERSATION:
            return {
                ...state,
                selectedConversation: [action.typeOfCoversation, action.indexOfConversation]
            }

        default:
            return state;
    }

}

export default chatReducer