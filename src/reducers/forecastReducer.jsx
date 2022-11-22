import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: undefined,
    data: {},
};

export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setError: (state, action) => {
            const {payload} = action;
            state.error = payload;
        },
    },
    extraReducers: {
        [getWeatherByCoord.pending]: (state) => {
            state.loading = true;
            state.error = undefined;
        },
        [getWeatherByCoord.fullfilled]: (state, {payload}) => {
            state.loading = false;
            state.data = payload;
        },
        [getWeatherByCoord.rejected]: (state, {payload}) => {
            const {message} = payload;
            state.loading = false;
            state.error = message;
        },
    },
});

export const {setError} = forecastSlice.actions;
export default forecastSlice.reducer;
