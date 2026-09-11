import React, { useEffect } from 'react';
import { ContactSection } from '../components/ContactSection';
import { ResumeSection } from '../components/sections/ResumeSection';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact & Direct Line | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <ContactSection />
      <ResumeSection />
    </div>
  );
};

export default ContactPage;
