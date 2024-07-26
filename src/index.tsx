import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import './app/styles/index.scss';
import App from './app/App';

import 'shared/config/i18n/i18n';

render(
  <BrowserRouter>
    <StoreProvider
      initialState={{
        user: { authData: null },
        loginForm: { username: '', password: '', isLoading: false },
      }}>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
