import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { tableReducer } from "./reducer";

export const store = createStore(tableReducer, applyMiddleware(thunk));
