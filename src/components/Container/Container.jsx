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
    const {data, error, loading} = useGetWeatherByCityQuery(city);
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
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
                        className="input-wrapper"
                        onFinish={onSubmit}>
                        <Form.Item name="search">
                            <Search onSearch={onSearch} />
                        </Form.Item>
                    </Form>

                    <DateLocation data={data} />
                    <Weather data={data} />
                    <Forecast data={data} />
                </Content>
            </div>
        );
    }
};

export default Container;
