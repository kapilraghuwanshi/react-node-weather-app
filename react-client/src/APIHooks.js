
import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';


export const BaseURL = 'http://localhost:3001/getWeatherInfo?lat=90&lon=10';

export const useAPI = makeUseAxios({
    axios: axios.create({
        baseURL: BaseURL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate', // HTTP 1.1.
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    }),
});
