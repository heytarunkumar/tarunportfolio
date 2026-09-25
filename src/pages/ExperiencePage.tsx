import React from 'react';
import { ExperienceSection } from '../components/ExperienceSection';
import { WritingSection } from '../components/sections/WritingSection';
import { ResumeSection } from '../components/sections/ResumeSection';
import { SEO } from '../components/common/SEO';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <SEO
        title="Experience &amp; Leadership"
        description="Career track record, venture leadership at OrigoHOST, and technical authorship by Tarun Kumar (@heytarunkumar)."
        path="/experience"
      />
      <ExperienceSection />
      <WritingSection />
      <ResumeSection />
    </div>
  );
};

export default ExperiencePage;
