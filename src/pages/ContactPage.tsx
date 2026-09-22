import React, { useEffect } from 'react';
import { ContactSection } from '../components/ContactSection';
import { ResumeSection } from '../components/sections/ResumeSection';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact & Direct Line | Tarun Kumar (@heytarunkumar)';
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <ContactSection />
      <ResumeSection />
    </div>
  );
};

export default ContactPage;
