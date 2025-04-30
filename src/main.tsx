import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { ConfigProvider } from 'antd';
import theme from './theme/themeAntd';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from '@sentry/react';
import SentryErrorBoundary from './components/molecules/SentryErrorBoundary';

Sentry.init({
  dsn: 'https://23f59d844662fe8d6e65e39b20ab3271@o4509240850579456.ingest.us.sentry.io/4509240852348928',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', 'https://pilot-sim-restro.vercel.app'],
  environment: process.env.NODE_ENV || 'development',
  sendDefaultPii: true,
  replaysSessionSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  replaysOnErrorSampleRate: 1.0,
  normalizeDepth: 10,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SentryErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider theme={theme}>
            <App />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </SentryErrorBoundary>
  </React.StrictMode>,
);
