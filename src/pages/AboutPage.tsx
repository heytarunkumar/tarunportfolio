import React, { useEffect } from 'react';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { FaqSection } from '../components/FaqSection';
import { SITE_CONFIG } from '../config/site';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Tarun Kumar | Python Developer, AI Engineer & Founder (@heytarunkumar)';

    // Inject ProfilePage JSON-LD schema specifically for the profile page
    const scriptId = 'about-profile-page-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${SITE_CONFIG.url}/about#profilepage`,
        'url': `${SITE_CONFIG.url}/about`,
        'name': 'About Tarun Kumar | Python Developer, AI Engineer, Researcher, Author & Founder',
        'mainEntity': {
          '@id': SITE_CONFIG.personId,
        },
      });
      document.head.appendChild(script);
    }

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] pt-16">
      <AboutSection />
      <SkillsSection />
      <FaqSection />
    </div>
  );
};

export default AboutPage;
