import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: undefined,
    data: {},
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setError: (state, action) => {
            const {payload} = action;
            state.error = payload;
        },
    },
    extraReducers: {
        [getWeatherByCity.pending]: (state) => {
            state.loading = true;
            state.error = undefined;
        },
        [getWeatherByCity.fullfilled]: (state, {payload}) => {
            state.loading = false;
            state.data = payload;
        },
        [getWeatherByCity.rejected]: (state, {payload}) => {
            const {message} = payload;
            state.loading = false;
            state.error = message;
        },
    },
});

export const {setError} = weatherSlice.actions;
export default weatherSlice.reducer;
