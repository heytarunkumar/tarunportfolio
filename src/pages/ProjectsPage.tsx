import React, { useEffect } from 'react';
import { ProjectsSection } from '../components/ProjectsSection';

export const ProjectsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Projects & Architecture | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <ProjectsSection />
    </div>
  );
};

export default ProjectsPage;
