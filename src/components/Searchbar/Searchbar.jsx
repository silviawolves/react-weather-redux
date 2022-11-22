import './searchbar.css';
import {Input} from 'antd';

const {Search} = Input;

const Searchbar = () => {
    return (
        <Search
            allowClear={true}
            bordered={false}
            placeholder="Search city"
            onSearch={props.onSearch}
            style={{width: 200, backgroundColor: 'transparent'}}
        />
    );
};

export default Searchbar;
