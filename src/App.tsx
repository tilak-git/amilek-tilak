import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SignUpPage from './modules/signUpPage/index.tsx';
import CoreHRPage from './modules/CoreHRPage/index.tsx';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signIn" replace />;
  }

  return children;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/admin/corehr" replace />;
  }

  return children;
};


const RootRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/corehr');
    } else {
      navigate('/signIn');
    }
  }, [navigate]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        {/* Public Routes */}
        <Route
          path="/signIn"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin/corehr"
          element={
            <ProtectedRoute>
              <CoreHRPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<RootRedirect />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;