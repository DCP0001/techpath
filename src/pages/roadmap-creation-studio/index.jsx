import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';

// Import all components
import CreationHeader from './components/CreationHeader';
import SkillLibrary from './components/SkillLibrary';
import RoadmapCanvas from './components/RoadmapCanvas';
import NodePropertiesPanel from './components/NodePropertiesPanel';
import TemplateSelector from './components/TemplateSelector';
import MobileToolbar from './components/MobileToolbar';

const RoadmapCreationStudio = () => {
  // State management
  const [roadmapTitle, setRoadmapTitle] = useState("My Learning Roadmap");
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // History management
  const saveToHistory = useCallback(() => {
    const state = { nodes, connections };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [nodes, connections, history, historyIndex]);

  // Node management
  const handleNodeAdd = useCallback((newNode) => {
    setNodes(prev => [...prev, { ...newNode, width: 120, height: 60 }]);
    saveToHistory();
  }, [saveToHistory]);

  const handleNodeUpdate = useCallback((nodeId, updates) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(prev => ({ ...prev, ...updates }));
    }
  }, [selectedNode]);

  const handleNodeDelete = useCallback((nodeId) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => 
      conn.from !== nodeId && conn.to !== nodeId
    ));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
      setIsPropertiesPanelOpen(false);
    }
    saveToHistory();
  }, [selectedNode, saveToHistory]);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
    setIsPropertiesPanelOpen(!!node);
  }, []);

  // Connection management
  const handleConnectionAdd = useCallback((fromId, toId) => {
    const connectionExists = connections.some(conn => 
      conn.from === fromId && conn.to === toId
    );
    if (!connectionExists) {
      setConnections(prev => [...prev, { from: fromId, to: toId }]);
      saveToHistory();
    }
  }, [connections, saveToHistory]);

  const handleConnectionDelete = useCallback((fromId, toId) => {
    setConnections(prev => prev.filter(conn => 
      !(conn.from === fromId && conn.to === toId)
    ));
    saveToHistory();
  }, [saveToHistory]);

  // History actions
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setConnections(prevState.connections);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setConnections(nextState.connections);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  // Template handling
  const handleTemplateSelect = useCallback((template) => {
    if (template) {
      setNodes(template.nodes.map(node => ({ ...node, width: 120, height: 60 })));
      setConnections(template.connections);
      setRoadmapTitle(template.name);
    }
    setIsTemplateModalOpen(false);
    saveToHistory();
  }, [saveToHistory]);

  // Save actions
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
  }, []);

  const handlePublish = useCallback(async () => {
    if (nodes.length === 0) {
      alert("Please add at least one skill node before publishing.");
      return;
    }
    
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    // Show success message and redirect
  }, [nodes]);

  // Toggle functions
  const toggleLibrary = useCallback(() => {
    setIsLibraryOpen(prev => !prev);
  }, []);

  const togglePropertiesPanel = useCallback(() => {
    setIsPropertiesPanelOpen(prev => !prev);
    if (isPropertiesPanelOpen) {
      setSelectedNode(null);
    }
  }, [isPropertiesPanelOpen]);

  const openTemplateModal = useCallback(() => {
    setIsTemplateModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-16 lg:pt-18 pb-16 lg:pb-0">
        {/* Breadcrumb - Desktop Only */}
        <div className="hidden lg:block px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>

        {/* Creation Header */}
        <CreationHeader
          roadmapTitle={roadmapTitle}
          onTitleChange={setRoadmapTitle}
          onSave={handleSave}
          onPublish={handlePublish}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          isSaving={isSaving}
        />

        {/* Main Workspace */}
        <div className="flex h-[calc(100vh-8rem)] lg:h-[calc(100vh-10rem)]">
          {/* Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-between px-4 py-2 bg-surface-secondary border-b border-border">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Layout"
                  onClick={openTemplateModal}
                  className="text-text-secondary"
                >
                  Templates
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Library"
                  onClick={toggleLibrary}
                  className={isLibraryOpen ? "text-primary" : "text-text-secondary"}
                >
                  Skill Library
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <span>{nodes.length} skills</span>
                <span>•</span>
                <span>{connections.length} connections</span>
              </div>
            </div>

            {/* Canvas */}
            <RoadmapCanvas
              nodes={nodes}
              connections={connections}
              onNodeAdd={handleNodeAdd}
              onNodeUpdate={handleNodeUpdate}
              onNodeDelete={handleNodeDelete}
              onConnectionAdd={handleConnectionAdd}
              onConnectionDelete={handleConnectionDelete}
              selectedNode={selectedNode}
              onNodeSelect={handleNodeSelect}
            />
          </div>

          {/* Properties Panel - Desktop Only */}
          {isPropertiesPanelOpen && (
            <div className="hidden lg:block">
              <NodePropertiesPanel
                selectedNode={selectedNode}
                onNodeUpdate={handleNodeUpdate}
                onClose={togglePropertiesPanel}
              />
            </div>
          )}
        </div>

        {/* Skill Library */}
        <SkillLibrary
          isOpen={isLibraryOpen}
          onToggle={toggleLibrary}
          onDragStart={() => {}}
        />

        {/* Mobile Toolbar */}
        <MobileToolbar
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onToggleLibrary={toggleLibrary}
          isLibraryOpen={isLibraryOpen}
          onTemplateSelect={openTemplateModal}
        />

        {/* Template Selector Modal */}
        <TemplateSelector
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
          onTemplateSelect={handleTemplateSelect}
        />

        {/* Mobile Properties Panel */}
        {isPropertiesPanelOpen && selectedNode && (
          <div className="lg:hidden fixed inset-0 z-50 bg-surface">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-text-primary">Edit Node</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={togglePropertiesPanel}
                  className="text-text-secondary"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <NodePropertiesPanel
                  selectedNode={selectedNode}
                  onNodeUpdate={handleNodeUpdate}
                  onClose={togglePropertiesPanel}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default RoadmapCreationStudio;