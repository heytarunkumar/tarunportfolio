import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <AboutSection />
      <SkillsSection />
    </div>
  );
};

export default AboutPage;
