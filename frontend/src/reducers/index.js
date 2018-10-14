import { combineReducers } from 'redux';
import events from "./events";
import auth from "./auth";

const mobApp = combineReducers({
  events, auth
})

export default mobApp;