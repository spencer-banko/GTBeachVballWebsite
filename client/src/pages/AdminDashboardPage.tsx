import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Placeholder components for admin sections
const DashboardHome = () => (
  <div className="card">
    <h2 className="text-2xl font-bold text-gt-navy mb-4">Dashboard Overview</h2>
    <p className="text-gray-600">
      Welcome to the admin dashboard. Use the navigation to manage club content.
    </p>
  </div>
);

const ExecutivesManager = () => (
  <div className="card">
    <h2 className="text-2xl font-bold text-gt-navy mb-4">Executives Manager</h2>
    <p className="text-gray-600">
      Manage executive board members, their roles, and visibility.
    </p>
  </div>
);

const SponsorsManager = () => (
  <div className="card">
    <h2 className="text-2xl font-bold text-gt-navy mb-4">Sponsors Manager</h2>
    <p className="text-gray-600">
      Manage sponsors and control which sponsor is currently active.
    </p>
  </div>
);

const InterestSubmissions = () => (
  <div className="card">
    <h2 className="text-2xl font-bold text-gt-navy mb-4">Interest Submissions</h2>
    <p className="text-gray-600">
      View and manage interest form submissions from potential members.
    </p>
  </div>
);

export const AdminDashboardPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - GT Beach Volleyball Club</title>
      </Helmet>

      <div className="pt-16">
        {/* Admin Header */}
        <div className="bg-gt-navy text-white">
          <div className="container-max px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <button
                onClick={logout}
                className="text-white hover:text-gt-gold transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="container-max px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64">
              <nav className="space-y-2">
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 rounded-lg text-gt-navy hover:bg-gt-gold/10 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/executives"
                  className="block px-4 py-2 rounded-lg text-gt-navy hover:bg-gt-gold/10 transition-colors duration-200"
                >
                  Executives
                </Link>
                <Link
                  to="/admin/sponsors"
                  className="block px-4 py-2 rounded-lg text-gt-navy hover:bg-gt-gold/10 transition-colors duration-200"
                >
                  Sponsors
                </Link>
                <Link
                  to="/admin/interest"
                  className="block px-4 py-2 rounded-lg text-gt-navy hover:bg-gt-gold/10 transition-colors duration-200"
                >
                  Interest Submissions
                </Link>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/executives" element={<ExecutivesManager />} />
                <Route path="/sponsors" element={<SponsorsManager />} />
                <Route path="/interest" element={<InterestSubmissions />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
