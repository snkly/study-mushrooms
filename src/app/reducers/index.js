import {combineReducers} from "redux";
import fungiReducer from "./fungiReducer";

const rootReducer = combineReducers({
  fungiReducer: fungiReducer
});

export default rootReducer;
