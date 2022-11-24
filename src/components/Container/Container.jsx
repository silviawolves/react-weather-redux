import './container.css';

import {useState} from 'react';
import {Input, Layout, Form} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {useGetWeatherByCityQuery} from '../../api/weather';

import DateLocation from '../DateLocation';
import Weather from '../Weather';
import Forecast from '../Forecast';

import ClearUrl from '../../img/clear.jpg';
import CloudyUrl from '../../img/cloudy.jpg';
import DrizzleUrl from '../../img/drizzle.jpg';
import FogUrl from '../../img/fog.jpeg';
import RainUrl from '../../img/rain.jpg';
import SnowUrl from '../../img/snow.jpg';
import StormUrl from '../../img/storm.jpg';

const {Content} = Layout;
const {Search} = Input;

const Container = () => {
    const [city, setCity] = useState('Venezia');
    const {data, error, isLoading, isFetching} = useGetWeatherByCityQuery(city);

    //dateLocation component props
    const headerData = {
        name: data?.name,
        country: data?.sys.country,
    };

    //weather component props
    const weatherData = {
        icon: data?.weather[0].icon,
        description: data?.weather[0].description,
        temperature: data?.main.temp,
        maxTemp: data?.main.temp_max,
        minTemp: data?.main.temp_min,
    };

    //forecast component props to get query params
    const forecastData = {
        lat: data?.coord.lat,
        lon: data?.coord.lon,
    };

    const mapImage = (id) => {
        switch (true) {
            case id >= 200 && id <= 232:
                return `url(${StormUrl})`;
            case id >= 300 && id <= 321:
                return `url(${DrizzleUrl})`;
            case id >= 500 && id <= 531:
                return `url(${RainUrl})`;
            case id >= 600 && id <= 622:
                return `url(${SnowUrl})`;
            case id >= 701 && id <= 781:
                return `url(${FogUrl})`;
            case id >= 801 && id <= 804:
                return `url(${CloudyUrl})`;
            case id === 800:
                return `url(${ClearUrl})`;
            default:
                return `url(${FogUrl})`;
        }
    };

    const onSearch = (value) => {
        setCity(value);
        if (value === '' || value === ' ') {
            setCity('Venezia');
        }
    };

    const [form] = Form.useForm();

    const onSubmit = (search) => {
        console.log(search);
        form.resetFields();
    };

    if (error) {
        setCity('Venezia');
        console.log('City is not valid.');
    }
    if ((isLoading, isFetching)) {
        return (
            <div className="loader">
                <LoadingOutlined style={{fontSize: 35}} />
            </div>
        );
    }
    if (data) {
        return (
            <div
                className="App"
                style={{
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundImage: mapImage(data?.weather[0].id),
                }}>
                <Content>
                    <Form
                        form={form}
                        name="search"
                        className="input-wrapper"
                        initialValues={city}
                        onFinish={onSubmit}>
                        <Form.Item>
                            <Search onSearch={onSearch} />
                        </Form.Item>
                    </Form>

                    <DateLocation data={headerData} />
                    <Weather data={weatherData} />
                    <Forecast data={forecastData} />
                </Content>
            </div>
        );
    }
};

export default Container;
