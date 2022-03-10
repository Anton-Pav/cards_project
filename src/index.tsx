import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/ui/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "./main/bll/store";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
,
  document.getElementById('root')
);

reportWebVitals();
