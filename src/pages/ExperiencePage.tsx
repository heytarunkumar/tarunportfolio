import React, { useEffect } from 'react';
import { ExperienceSection } from '../components/ExperienceSection';
import { WritingSection } from '../components/sections/WritingSection';
import { ResumeSection } from '../components/sections/ResumeSection';

export const ExperiencePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Experience & Leadership | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <ExperienceSection />
      <WritingSection />
      <ResumeSection />
    </div>
  );
};

export default ExperiencePage;
