import React from 'react';

const AuthToggle = ({ activeMode, onModeChange }) => {
  return (
    <div className="flex bg-surface-secondary rounded-lg p-1 mb-8">
      <button
        onClick={() => onModeChange('login')}
        className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-smooth ${
          activeMode === 'login' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => onModeChange('register')}
        className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-smooth ${
          activeMode === 'register' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default AuthToggle;