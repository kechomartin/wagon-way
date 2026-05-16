import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SecureRoute from './components/SecureRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import './styles/variables.css';
import './App.css';

function NavigationHeader() {
  const { user, logout } = useAuth();
  return (
    <header className="app-header">
      <div className="app-logo">
        WagonWay<span className="partner-tag">Partner Portal</span>
      </div>
      {user && (
        <div className="user-badge">
          <span className="user-email">{user.email}</span>
          <button onClick={logout} className="btn-secondary">Sign Out</button>
        </div>
      )}
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="wagonway-app">
          {/* Layout Font Engine Hooks */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
          
          <NavigationHeader />

          <main className="app-main">
            <Routes>
              {/* Public Views */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Secure App Routing Pipeline */}
              <Route path="/dashboard" element={
                <SecureRoute>
                  <Dashboard />
                </SecureRoute>
              } />

              {/* Universal Fallback Router */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;