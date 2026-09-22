import React, { useEffect } from 'react';
import { ProjectsSection } from '../components/ProjectsSection';

export const ProjectsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Projects & Architecture | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <ProjectsSection />
    </div>
  );
};

export default ProjectsPage;
