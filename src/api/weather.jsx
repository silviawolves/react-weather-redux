import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from './api_key';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const myHeader = `&appid=${API_KEY}&units=metric`;

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        getWeatherByCity: builder.query({
            query: (city) => `weather?q=${city}${myHeader}`,
        }),
        getWeatherByCoord: builder.query({
            query: ({lat, lon}) => `forecast?lat=${lat}&lon=${lon}${myHeader}`,
        }),
    }),
});

export const {useGetWeatherByCityQuery, useGetWeatherByCoordQuery} = weatherApi;
