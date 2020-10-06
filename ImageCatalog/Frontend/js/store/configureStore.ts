//import { home } from 'home/reducers';
import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    //home: home
});

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
});

export const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true
});
