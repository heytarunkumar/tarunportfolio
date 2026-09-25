import React from 'react';
import { ExperienceSection } from '../components/ExperienceSection';
import { SEO } from '../components/common/SEO';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <SEO
        title="Experience &amp; Leadership Milestones"
        description="Review engineering roles, startup leadership, and community milestones of Tarun Kumar (@heytarunkumar)."
        path="/experience"
      />
      <ExperienceSection />
    </div>
  );
};

export default ExperiencePage;
