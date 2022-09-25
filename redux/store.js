import {configureStore, combineReducers} from "redux";
import appReducer from "./reducers/appReducer";

/* const rootReducer = combineReducers({
    users : appReducer, 
});

const store = createStore(rootReducer); */

export default configureStore({
    reducer: {
      users: appReducer,
    }
  })
