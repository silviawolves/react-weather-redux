import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {combineReducers} from 'redux';
import {weatherApi} from '../api/weather';

const rootReducers = combineReducers({
    [weatherApi.reducerPath]: weatherApi.reducer,
});

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware),
});
setupListeners(store.dispatch);
