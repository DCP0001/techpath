import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    skillLevel: 'beginner',
    learningGoals: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const skillLevels = [
    { value: 'beginner', label: 'Beginner - New to programming' },
    { value: 'intermediate', label: 'Intermediate - Some experience' },
    { value: 'advanced', label: 'Advanced - Experienced developer' },
    { value: 'expert', label: 'Expert - Senior/Lead developer' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Simulate successful registration
      navigate('/learning-dashboard');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? 'border-error' : ''}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'border-error' : ''}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleInputChange}
          className={errors.password ? 'border-error' : ''}
          required
        />
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={errors.confirmPassword ? 'border-error' : ''}
          required
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="skillLevel" className="block text-sm font-medium text-text-primary mb-2">
          Current Skill Level
        </label>
        <select
          id="skillLevel"
          name="skillLevel"
          value={formData.skillLevel}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth bg-surface"
        >
          {skillLevels.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="learningGoals" className="block text-sm font-medium text-text-primary mb-2">
          Learning Goals (Optional)
        </label>
        <textarea
          id="learningGoals"
          name="learningGoals"
          placeholder="What do you want to achieve? e.g., Learn React, Master Python, Get a job in tech..."
          value={formData.learningGoals}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth bg-surface resize-none"
        />
      </div>

      <div>
        <label className="flex items-start">
          <Input
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className={`mr-3 mt-1 ${errors.agreeToTerms ? 'border-error' : ''}`}
            required
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <a href="#" className="text-primary hover:text-primary-700 transition-smooth">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary-700 transition-smooth">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.agreeToTerms}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Start Learning'}
      </Button>
    </form>
  );
};

export default RegisterForm;