import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { EngineeringLabSection } from '../components/sections/EngineeringLabSection';
import { ResearchSection } from '../components/sections/ResearchSection';
import { ContactSection } from '../components/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-[#E8DFD8]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EngineeringLabSection />
      <ResearchSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
