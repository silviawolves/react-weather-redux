import React from 'react';
import ReactDOM from 'react-dom/client';

import Container from './components/Container';

import 'antd/dist/antd.css';
import './css/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Container />
    </React.StrictMode>,
);
