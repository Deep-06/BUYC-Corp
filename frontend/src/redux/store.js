import { legacy_createStore, applyMiddleware, combineReducers } from "redux";

import {thunk} from "redux-thunk";
//import { reducer as carReducer } from "./Task/reducer";
import { reducer as authReducer } from "./auth/reducer";

 const rootReducer = combineReducers({
    
    authReducer,

});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));