import {useState, useEffect} from 'react';
import {Divider, Row, Col} from 'antd';
import dayjs from 'dayjs';
import {API_KEY} from '../../api';
import './forecast.css';

const Forecast = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [forecast, setForecast] = useState({});

    const formatDays = () => {
        return forecast.list
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

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${props.data.coord.lat}&lon=${props.data.coord.lon}&appid=${API_KEY}&units=metric`,
        )
            .then((response) => response.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setForecast(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, [props]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
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
