import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AnalyticsFilters from './components/AnalyticsFilters';
import MetricCard from './components/MetricCard';
import LearningStreakChart from './components/LearningStreakChart';
import SkillProgressChart from './components/SkillProgressChart';
import TimeInvestmentChart from './components/TimeInvestmentChart';
import AchievementTimeline from './components/AchievementTimeline';
import SocialShareModal from './components/SocialShareModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProgressAnalyticsDashboard = () => {
  const [filtersCollapsed, setFiltersCollapsed] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: '30days',
    skillCategory: 'all',
    roadmapId: 'all'
  });

  // Mock data for key metrics
  const keyMetrics = [
    {
      title: "Skills Mastered",
      value: "24",
      subtitle: "Across 6 categories",
      icon: "Award",
      trend: "up",
      trendValue: "+3",
      color: "success"
    },
    {
      title: "Current Streak",
      value: "14 days",
      subtitle: "Personal best: 21 days",
      icon: "Flame",
      trend: "up",
      trendValue: "+2",
      color: "warning"
    },
    {
      title: "Study Time",
      value: "5.2h",
      subtitle: "Daily average",
      icon: "Clock",
      trend: "up",
      trendValue: "+0.8h",
      color: "primary"
    },
    {
      title: "Completion Rate",
      value: "87%",
      subtitle: "This month",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+12%",
      color: "secondary"
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Here you would typically fetch new data based on filters
  };

  const handleShareAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    setShareModalOpen(true);
  };

  const handleExportReport = () => {
    // Mock export functionality
    const reportData = {
      period: filters.dateRange,
      category: filters.skillCategory,
      roadmap: filters.roadmapId,
      metrics: keyMetrics,
      generatedAt: new Date().toISOString()
    };
    
    // In a real app, this would generate and download a PDF
    console.log('Exporting report:', reportData);
    alert('Report export functionality would be implemented here');
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Update metrics or refresh data
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-18 pb-16 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
                Progress Analytics
              </h1>
              <p className="text-text-secondary mt-2">
                Track your learning journey and celebrate achievements
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                onClick={() => handleShareAchievement({
                  title: "Learning Progress",
                  description: "Check out my learning progress on TechPath!"
                })}
              >
                Share Progress
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Download"
                onClick={handleExportReport}
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* Analytics Filters */}
          <AnalyticsFilters
            onFiltersChange={handleFiltersChange}
            isCollapsed={filtersCollapsed}
            onToggleCollapse={() => setFiltersCollapsed(!filtersCollapsed)}
          />

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                trend={metric.trend}
                trendValue={metric.trendValue}
                color={metric.color}
              />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Learning Streak Chart */}
            <LearningStreakChart />
            
            {/* Time Investment Chart */}
            <TimeInvestmentChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Skills Progress Chart */}
            <SkillProgressChart />
            
            {/* Achievement Timeline */}
            <AchievementTimeline />
          </div>

          {/* Quick Actions */}
          <div className="bg-surface rounded-xl border border-border p-6 elevation-1">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                iconName="BookOpen"
                onClick={() => {}}
                className="justify-start"
              >
                Continue Learning
              </Button>
              <Button
                variant="outline"
                iconName="Target"
                onClick={() => {}}
                className="justify-start"
              >
                Set New Goal
              </Button>
              <Button
                variant="outline"
                iconName="Users"
                onClick={() => {}}
                className="justify-start"
              >
                Join Study Group
              </Button>
              <Button
                variant="outline"
                iconName="Calendar"
                onClick={() => {}}
                className="justify-start"
              >
                Schedule Study
              </Button>
            </div>
          </div>

          {/* Motivational Section */}
          <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary text-white rounded-lg">
                <Icon name="Trophy" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary">
                  You're doing great! 🎉
                </h3>
                <p className="text-text-secondary">
                  You've completed 87% of your monthly learning goals. Keep up the momentum!
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                iconName="ArrowRight"
                onClick={() => {}}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
      
      <SocialShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        achievement={selectedAchievement}
      />
    </div>
  );
};

export default ProgressAnalyticsDashboard;