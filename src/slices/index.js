import { combineReducers } from "redux";

//reducers
import authReducer from "./auth";
import userReducer from "./user";

const rootReducer = combineReducers({
  authData: authReducer,
  currentUser: userReducer,
});

export default rootReducer;
