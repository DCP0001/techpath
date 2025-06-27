import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistrationLogin from "pages/user-registration-login";
import LearningDashboard from "pages/learning-dashboard";
import ProgressAnalyticsDashboard from "pages/progress-analytics-dashboard";
import RoadmapCreationStudio from "pages/roadmap-creation-studio";
import InteractiveRoadmapViewer from "pages/interactive-roadmap-viewer";
import SkillStudyMaterials from "pages/skill-study-materials";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LearningDashboard />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/learning-dashboard" element={<LearningDashboard />} />
        <Route path="/progress-analytics-dashboard" element={<ProgressAnalyticsDashboard />} />
        <Route path="/roadmap-creation-studio" element={<RoadmapCreationStudio />} />
        <Route path="/interactive-roadmap-viewer" element={<InteractiveRoadmapViewer />} />
        <Route path="/skill-study-materials" element={<SkillStudyMaterials />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;