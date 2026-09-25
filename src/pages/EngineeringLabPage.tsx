import React from 'react';
import { EngineeringLabSection } from '../components/sections/EngineeringLabSection';
import { SEO } from '../components/common/SEO';

export const EngineeringLabPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <SEO
        title="Engineering Lab &amp; Experiments"
        description="Applied technical experiments, LLM evaluation pipelines, and architectural prototypes by Tarun Kumar (@heytarunkumar)."
        path="/lab"
      />
      <EngineeringLabSection />
    </div>
  );
};

export default EngineeringLabPage;
