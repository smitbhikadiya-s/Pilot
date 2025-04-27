import React, { type ReactNode } from 'react';

import { ThemeProvider } from './context/themeContext';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/organism/adminLayout';
import MenuItem from './pages/menuItem';
import { useAppSelector } from './store';
import { NotificationProvider } from './context/notificationContext';
import Logout from './pages/logout';

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <ThemeProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="menu" element={<MenuItem />} />
              </Route>
            </Routes>
          </div>
        </ThemeProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default App;
