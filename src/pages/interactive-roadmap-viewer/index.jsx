import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoadmapVisualization from './components/RoadmapVisualization';
import SkillDetailsPanel from './components/SkillDetailsPanel';
import RoadmapFilters from './components/RoadmapFilters';
import ProgressIndicator from './components/ProgressIndicator';
import FloatingActionButton from './components/FloatingActionButton';

const InteractiveRoadmapViewer = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [completedNodes, setCompletedNodes] = useState(['html-basics', 'css-fundamentals']);
  const [bookmarkedNodes, setBookmarkedNodes] = useState(['javascript-basics']);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState('frontend-developer');
  const [viewMode, setViewMode] = useState('interactive');
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    difficulty: [],
    status: [],
    estimatedTime: []
  });

  // Handle node selection
  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    // On mobile, open details panel
    if (window.innerWidth < 1024) {
      setIsMobileDetailsOpen(true);
    }
  };

  // Handle node completion
  const handleNodeComplete = (nodeId) => {
    if (!completedNodes.includes(nodeId)) {
      setCompletedNodes([...completedNodes, nodeId]);
    }
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = (nodeId) => {
    if (bookmarkedNodes.includes(nodeId)) {
      setBookmarkedNodes(bookmarkedNodes.filter(id => id !== nodeId));
    } else {
      setBookmarkedNodes([...bookmarkedNodes, nodeId]);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle roadmap change
  const handleRoadmapChange = (roadmapId) => {
    setSelectedRoadmap(roadmapId);
    setSelectedNode(null);
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'interactive' ? 'linear' : 'interactive');
  };

  // Close mobile details panel
  const closeMobileDetails = () => {
    setIsMobileDetailsOpen(false);
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileDetailsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 lg:pt-18 pb-16 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                Interactive Roadmap Viewer
              </h1>
              <p className="text-text-secondary">
                Navigate your learning journey with interactive skill roadmaps
              </p>
            </div>
            
            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                iconName="Filter"
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              >
                Filters
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName={viewMode === 'interactive' ? 'List' : 'Network'}
                onClick={toggleViewMode}
              >
                {viewMode === 'interactive' ? 'Linear View' : 'Interactive View'}
              </Button>
              <Link to="/roadmap-creation-studio">
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Plus"
                >
                  Create Roadmap
                </Button>
              </Link>
            </div>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            totalSkills={16}
            completedSkills={completedNodes.length}
            inProgressSkills={2}
            roadmapTitle="Frontend Developer Roadmap"
            estimatedCompletion="4 months remaining"
          />

          {/* Main Content Layout */}
          <div className="flex gap-6 h-[calc(100vh-280px)] lg:h-[calc(100vh-320px)]">
            {/* Filter Panel - Desktop */}
            {isFilterPanelOpen && (
              <div className="hidden lg:block w-80 flex-shrink-0">
                <RoadmapFilters
                  onFilterChange={handleFilterChange}
                  isCollapsed={false}
                  onToggleCollapse={() => setIsFilterPanelOpen(false)}
                  selectedRoadmap={selectedRoadmap}
                  onRoadmapChange={handleRoadmapChange}
                />
              </div>
            )}

            {/* Roadmap Visualization */}
            <div className={`flex-1 ${selectedNode && !isMobileDetailsOpen ? 'lg:w-2/3' : 'w-full'}`}>
              <div className="h-full bg-surface rounded-lg border border-border overflow-hidden">
                <RoadmapVisualization
                  selectedNode={selectedNode}
                  onNodeSelect={handleNodeSelect}
                  completedNodes={completedNodes}
                  onNodeComplete={handleNodeComplete}
                  viewMode={viewMode}
                />
              </div>
            </div>

            {/* Skill Details Panel - Desktop */}
            {selectedNode && !isMobileDetailsOpen && (
              <div className="hidden lg:block w-96 flex-shrink-0">
                <SkillDetailsPanel
                  selectedNode={selectedNode}
                  onClose={() => setSelectedNode(null)}
                  onMarkComplete={handleNodeComplete}
                  onBookmark={handleBookmarkToggle}
                  isBookmarked={bookmarkedNodes.includes(selectedNode?.id)}
                  isMobile={false}
                />
              </div>
            )}
          </div>

          {/* Empty State */}
          {!selectedNode && viewMode === 'interactive' && (
            <div className="lg:hidden mt-8 text-center py-12">
              <Icon name="MousePointer2" size={48} className="mx-auto mb-4 text-text-tertiary" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Select a Skill Node
              </h3>
              <p className="text-text-secondary">
                Tap on any skill in the roadmap to view details and resources
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isFilterPanelOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full">
            <RoadmapFilters
              onFilterChange={handleFilterChange}
              isCollapsed={false}
              onToggleCollapse={() => setIsFilterPanelOpen(false)}
              selectedRoadmap={selectedRoadmap}
              onRoadmapChange={handleRoadmapChange}
            />
          </div>
        </div>
      )}

      {/* Mobile Details Panel */}
      {isMobileDetailsOpen && selectedNode && (
        <div className="lg:hidden">
          <SkillDetailsPanel
            selectedNode={selectedNode}
            onClose={closeMobileDetails}
            onMarkComplete={handleNodeComplete}
            onBookmark={handleBookmarkToggle}
            isBookmarked={bookmarkedNodes.includes(selectedNode?.id)}
            isMobile={true}
          />
        </div>
      )}

      {/* Floating Action Button - Mobile */}
      <FloatingActionButton
        onShowDetails={() => selectedNode && setIsMobileDetailsOpen(true)}
        onToggleView={toggleViewMode}
        viewMode={viewMode}
        selectedNode={selectedNode}
        hasSelectedNode={!!selectedNode}
      />

      {/* Mobile Filter FAB */}
      <RoadmapFilters
        onFilterChange={handleFilterChange}
        isCollapsed={!isFilterPanelOpen}
        onToggleCollapse={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
        selectedRoadmap={selectedRoadmap}
        onRoadmapChange={handleRoadmapChange}
      />

      <BottomTabNavigation />
    </div>
  );
};

export default InteractiveRoadmapViewer;