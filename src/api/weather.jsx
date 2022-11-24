import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from './api_key';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        // baseUrl: `${BASE_URL}&appid=${API_KEY}&units=metric`,
    }),
    endpoints: (builder) => ({
        getWeatherByCity: builder.query({
            query: (city) => `weather?q=${city}&appid=${API_KEY}&units=metric`,
            // query: (city) => `weather?q=${city}`,
        }),
        getWeatherByCoord: builder.query({
            query: ({lat, lon}) =>
                `forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
            // query: ({lat, lon}) =>
            // `forecast?lat=${lat}&lon=${lon}`,
        }),
    }),
});

export const {useGetWeatherByCityQuery, useGetWeatherByCoordQuery} = weatherApi;
