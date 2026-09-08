import React from 'react';
import { ProjectsSection } from '../components/ProjectsSection';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <ProjectsSection />
    </div>
  );
};

export default ProjectsPage;
