import * as ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import QueryProvider from './providers/QueryProvider';
import { BrowserRouter } from 'react-router-dom';
import  {ThemeProvider}  from './providers/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </QueryProvider>
    </Provider>
  </React.StrictMode>
);
