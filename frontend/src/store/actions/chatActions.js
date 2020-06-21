import {
    NEW_MESSAGE,
    CHANGE_CONVERSATION,
    INIT_CHANNELS,
    CHAT_LOADING_DONE,
    INIT_USERS_CONVO,
    DIRECTS_LOADING_DONE,
    INIT_ROOM,
    MEMBERS,
    REPORT_MESSAGE
} from '../actionTypes';
import { serverBaseURL, apiCall, setTokenHeader } from '../../services/api'
import { addError, removeError } from "./error";
import axios from 'axios'

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

export function roomMembers(members) {
    return {
        type: MEMBERS,
        members
    }
}

export function reportedMessage(id, convoType, convoName) {
    console.log("REPORTED MESSAGE AFTER API")
    return {
        type: REPORT_MESSAGE,
        id,
        convoType,
        convoName
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
                            description: channels[channel].description
                        }
                        listOfChannels.push(channelObject)
                    }
                    dispatch(initChannel(listOfChannels))
                    dispatch(chatLoadingCompleted())
                    resolve();
                })
                .catch(error => {
                  
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
                  
                    dispatch(addError(error.message));
                    reject();
                })
        })
    }
}

export function uploadFile(file, fileName, callback) {
    let formData = new FormData();
    formData.append('avatar', file, fileName)
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await apiCall("POST", serverBaseURL + `/upload`, formData);
                callback(response.address);
                resolve();
            }
            catch (error) {
                dispatch(addError(error.message));
                reject();
            }
        })
    }
}

export function downloadFile(fileAddress, callback) {
    const token = localStorage.jwtToken
    const data = { address: fileAddress }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const file = await axios.post(serverBaseURL + '/download', data, {
                    headers: headers
                })
                callback(file);
                resolve();
            }
            catch (error) {
                
                dispatch(addError(error.message));
                reject();
            }
        })
    }
}

export function getMembers(roomName) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("get", `${serverBaseURL}/rooms/${roomName}/members`, null)
                .then((members) => {
                    dispatch(roomMembers(members))
                    dispatch(removeError())
                    resolve();
                })
                .catch(error => {
                  
                    dispatch(addError(error.message));
                    reject();
                })
        })
    }
}
export function removeUser(title, name, callback) {
    console.log(name)
    console.log(title)
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const members = await apiCall("get", `${serverBaseURL}/rooms/${title}/kick/${name}`, null);
                dispatch(removeError());
                callback();
                resolve();
            }
            catch (err) {
                console.log(err);
                dispatch(addError(err.message));
                reject();
            }
        });
    };
}

export function reportMes(mObject) {
    console.log(mObject)
    let { id, convoType, convoName, roomName } = mObject;
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                await apiCall('post', `${serverBaseURL}/room/${roomName}/report/${id}`)
                // apiCall()
                console.log("REPORT API HIT")
                console.log(id, convoType, convoName)
                dispatch(reportedMessage(id, convoType, convoName))
                resolve();
            } catch (error) {
                dispatch(addError(error.message));
                reject();
            }
        })
    }
}