import React, { useEffect } from 'react';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Tarun Kumar | Python Developer, AI Engineer & Founder (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <AboutSection />
      <SkillsSection />
    </div>
  );
};

export default AboutPage;
