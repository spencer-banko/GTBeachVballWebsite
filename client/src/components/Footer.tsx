import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gt-navy text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Club Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/images/logo.png"
                alt="GT Beach Volleyball Club"
                className="h-8 w-auto"
              />
              <h3 className="text-lg font-bold">GT Beach Volleyball</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Building a strong beach volleyball community at Georgia Tech. 
              All skill levels welcome!
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <EnvelopeIcon className="h-5 w-5" />
              <a 
                href="mailto:beachvolleyball@gatech.edu"
                className="hover:text-gt-gold transition-colors duration-200"
              >
                beachvolleyball@gatech.edu
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/team" 
                  className="text-gray-300 hover:text-gt-gold transition-colors duration-200"
                >
                  Team Information
                </Link>
              </li>
              <li>
                <Link 
                  to="/execs" 
                  className="text-gray-300 hover:text-gt-gold transition-colors duration-200"
                >
                  Executive Board
                </Link>
              </li>
              <li>
                <Link 
                  to="/sponsors" 
                  className="text-gray-300 hover:text-gt-gold transition-colors duration-200"
                >
                  Sponsors
                </Link>
              </li>
              <li>
                <Link 
                  to="/interest" 
                  className="text-gray-300 hover:text-gt-gold transition-colors duration-200"
                >
                  Join Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Interest Form CTA */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Interested in Joining?</h4>
            <p className="text-gray-300 mb-4">
              Ready to spike, serve, and score with the GT Beach Volleyball Club? 
              Fill out our interest form and we'll get back to you!
            </p>
            <Link
              to="/interest"
              className="btn-secondary inline-block"
            >
              Join Our Interest List
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} Georgia Tech Beach Volleyball Club. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://instagram.com/gtbeachvolleyball"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gt-gold transition-colors duration-200"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="mailto:beachvolleyball@gatech.edu"
              className="text-gray-300 hover:text-gt-gold transition-colors duration-200"
            >
              <span className="sr-only">Email</span>
              <EnvelopeIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
