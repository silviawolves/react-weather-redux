import {Divider, Row, Col} from 'antd';
import {useGetWeatherByCoordQuery} from '../../api/weather';
import dayjs from 'dayjs';

import './forecast.css';

const Forecast = (props) => {
    const {data, error, loading} = useGetWeatherByCoordQuery({
        lat: props.data?.coord.lat,
        lon: props.data?.coord.lon,
    });

    const forecast = data?.list;

    const formatDays = () => {
        return forecast
            .map((data) => {
                return {
                    days: dayjs(data.dt * 1000)
                        .add(1, 'day')
                        .format('ddd'),
                    dayIcon: data.weather[0].icon,
                    dayTemp: data.main.temp,
                };
            })
            .filter(
                (value, i, self) =>
                    i === self.findIndex((day) => day.days === value.days),
            )
            .slice(0, 6);
    };

    if (error) {
        <h6>You broke it.</h6>;
    } else if (loading) {
        <h6>Loading...</h6>;
    } else if (data) {
        return (
            <div className="forecast">
                <Divider
                    orientation="left"
                    className="forecast-title"
                    style={{borderColor: 'rgba(255, 255, 255, 0.5)'}}>
                    Daily Forecast
                </Divider>

                <Row align="middle" justify="space-between">
                    {formatDays(forecast)
                        .splice(0, 5)
                        .map((data, i) => (
                            <Col key={i}>
                                <div className="daily-wrapper">
                                    <h4 style={{color: 'white', margin: 0}}>
                                        {data.days}
                                    </h4>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${data.dayIcon}.png`}
                                        alt=""
                                        style={{height: '30px'}}
                                    />
                                    <p>{Math.round(data.dayTemp)}° C</p>
                                </div>
                            </Col>
                        ))}
                </Row>
            </div>
        );
    }
};

export default Forecast;
