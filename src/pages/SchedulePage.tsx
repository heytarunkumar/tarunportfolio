import React, { useEffect } from 'react';
import { ScheduleSection } from '../components/sections/ScheduleSection';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const SchedulePage: React.FC = () => {
  useEffect(() => {
    const scriptId = 'schedule-meeting-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_CONFIG.url}/schedule#webpage`,
        'url': `${SITE_CONFIG.url}/schedule`,
        'name': 'Schedule a Meeting with Tarun Kumar (@heytarunkumar)',
        'description': 'Reserve dedicated calendar time with Tarun Kumar for AI engineering advisory, tech talks, startup collaborations, and executive briefings.',
        'mainEntity': {
          '@type': 'Person',
          '@id': SITE_CONFIG.personId,
          'name': 'Tarun Kumar',
          'alternateName': 'heytarunkumar',
          'jobTitle': 'Python Developer | AI Engineer | Researcher | Author | Founder',
          'url': SITE_CONFIG.canonicalUrl,
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
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <SEO
        title="Schedule a Meeting &amp; Executive Calendar"
        description="Schedule a 1:1 consultation or executive session with Tarun Kumar (@heytarunkumar) for AI systems architecture, tech talks, startup collaborations, and advisory."
        path="/schedule"
      />
      <ScheduleSection />
    </div>
  );
};

export default SchedulePage;
