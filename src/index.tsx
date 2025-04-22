// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';  // <-- use HashRouter

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/dashboardUi">
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
