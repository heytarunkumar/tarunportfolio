import React from 'react';
import { EngineeringLabSection } from '../components/sections/EngineeringLabSection';
import { SEO } from '../components/common/SEO';

export const EngineeringLabPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <SEO
        title="Engineering &amp; Systems Lab"
        description="Review hands-on software architectures, Linux sysadmin tracks, and DevOps pipelines by Tarun Kumar (@heytarunkumar)."
        path="/lab"
      />
      <EngineeringLabSection />
    </div>
  );
};

export default EngineeringLabPage;
