import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RoadmapVisualization = ({ 
  roadmapData, 
  selectedNode, 
  onNodeSelect, 
  completedNodes, 
  onNodeComplete,
  viewMode = 'interactive' 
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Mock roadmap data structure
  const mockNodes = [
    {
      id: 'html-basics',
      title: 'HTML Basics',
      description: 'Learn the fundamentals of HTML markup language',
      estimatedTime: '2 weeks',
      difficulty: 'Beginner',
      category: 'Frontend',
      x: 100,
      y: 100,
      prerequisites: [],
      resources: 3,
      completed: true
    },
    {
      id: 'css-fundamentals',
      title: 'CSS Fundamentals',
      description: 'Master styling with CSS including layouts and responsive design',
      estimatedTime: '3 weeks',
      difficulty: 'Beginner',
      category: 'Frontend',
      x: 300,
      y: 100,
      prerequisites: ['html-basics'],
      resources: 5,
      completed: true
    },
    {
      id: 'javascript-basics',
      title: 'JavaScript Basics',
      description: 'Learn programming fundamentals with JavaScript',
      estimatedTime: '4 weeks',
      difficulty: 'Intermediate',
      category: 'Frontend',
      x: 500,
      y: 100,
      prerequisites: ['html-basics', 'css-fundamentals'],
      resources: 8,
      completed: false
    },
    {
      id: 'react-fundamentals',
      title: 'React Fundamentals',
      description: 'Build interactive UIs with React library',
      estimatedTime: '6 weeks',
      difficulty: 'Intermediate',
      category: 'Frontend',
      x: 300,
      y: 300,
      prerequisites: ['javascript-basics'],
      resources: 12,
      completed: false
    },
    {
      id: 'node-js',
      title: 'Node.js',
      description: 'Server-side JavaScript development',
      estimatedTime: '5 weeks',
      difficulty: 'Intermediate',
      category: 'Backend',
      x: 100,
      y: 300,
      prerequisites: ['javascript-basics'],
      resources: 10,
      completed: false
    },
    {
      id: 'database-design',
      title: 'Database Design',
      description: 'Learn SQL and database fundamentals',
      estimatedTime: '4 weeks',
      difficulty: 'Intermediate',
      category: 'Backend',
      x: 500,
      y: 300,
      prerequisites: [],
      resources: 7,
      completed: false
    }
  ];

  const nodes = roadmapData?.nodes || mockNodes;

  // Calculate completion percentage
  const getNodeProgress = (nodeId) => {
    if (completedNodes.includes(nodeId)) return 100;
    if (nodeId === 'javascript-basics') return 65;
    if (nodeId === 'react-fundamentals') return 25;
    return 0;
  };

  // Get node color based on status
  const getNodeColor = (node) => {
    const progress = getNodeProgress(node.id);
    if (progress === 100) return 'var(--color-success)';
    if (progress > 0) return 'var(--color-warning)';
    return 'var(--color-border-secondary)';
  };

  // Handle zoom
  const handleZoom = (delta) => {
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);
  };

  // Handle pan start
  const handlePanStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  // Handle pan move
  const handlePanMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  // Handle pan end
  const handlePanEnd = () => {
    setIsDragging(false);
  };

  // Center roadmap on mount
  useEffect(() => {
    if (containerRef.current && nodes.length > 0) {
      const container = containerRef.current.getBoundingClientRect();
      const centerX = container.width / 2 - 300;
      const centerY = container.height / 2 - 200;
      setPosition({ x: centerX, y: centerY });
    }
  }, [nodes]);

  // Render connection lines
  const renderConnections = () => {
    return nodes.map(node => 
      node.prerequisites.map(prereqId => {
        const prereqNode = nodes.find(n => n.id === prereqId);
        if (!prereqNode) return null;
        
        return (
          <line
            key={`${prereqId}-${node.id}`}
            x1={prereqNode.x + 60}
            y1={prereqNode.y + 60}
            x2={node.x + 60}
            y2={node.y + 60}
            stroke="var(--color-border-secondary)"
            strokeWidth="2"
            strokeDasharray={getNodeProgress(prereqId) === 100 ? "0" : "5,5"}
            className="transition-all duration-300"
          />
        );
      })
    ).flat().filter(Boolean);
  };

  // Render skill nodes
  const renderNodes = () => {
    return nodes.map(node => {
      const progress = getNodeProgress(node.id);
      const isSelected = selectedNode?.id === node.id;
      const nodeColor = getNodeColor(node);
      
      return (
        <g key={node.id} className="cursor-pointer">
          {/* Progress ring */}
          <circle
            cx={node.x + 60}
            cy={node.y + 60}
            r="58"
            fill="none"
            stroke="var(--color-border-tertiary)"
            strokeWidth="4"
          />
          {progress > 0 && (
            <circle
              cx={node.x + 60}
              cy={node.y + 60}
              r="58"
              fill="none"
              stroke={nodeColor}
              strokeWidth="4"
              strokeDasharray={`${(progress / 100) * 364} 364`}
              strokeLinecap="round"
              transform={`rotate(-90 ${node.x + 60} ${node.y + 60})`}
              className="transition-all duration-500"
            />
          )}
          
          {/* Node circle */}
          <circle
            cx={node.x + 60}
            cy={node.y + 60}
            r="50"
            fill={isSelected ? 'var(--color-primary-50)' : 'var(--color-surface)'}
            stroke={isSelected ? 'var(--color-primary)' : nodeColor}
            strokeWidth={isSelected ? "3" : "2"}
            className="transition-all duration-300 hover:stroke-primary"
            onClick={() => onNodeSelect(node)}
          />
          
          {/* Completion checkmark */}
          {progress === 100 && (
            <g>
              <circle
                cx={node.x + 85}
                cy={node.y + 35}
                r="12"
                fill="var(--color-success)"
                className="drop-shadow-sm"
              />
              <path
                d={`M${node.x + 80} ${node.y + 35} l3 3 l6 -6`}
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
          
          {/* Node content */}
          <text
            x={node.x + 60}
            y={node.y + 55}
            textAnchor="middle"
            className="text-sm font-medium fill-text-primary pointer-events-none"
            style={{ fontSize: '12px' }}
          >
            {node.title.length > 12 ? `${node.title.substring(0, 12)}...` : node.title}
          </text>
          <text
            x={node.x + 60}
            y={node.y + 70}
            textAnchor="middle"
            className="text-xs fill-text-secondary pointer-events-none"
            style={{ fontSize: '10px' }}
          >
            {node.estimatedTime}
          </text>
        </g>
      );
    });
  };

  if (viewMode === 'linear') {
    return (
      <div className="space-y-4">
        {nodes.map((node, index) => {
          const progress = getNodeProgress(node.id);
          const isSelected = selectedNode?.id === node.id;
          
          return (
            <div
              key={node.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200 bg-surface'
              }`}
              onClick={() => onNodeSelect(node)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      progress === 100 
                        ? 'bg-success border-success' 
                        : progress > 0 
                        ? 'bg-warning border-warning' :'bg-surface border-border-secondary'
                    }`}>
                      {progress === 100 ? (
                        <Icon name="Check" size={16} className="text-white" />
                      ) : (
                        <span className="text-xs font-medium text-text-primary">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    {progress > 0 && progress < 100 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full border-2 border-surface"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{node.title}</h3>
                    <p className="text-sm text-text-secondary">{node.estimatedTime} • {node.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-secondary">{progress}%</span>
                  <Icon name="ChevronRight" size={16} className="text-text-tertiary" />
                </div>
              </div>
              {progress > 0 && (
                <div className="w-full bg-border-tertiary rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      progress === 100 ? 'bg-success' : 'bg-warning'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-surface-secondary rounded-lg overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={() => handleZoom(0.1)}
          className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center hover:bg-surface-secondary transition-colors"
        >
          <Icon name="Plus" size={16} />
        </button>
        <button
          onClick={() => handleZoom(-0.1)}
          className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center hover:bg-surface-secondary transition-colors"
        >
          <Icon name="Minus" size={16} />
        </button>
      </div>

      {/* Scale indicator */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-surface border border-border rounded-full text-sm text-text-secondary">
        {Math.round(scale * 100)}%
      </div>

      {/* SVG Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handlePanStart}
        onMouseMove={handlePanMove}
        onMouseUp={handlePanEnd}
        onMouseLeave={handlePanEnd}
        onTouchStart={handlePanStart}
        onTouchMove={handlePanMove}
        onTouchEnd={handlePanEnd}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          className="w-full h-full"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Grid pattern */}
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="var(--color-border-tertiary)"
                strokeWidth="1"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Render connections */}
          {renderConnections()}
          
          {/* Render nodes */}
          {renderNodes()}
        </svg>
      </div>

      {/* Mobile touch instructions */}
      <div className="lg:hidden absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-surface border border-border rounded-lg p-3 text-center">
          <p className="text-sm text-text-secondary">
            Tap nodes to view details • Pinch to zoom • Drag to pan
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapVisualization;