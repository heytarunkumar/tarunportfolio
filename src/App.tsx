import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EngineeringLabSection } from './components/sections/EngineeringLabSection';
import { ResearchSection } from './components/sections/ResearchSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WritingSection } from './components/sections/WritingSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EngineeringLabSection />
      <ResearchSection />
      <ExperienceSection />
      <WritingSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;