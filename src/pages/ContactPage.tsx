import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { SEO } from '../components/common/SEO';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <SEO
        title="Contact &amp; Executive Dispatch"
        description="Initiate direct communications, technical inquiries, or startup collaborations with Tarun Kumar (@heytarunkumar)."
        path="/contact"
      />
      <ContactSection />
    </div>
  );
};

export default ContactPage;
