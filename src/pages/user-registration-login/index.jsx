import React, { useState } from 'react';
import AuthHeader from '../../components/ui/AuthHeader';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import AuthBenefits from './components/AuthBenefits';

const UserRegistrationLogin = () => {
  const [activeMode, setActiveMode] = useState('login');

  const handleModeChange = (mode) => {
    setActiveMode(mode);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      
      <div className="flex min-h-screen pt-16">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                {activeMode === 'login' ? 'Welcome Back' : 'Join TechPath'}
              </h1>
              <p className="text-text-secondary">
                {activeMode === 'login' ?'Continue your learning journey' :'Start your tech career transformation'
                }
              </p>
            </div>

            {/* Auth Toggle */}
            <AuthToggle activeMode={activeMode} onModeChange={handleModeChange} />

            {/* Auth Forms */}
            <div className="bg-surface rounded-lg shadow-sm border border-border p-6 sm:p-8">
              {activeMode === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>

            {/* Social Authentication */}
            <div className="bg-surface rounded-lg shadow-sm border border-border p-6 sm:p-8">
              <SocialAuth />
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <p className="text-sm text-text-secondary">
                {activeMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                {' '}
                <button
                  onClick={() => setActiveMode(activeMode === 'login' ? 'register' : 'login')}
                  className="text-primary hover:text-primary-700 font-medium transition-smooth"
                >
                  {activeMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-xs text-text-tertiary">
                <a href="#" className="hover:text-text-secondary transition-smooth">
                  Help Center
                </a>
                <span>•</span>
                <a href="#" className="hover:text-text-secondary transition-smooth">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-text-secondary transition-smooth">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Sidebar - Desktop Only */}
        <AuthBenefits />
      </div>
    </div>
  );
};

export default UserRegistrationLogin;