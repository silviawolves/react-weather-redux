import {combineReducers} from 'redux';
import weatherReducer from './weatherReducer';
// import forecastReducer from './forecastReducer';

const rootReducers = combineReducers({
    weather: weatherReducer,
    // forecast: forecastReducer,
});

export default rootReducers;
