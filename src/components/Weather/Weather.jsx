import {Row, Col, Divider} from 'antd';
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import './weather.css';

const Weather = (props) => {
    return (
        <div className="weather-wrapper">
            <Row gutter={20} style={{textAlign: 'center'}}>
                <Col span={12}>
                    <div className="wrap-col">
                        <img
                            src={`http://openweathermap.org/img/wn/${props.data.icon}.png`}
                            alt={props.data.description}
                            className="weather-img"
                        />
                        <p
                            style={{
                                textTransform: 'capitalize',
                                margin: 0,
                                fontSize: '1.5rem',
                            }}>
                            {props.data.main}
                        </p>
                    </div>
                    <div>
                        <p className="temperature">
                            {Math.round(props.data.temperature)}° C
                        </p>
                    </div>
                </Col>

                <Col md={6} xs={8}>
                    <p className="low-max-temp">
                        <ArrowUpOutlined /> {Math.round(props.data.maxTemp)}° C
                    </p>
                    <Divider
                        sm={{display: 'none'}}
                        style={{borderColor: 'rgba(255, 255, 255, 0.5)'}}
                    />
                    <p className="low-max-temp">
                        <ArrowDownOutlined /> {Math.round(props.data.minTemp)}°
                        C
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default Weather;
