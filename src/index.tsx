import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router here

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/dashboardUi"> {/* Wrap the entire App here */}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
