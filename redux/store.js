import {createStore, combineReducers, applyMiddleware} from "redux";
import appReducer from "./reducers/appReducer";
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    users : appReducer, 
});

const store = createStore(rootReducer, applyMiddleware(thunk));


export default store; 