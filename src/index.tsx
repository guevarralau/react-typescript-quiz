import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const APP_NAME = 'REACT QUIZ'

ReactDOM.render(
  <React.StrictMode>
    <App appName={APP_NAME}/>
  </React.StrictMode>,
  document.getElementById('root')
);

