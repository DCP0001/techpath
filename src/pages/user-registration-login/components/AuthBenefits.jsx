import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthBenefits = () => {
  const benefits = [
    {
      icon: 'Map',
      title: 'Personalized Learning Paths',
      description: 'Get customized roadmaps based on your skill level and career goals'
    },
    {
      icon: 'TrendingUp',
      title: 'Track Your Progress',
      description: 'Monitor your learning journey with detailed analytics and achievements'
    },
    {
      icon: 'Users',
      title: 'Join the Community',
      description: 'Connect with fellow learners and share your knowledge'
    },
    {
      icon: 'BookOpen',
      title: 'Access Premium Content',
      description: 'Unlock exclusive study materials and advanced tutorials'
    }
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 text-white">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Start Your Tech Journey Today
          </h2>
          <p className="text-primary-100 text-lg">
            Join thousands of developers who are advancing their careers with structured learning paths.
          </p>
        </div>

        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name={benefit.icon} size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-primary-100 text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="User avatar"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                alt="User avatar"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                alt="User avatar"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
            <div className="text-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-primary-100 mt-1">4.9/5 from 2,500+ learners</p>
            </div>
          </div>
          <blockquote className="text-white text-sm italic">
            "TechPath helped me transition from marketing to software development in just 8 months. The structured approach made all the difference!"
          </blockquote>
          <cite className="text-primary-100 text-xs mt-2 block">
            - Sarah Chen, Full Stack Developer
          </cite>
        </div>
      </div>
    </div>
  );
};

export default AuthBenefits;