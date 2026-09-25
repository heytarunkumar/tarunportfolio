import React, { useEffect } from 'react';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { FaqSection } from '../components/FaqSection';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const AboutPage: React.FC = () => {
  useEffect(() => {
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
        'name': 'About Tarun Kumar (@heytarunkumar) | Profile & Background',
        'description': SITE_CONFIG.description,
        'mainEntity': {
          '@type': 'Person',
          '@id': SITE_CONFIG.personId,
          'name': 'Tarun Kumar',
          'alternateName': 'heytarunkumar',
          'jobTitle': 'Python Developer | AI Engineer | Researcher | Author | Founder',
          'description': SITE_CONFIG.description,
          'url': SITE_CONFIG.canonicalUrl,
          'image': SITE_CONFIG.defaultOgImage,
          'sameAs': [
            SITE_CONFIG.socials.linkedin,
            SITE_CONFIG.socials.github,
            SITE_CONFIG.socials.medium,
            SITE_CONFIG.socials.instagram,
            SITE_CONFIG.socials.x,
            SITE_CONFIG.socials.linktree
          ]
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
      <SEO
        title="About &amp; Biography"
        description="Learn about Tarun Kumar (@heytarunkumar) — Python Developer, AI Engineer, ML Researcher, Author, and Founder of OrigoHOST Tech Community."
        path="/about"
      />
      <AboutSection />
      <SkillsSection />
      <FaqSection />
    </div>
  );
};

export default AboutPage;
