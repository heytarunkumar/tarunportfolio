import React, { useEffect } from 'react';
import { ExperienceSection } from '../components/ExperienceSection';
import { WritingSection } from '../components/sections/WritingSection';
import { ResumeSection } from '../components/sections/ResumeSection';

export const ExperiencePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Experience & Leadership | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <ExperienceSection />
      <WritingSection />
      <ResumeSection />
    </div>
  );
};

export default ExperiencePage;
