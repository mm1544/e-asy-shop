import React from 'react';
import ReactDOM from 'react-dom';
// 'BrowserRouter' provides routing functionality
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
