import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UsersTasks from './pages/UsersTasks';
import { Toaster } from 'react-hot-toast';

import { useEffect } from 'react';
import { Loader } from 'lucide-react';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {authUser && <h1 className="text-center text-7xl pt-4">Home Page</h1>}

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/users"
          element={!authUser ? <LoginPage /> : <UsersTasks to="/" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
