import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './ErrorBoundary/Error';
import 'bootstrap/dist/css/bootstrap.min.css';

 

import { Provider } from 'react-redux';
import store from './Redux/store'; 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
); 
root.render(
  <React.StrictMode>
  <ErrorBoundary>
  <Provider store={store}>
    <App />
  </Provider>,
  </ErrorBoundary>
  
  </React.StrictMode>
);
 
reportWebVitals();
