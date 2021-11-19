import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import { imageReducer } from "./image/image.reducer";

export const rootReducer = combineReducers({
    image: imageReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
