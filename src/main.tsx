import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { ConfigProvider } from 'antd';
import theme from './theme/themeAntd';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
