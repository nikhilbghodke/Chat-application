import { NEW_MESSAGE, CHANGE_SELECTED_CHANNEL, CHANGE_CONVERSATION } from '../actionTypes';

export function addNewMessage(message, typeOfConversation, conversationName) {
    return {
        type: NEW_MESSAGE,
        message,
        typeOfConversation,
        conversationName
    }
}

export function changeSelectedChannel(channelIndex) {
    return {
        type: CHANGE_SELECTED_CHANNEL,
        channelIndex
    }
}

export function changeCoversation(typeOfCoversation, indexOfConversation) {
    return {
        type: CHANGE_CONVERSATION,
        typeOfCoversation,
        indexOfConversation
    }
}