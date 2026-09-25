import React from 'react';
import { ProjectsSection } from '../components/ProjectsSection';
import { SEO } from '../components/common/SEO';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <SEO
        title="Production Systems &amp; Projects"
        description="Explore software architectures, Generative AI engines, and Python microservices engineered by Tarun Kumar (@heytarunkumar)."
        path="/projects"
      />
      <ProjectsSection />
    </div>
  );
};

export default ProjectsPage;
