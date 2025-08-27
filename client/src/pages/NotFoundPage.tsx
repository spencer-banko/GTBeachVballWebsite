import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - GT Beach Volleyball Club</title>
      </Helmet>

      <div className="pt-16 section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-8xl font-bold text-gt-gold mb-6">404</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gt-navy mb-6">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sorry, the page you're looking for doesn't exist. 
              It might have been moved or deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary">
                Go Home
              </Link>
              <Link to="/interest" className="btn-outline">
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
