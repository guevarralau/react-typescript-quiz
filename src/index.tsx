import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {store} from './redux/store'
import { Provider } from 'react-redux'
import App from './App';

const APP_NAME = 'REACT QUIZ'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App appName={APP_NAME}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

