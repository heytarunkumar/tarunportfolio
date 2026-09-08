import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { EngineeringLabSection } from '../components/sections/EngineeringLabSection';
import { ResearchSection } from '../components/sections/ResearchSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { ContactSection } from '../components/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EngineeringLabSection />
      <ResearchSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
