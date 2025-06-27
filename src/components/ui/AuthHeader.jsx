import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <header className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/user-registration-login" 
              className="flex items-center space-x-2 group transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-white"
                >
                  <path 
                    d="M12 2L2 7L12 12L22 7L12 2Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M2 17L12 22L22 17" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M2 12L12 17L22 12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                TechPath
              </span>
            </Link>
          </div>

          {/* Minimal Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              to="/user-registration-login"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-smooth"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;