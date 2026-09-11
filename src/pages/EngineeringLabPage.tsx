import React, { useEffect } from 'react';
import { EngineeringLabSection } from '../components/sections/EngineeringLabSection';

export const EngineeringLabPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Systems Engineering Lab | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <EngineeringLabSection />
    </div>
  );
};

export default EngineeringLabPage;
