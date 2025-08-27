import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { interestApi } from '../utils/api';
import { InterestSubmission } from '../types';

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

const InterestSubmissions = () => {
  const [submissions, setSubmissions] = React.useState<InterestSubmission[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await interestApi.getAdmin();
        setSubmissions(data.data || []);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Error loading submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-gt-navy mb-4">Interest Submissions</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-gt-navy mb-4">Interest Submissions</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gt-navy mb-4">Interest Submissions</h2>
      {submissions.length === 0 ? (
        <p className="text-gray-600">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission: InterestSubmission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.phone || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.affiliation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.experienceLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

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
