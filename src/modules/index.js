//Root Reducer

import { combineReducers } from "redux";
import auth from "./auth";
import note from "./note";

const rootReducer = combineReducers({
  auth,
  note,
});

export default rootReducer;
