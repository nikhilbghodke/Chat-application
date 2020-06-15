import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER, GET_CURRENT_USER, SET_ALL_ROOMS, ROOM_LOADING_COMPLETE, INIT_PUBLIC_ROOMS, PUBLIC_ROOMS_LOADED } from "../actionTypes";
import { addError, removeError } from "./error";
import { serverBaseURL } from '../../services/api'
import jwtDecode from "jwt-decode";

export function setCurrentUser(user) {
  console.log("Set current user")
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAllRoomsOfUser(allRooms) {
  return {
    type: SET_ALL_ROOMS,
    allRooms
  }
}

export function roomLoadingComplete() {
  console.log("ROOM LOADED")
  return {
    type: ROOM_LOADING_COMPLETE
  }
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

//function for logout
export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type, userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `${serverBaseURL}/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject(); // indicate the API call failed
        });
    });
  };
}
export function updateUser(userData) {
  console.log('uu')
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("then");
        const { token, ...user } = await apiCall("patch", `${serverBaseURL}/users`, userData);
        dispatch(setCurrentUser(user));
        dispatch(removeError());
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

export function getCurrentUser() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await apiCall("get", `${serverBaseURL}/me`, null);
        dispatch(setCurrentUser(userDetails));
        console.log(userDetails)
        dispatch(removeError());
        resolve();
      }
      catch (err) {
        dispatch(addError(err.message));
        reject();
      }
    })
  }
}



export function getAllRoomsOfUser() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const allRooms = await apiCall("get", `${serverBaseURL}/allRooms`, null);
        console.log(allRooms)
        dispatch(setAllRoomsOfUser(allRooms))
        dispatch(roomLoadingComplete());
        resolve();
      }
      catch (err) {
        reject();
      }
    })
  }
}

export function getAllPublicRooms() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const allPublicRooms = await apiCall("get", `${serverBaseURL}/allRoomsDb`, null);
        console.log(allPublicRooms)
        resolve();
      }
      catch (err) {
        reject();
      }
    })
  }
}