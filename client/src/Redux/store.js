import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as authReducer } from "./Auth/reducer";


const rootReducer = combineReducers({
    auth: authReducer
})

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)))