import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Inventory } from './pages/Inventory';
import { Hotels } from './pages/Hotels';
import { Transfers } from './pages/Transfers';
import { AppProvider } from './context/AppContext';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import { Toaster } from "react-hot-toast";

function AppRoutes() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login';
 

  return (
    <Routes>
      {/* Login/Signup Page without layout */}
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* All other routes wrapped with Layout */}
      {!hideLayout && (
        <>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <Orders />
              </Layout>
            }
          />
          <Route
            path="/inventory"
            element={
              <Layout>
                <Inventory />
              </Layout>
            }
          />
          <Route
            path="/hotels"
            element={
              <Layout>
                <Hotels />
              </Layout>
            }
          />
          <Route
            path="/transfers"
            element={
              <Layout>
                <Transfers />
              </Layout>
            }
          />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
      <Toaster position="top-right" />
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
