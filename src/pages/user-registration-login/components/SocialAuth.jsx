import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const SocialAuth = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'GitHub',
      icon: 'Github',
      color: 'text-gray-800',
      bgColor: 'hover:bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  const handleSocialAuth = async (provider) => {
    setLoadingProvider(provider.name);
    
    // Simulate social auth process
    setTimeout(() => {
      navigate('/learning-dashboard');
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => handleSocialAuth(provider)}
            disabled={loadingProvider !== null}
            className={`flex items-center justify-center px-4 py-3 border ${provider.borderColor} rounded-lg ${provider.bgColor} transition-smooth group ${
              loadingProvider === provider.name ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-sm'
            }`}
          >
            {loadingProvider === provider.name ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Icon 
                name={provider.icon} 
                size={20} 
                className={`${provider.color} group-hover:scale-110 transition-transform`}
              />
            )}
            <span className="ml-2 text-sm font-medium text-text-primary hidden sm:inline">
              {provider.name}
            </span>
          </button>
        ))}
      </div>

      <p className="text-xs text-text-tertiary text-center">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default SocialAuth;