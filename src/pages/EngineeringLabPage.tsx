import React, { useEffect } from 'react';
import { EngineeringLabSection } from '../components/sections/EngineeringLabSection';

export const EngineeringLabPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Systems Engineering Lab | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <EngineeringLabSection />
    </div>
  );
};

export default EngineeringLabPage;
