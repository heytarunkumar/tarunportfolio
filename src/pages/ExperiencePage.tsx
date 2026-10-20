import React from 'react';
import { ExperienceSection } from '../components/ExperienceSection';
import { SpeakingSection } from '../components/sections/SpeakingSection';
import { WritingSection } from '../components/sections/WritingSection';
import { ResumeSection } from '../components/sections/ResumeSection';
import { SEO } from '../components/common/SEO';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <SEO
        title="Experience & Leadership"
        description="Career track record, venture leadership at OrigoHOST, leadership masterclasses, and technical authorship by Tarun Kumar (@heytarunkumar)."
        path="/experience"
      />
      <ExperienceSection />
      <SpeakingSection eyebrowNumber="05" />
      <WritingSection />
      <ResumeSection />
    </div>
  );
};

export default ExperiencePage;
