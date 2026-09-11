import React, { useEffect } from 'react';
import { ResearchSection } from '../components/sections/ResearchSection';

export const ResearchPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Explainable AI & ML Research | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <ResearchSection />
    </div>
  );
};

export default ResearchPage;
