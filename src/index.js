import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ReactGA from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';
import { AgentProvider } from './context/AgentContext';
import { AdminProvider } from './context/AdminContext';

ReactGA.initialize('G-Q1NCE03KDM');
ReactGA.send('pageview');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AgentProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </AgentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
