import {
    NEW_MESSAGE,
    CHANGE_CONVERSATION,
    INIT_CHANNELS,
    CHAT_LOADING_DONE,
    INIT_USERS_CONVO,
    DIRECTS_LOADING_DONE,
    INIT_ROOM
} from '../actionTypes';
import { serverBaseURL, apiCall, setTokenHeader } from '../../services/api'
import { addError } from "./error";

export function addNewMessage(message, typeOfConversation, conversationName) {
    return {
        type: NEW_MESSAGE,
        message,
        typeOfConversation,
        conversationName
    }
}

export function changeCoversation(typeOfCoversation, indexOfConversation) {
    return {
        type: CHANGE_CONVERSATION,
        typeOfCoversation,
        indexOfConversation
    }
}

export function initChannel(channels) {
    return {
        type: INIT_CHANNELS,
        channels
    }
}

export function initUserConvo(userConversations) {
    return {
        type: INIT_USERS_CONVO,
        userConversations
    }
}

export function chatLoadingCompleted() {
    return {
        type: CHAT_LOADING_DONE
    }
}

export function directMessagesLoadingCompleted() {
    return {
        type: DIRECTS_LOADING_DONE
    }
}

export function initRoom(roomName) {
    return {
        type: INIT_ROOM,
        roomName
    }
}

/* *************************** */


export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

// API functions:

export function getAllChannelMessages(roomName) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("GET", serverBaseURL + `/allMessages/${roomName}`)
                .then((channels) => {
                    console.log(channels)
                    let listOfChannels = [];
                    for (var channel in channels) {
                        let channelObject = {
                            name: channel,
                            messages: channels[channel].messages,
                            description:channels[channel].description
                        }
                        listOfChannels.push(channelObject)
                    }
                    dispatch(initChannel(listOfChannels))
                    dispatch(chatLoadingCompleted())
                    resolve();
                })
                .catch(error => {
                    alert(error.message)
                    dispatch(addError(error.message));
                    reject();
                })
        })
    }
}

export function getAllDirectMessages(roomName) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("GET", serverBaseURL + `/allDirectMessages/${roomName}`)
                .then((userConversations) => {
                    console.log(userConversations)
                    let listOfUsers = [];
                    for (var user in userConversations) {
                        let userObject = {
                            name: user,
                            messages: userConversations[user]
                        }
                        listOfUsers.push(userObject)
                    }
                    dispatch(initUserConvo(listOfUsers))
                    dispatch(directMessagesLoadingCompleted())
                    resolve();
                })
                .catch(error => {
                    alert(error.message)
                    dispatch(addError(error.message));
                    reject();
                })
        })
    }
}