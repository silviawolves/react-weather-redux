import './container.css';

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Input, Layout, Form} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {API_KEY} from '../../api';

import dayjs from 'dayjs';
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
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState('Venezia');
    const [result, setResult] = useState({});

    const [form] = Form.useForm();

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
        if (value === '') {
            setCity(city);
        }
    };

    const onSubmit = ({search}) => {
        form.resetFields();
    };

    useEffect(() => {
        const handleError = (response) => {
            if (!response.ok) {
                throw setCity('');
            } else {
                return response.json();
            }
        };

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
        )
            .then(handleError)
            .then((data) => {
                setIsLoaded(true);
                setResult(data);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, [city]);

    if (!isLoaded) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <LoadingOutlined />
            </div>
        );
    } else {
        return (
            <div
                className="App"
                style={{
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundImage: mapImage(result.weather[0].id),
                }}>
                <Content>
                    <Form
                        form={form}
                        className="input-wrapper"
                        onFinish={onSubmit}>
                        <Form.Item name="search">
                            <Search onSearch={onSearch} />
                        </Form.Item>
                    </Form>

                    <DateLocation
                        name={result.name}
                        country={result.sys.country.toUpperCase()}
                        date={dayjs().format('dddd')}
                    />

                    <Weather data={result} />
                    <Forecast data={result} />
                </Content>
            </div>
        );
    }
};

export default Container;
