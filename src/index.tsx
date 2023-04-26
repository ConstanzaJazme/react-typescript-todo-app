import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {TodosProvider} from "./context";

ReactDOM.render(
    <React.StrictMode>
        <TodosProvider>
            <App/>
        </TodosProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
