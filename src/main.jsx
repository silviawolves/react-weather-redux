import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store/store';

import Container from './components/Container';

import 'antd/dist/antd.css';
import './css/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Container />
    </Provider>,
);
