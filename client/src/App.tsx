
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import RoutesPage from './pages/Routes';
import Students from './pages/Students';
import Fees from './pages/Fees';
import Reports from './pages/Reports';
import Layout from './components/layout/Layout';
import DriverDashboard from './pages/driver/Dashboard';
import ParentDashboard from './pages/parent/Dashboard';

interface ProtectedRouteProps {
  children: React.ReactElement;
  roles?: string[]; // Allowed roles
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    if (user.role === 'driver') return <Navigate to="/" replace />;
    if (user.role === 'parent') return <Navigate to="/" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

// Component to decide which dashboard to show based on role
const RoleBasedHome = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'driver') return <DriverDashboard />;
  if (user.role === 'parent') return <ParentDashboard />;
  if (user.role === 'admin' || user.role === 'superadmin') return <Dashboard />;

  return <div>Unknown Role</div>;
};

// Wrapper to conditionally render Layout (Sidebar) only for admins
const LayoutWrapper = () => {
  const { user } = useAuth();
  if (user?.role === 'driver' || user?.role === 'parent') {
    return <RoleBasedHome />;
  }
  return <Layout />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute roles={['admin', 'superadmin', 'driver', 'parent']}>
              <LayoutWrapper />
            </ProtectedRoute>
          }>
            <Route index element={<RoleBasedHome />} />
            <Route path="students" element={<Students />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="fees" element={<Fees />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<div>Settings Page (Coming Soon)</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
