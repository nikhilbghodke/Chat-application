import { combineReducers } from "redux";
import currentUser from "./currentUser";
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  currentUser,
  chatReducer,
});

export default rootReducer;
