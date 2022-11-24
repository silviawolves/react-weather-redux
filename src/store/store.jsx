import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {weatherApi} from '../api/weather';

export const store = configureStore({
    reducer: {[weatherApi.reducerPath]: weatherApi.reducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware),
});
setupListeners(store.dispatch);
