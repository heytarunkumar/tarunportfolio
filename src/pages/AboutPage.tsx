import React, { useEffect } from 'react';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { FaqSection } from '../components/FaqSection';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Tarun Kumar | Python Developer, AI Engineer & Founder (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <AboutSection />
      <SkillsSection />
      <FaqSection />
    </div>
  );
};

export default AboutPage;
