import React from 'react';
import { ProjectsSection } from '../components/ProjectsSection';
import { SEO } from '../components/common/SEO';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
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
