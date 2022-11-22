import dayjs from 'dayjs';
import './datelocation.css';

const DateLocation = (props) => {
    return (
        <div className="dl-wrapper">
            <h1 style={{textTransform: 'capitalize'}}>
                {props.data?.name}, {props.data?.sys.country.toUpperCase()}
            </h1>

            <p className="date-time">{dayjs().format('dddd')}</p>
        </div>
    );
};

export default DateLocation;
