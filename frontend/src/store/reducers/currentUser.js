import { SET_CURRENT_USER, SET_ALL_ROOMS, ROOM_LOADING_COMPLETE, PUBLIC_ROOMS_LOADED } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false, // hopefully be true, when logged in
  user: {}, // all the user info when logged in
  allRooms: [],
  isRoomLoaded: false,
  allPublicRooms: [],
  publicRoomsLoaded: false
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action.user)
      return {
        // turn empty object into false or if there are keys, true
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };

    case SET_ALL_ROOMS:
        return {
          ...state,
          allRooms: action.allRooms
        }

    case ROOM_LOADING_COMPLETE:
      return {
        ...state,
        isRoomLoaded: true
      }

    case PUBLIC_ROOMS_LOADED:
        return {
          ...state,
          publicRoomsLoaded: true
        }

    // case 

    default:
      return state;
  }
};
