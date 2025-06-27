import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProgressOverviewCard from './components/ProgressOverviewCard';
import ActivityFeedCard from './components/ActivityFeedCard';
import RecommendationsSection from './components/RecommendationsSection';
import ContinueLearningSection from './components/ContinueLearningSection';
import AchievementBadges from './components/AchievementBadges';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';

const LearningDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    level: "Intermediate Developer",
    joinDate: "January 2024",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock active roadmaps data
  const activeRoadmaps = [
    {
      id: 1,
      title: 'React Development',
      category: 'Frontend',
      completedSkills: 12,
      totalSkills: 18,
      timeSpent: 45,
      estimatedTime: 25,
      icon: 'Code2',
      color: 'bg-primary'
    },
    {
      id: 2,
      title: 'JavaScript Mastery',
      category: 'Programming',
      completedSkills: 8,
      totalSkills: 15,
      timeSpent: 32,
      estimatedTime: 18,
      icon: 'Zap',
      color: 'bg-warning'
    },
    {
      id: 3,
      title: 'Node.js Backend',
      category: 'Backend',
      completedSkills: 5,
      totalSkills: 20,
      timeSpent: 15,
      estimatedTime: 45,
      icon: 'Server',
      color: 'bg-accent'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-secondary rounded-xl h-48"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-secondary rounded-xl h-64"></div>
        <div className="bg-surface-secondary rounded-xl h-64"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 lg:pt-18 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <LoadingSkeleton />
          </div>
        </main>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-18 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">
                  Welcome back, {userData.name}! 👋
                </h1>
                <p className="text-text-secondary mt-2">
                  Ready to continue your learning journey? You're making great progress!
                </p>
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon 
                  name="RefreshCw" 
                  size={18} 
                  className={refreshing ? 'animate-spin' : ''} 
                />
                <span className="text-sm font-medium">
                  {refreshing ? 'Updating...' : 'Refresh'}
                </span>
              </button>
            </div>

            {/* User Stats Bar */}
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>Joined {userData.joinDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} />
                <span>{userData.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Flame" size={16} />
                <span>12-day streak</span>
              </div>
            </div>
          </div>

          {/* Continue Learning Section - Full Width */}
          <div className="mb-8">
            <ContinueLearningSection />
          </div>

          {/* Progress Overview Cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">
              Your Active Roadmaps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRoadmaps.map((roadmap) => (
                <ProgressOverviewCard key={roadmap.id} roadmap={roadmap} />
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeedCard />
            </div>

            {/* Right Column - Quick Actions */}
            <div className="lg:col-span-1">
              <QuickActionsPanel />
            </div>

            {/* Third Column - Achievements */}
            <div className="lg:col-span-1">
              <AchievementBadges />
            </div>
          </div>

          {/* Recommendations Section - Full Width */}
          <div className="mb-8">
            <RecommendationsSection />
          </div>

          {/* Mobile Pull-to-Refresh Indicator */}
          {refreshing && (
            <div className="lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-surface border border-border rounded-full px-4 py-2 elevation-2 flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} className="animate-spin text-primary" />
                <span className="text-sm font-medium text-text-primary">Updating...</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default LearningDashboard;