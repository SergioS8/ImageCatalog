import catalogInfoReducer from 'catalog/reducers/catalog-reducer';
import catalogDetailsReducer from 'catalogDetails/reducers/catalog-details-reducer';
import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    catalogs: catalogInfoReducer,
    catalogDetails: catalogDetailsReducer
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
