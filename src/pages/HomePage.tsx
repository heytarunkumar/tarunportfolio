import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { EngineeringLabSection } from '../components/sections/EngineeringLabSection';
import { ResearchSection } from '../components/sections/ResearchSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { ContactSection } from '../components/ContactSection';

export const HomePage: React.FC = () => {
  const { navigation } = usePortfolio();

  const isPageVisible = (path: string): boolean => {
    if (!navigation || navigation.length === 0) return true;
    const item = navigation.find((n) => n.path === path);
    return item ? item.visible !== false : true;
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB]">
      <HeroSection />
      {isPageVisible('/about') && <AboutSection />}
      {isPageVisible('/about') && <SkillsSection />}
      {isPageVisible('/projects') && <ProjectsSection />}
      {isPageVisible('/lab') && <EngineeringLabSection />}
      {isPageVisible('/research') && <ResearchSection />}
      {isPageVisible('/experience') && <ExperienceSection />}
      {isPageVisible('/contact') && <ContactSection />}
    </div>
  );
};

export default HomePage;
