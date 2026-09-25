import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { ResumeSection } from '../components/sections/ResumeSection';
import { SEO } from '../components/common/SEO';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <SEO
        title="Contact &amp; Executive Line"
        description="Initiate direct communications with Tarun Kumar (@heytarunkumar) for AI engineering collaborations, speaking engagements, and startup ventures."
        path="/contact"
      />
      <ContactSection />
      <ResumeSection />
    </div>
  );
};

export default ContactPage;
