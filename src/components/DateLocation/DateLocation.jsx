import './datelocation.css';

const DateLocation = (props) => {
    return (
        <div className="dl-wrapper">
            <h1 style={{textTransform: 'capitalize'}}>
                {props.name}, {props.country}
            </h1>

            <p className="date-time">{props.date}</p>
        </div>
    );
};

export default DateLocation;
