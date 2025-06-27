import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoadmapCanvas = ({ 
  nodes, 
  connections, 
  onNodeAdd, 
  onNodeUpdate, 
  onNodeDelete, 
  onConnectionAdd, 
  onConnectionDelete,
  selectedNode,
  onNodeSelect 
}) => {
  const canvasRef = useRef(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const skillData = JSON.parse(e.dataTransfer.getData('application/json'));
      const newNode = {
        id: `node-${Date.now()}`,
        ...skillData,
        x: x - 60, // Center the node
        y: y - 30,
        width: 120,
        height: 60
      };
      onNodeAdd(newNode);
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  }, [onNodeAdd]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleNodeMouseDown = (e, node) => {
    e.stopPropagation();
    setDraggedNode(node);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    });
    onNodeSelect(node);
  };

  const handleMouseMove = useCallback((e) => {
    if (draggedNode) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      onNodeUpdate(draggedNode.id, { x: newX, y: newY });
    }
  }, [draggedNode, dragOffset, onNodeUpdate]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const handleConnectionStart = (nodeId) => {
    setIsConnecting(true);
    setConnectionStart(nodeId);
  };

  const handleConnectionEnd = (nodeId) => {
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      onConnectionAdd(connectionStart, nodeId);
    }
    setIsConnecting(false);
    setConnectionStart(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "border-success bg-success-50";
      case "Intermediate": return "border-warning bg-warning-50";
      case "Advanced": return "border-error bg-error-50";
      default: return "border-border bg-surface";
    }
  };

  const renderConnections = () => {
    return connections.map(connection => {
      const fromNode = nodes.find(n => n.id === connection.from);
      const toNode = nodes.find(n => n.id === connection.to);
      
      if (!fromNode || !toNode) return null;

      const fromX = fromNode.x + fromNode.width / 2;
      const fromY = fromNode.y + fromNode.height / 2;
      const toX = toNode.x + toNode.width / 2;
      const toY = toNode.y + toNode.height / 2;

      return (
        <g key={`${connection.from}-${connection.to}`}>
          <line
            x1={fromX}
            y1={fromY}
            x2={toX}
            y2={toY}
            stroke="var(--color-primary)"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <circle
            cx={(fromX + toX) / 2}
            cy={(fromY + toY) / 2}
            r="8"
            fill="var(--color-error)"
            className="cursor-pointer hover:fill-red-600"
            onClick={() => onConnectionDelete(connection.from, connection.to)}
          >
            <title>Delete Connection</title>
          </circle>
        </g>
      );
    });
  };

  return (
    <div className="flex-1 relative bg-surface-secondary overflow-hidden">
      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full relative cursor-crosshair"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={() => onNodeSelect(null)}
      >
        {/* Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="var(--color-primary)"
              />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {renderConnections()}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute cursor-move select-none transition-smooth ${
              selectedNode?.id === node.id ? 'ring-2 ring-primary' : ''
            }`}
            style={{
              left: node.x,
              top: node.y,
              width: node.width,
              height: node.height
            }}
            onMouseDown={(e) => handleNodeMouseDown(e, node)}
          >
            <div className={`w-full h-full rounded-lg border-2 p-2 shadow-md hover:shadow-lg transition-smooth ${getDifficultyColor(node.difficulty)}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                  <span className="text-xs font-medium text-text-primary truncate">
                    {node.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNodeDelete(node.id);
                  }}
                  className="text-text-tertiary hover:text-error transition-smooth"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
              
              <div className="text-xs text-text-secondary mb-1 truncate">
                {node.duration}
              </div>
              
              {/* Connection Points */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isConnecting ? handleConnectionEnd(node.id) : handleConnectionStart(node.id);
                  }}
                  className="w-3 h-3 bg-primary rounded-full border-2 border-white hover:bg-primary-700 transition-smooth"
                  title={isConnecting ? "Connect here" : "Start connection"}
                />
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isConnecting ? handleConnectionEnd(node.id) : handleConnectionStart(node.id);
                  }}
                  className="w-3 h-3 bg-primary rounded-full border-2 border-white hover:bg-primary-700 transition-smooth"
                  title={isConnecting ? "Connect here" : "Start connection"}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Plus" size={48} className="text-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Start Building Your Roadmap
              </h3>
              <p className="text-text-secondary max-w-md">
                Drag skills from the library to create your learning path. Connect them to show prerequisites and learning flow.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="sm"
          iconName="ZoomIn"
          className="shadow-lg"
          onClick={() => {}}
        >
          <span className="sr-only">Zoom In</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          iconName="ZoomOut"
          className="shadow-lg"
          onClick={() => {}}
        >
          <span className="sr-only">Zoom Out</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          iconName="RotateCcw"
          className="shadow-lg"
          onClick={() => {}}
        >
          <span className="sr-only">Reset View</span>
        </Button>
      </div>

      {/* Connection Mode Indicator */}
      {isConnecting && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Link" size={16} />
            <span className="text-sm font-medium">Click another node to connect</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapCanvas;