import React, { useEffect, useState } from 'react';
import { ContactSection } from '../components/ContactSection';
import { ScheduleSection } from '../components/sections/ScheduleSection';
import { ResumeSection } from '../components/sections/ResumeSection';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'schedule'>('contact');

  useEffect(() => {
    // If arriving with a hash, sync the active indicator
    if (window.location.hash === '#schedule') {
      setActiveTab('schedule');
    } else if (window.location.hash === '#contact') {
      setActiveTab('contact');
    }
  }, []);

  useEffect(() => {
    const scriptId = 'contact-schedule-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ContactPage',
            '@id': `${SITE_CONFIG.url}/contact#webpage`,
            'url': `${SITE_CONFIG.url}/contact`,
            'name': 'Contact & Schedule a Meeting with Tarun Kumar (@heytarunkumar)',
            'description':
              'Initiate direct communications or reserve dedicated calendar time with Tarun Kumar for AI engineering advisory, tech talks, startup collaborations, and executive briefings.',
            'mainEntity': {
              '@type': 'Person',
              '@id': SITE_CONFIG.personId,
              'name': 'Tarun Kumar',
              'alternateName': 'heytarunkumar',
              'jobTitle': 'Python Developer | AI Engineer | Researcher | Author | Founder',
              'url': SITE_CONFIG.canonicalUrl,
            },
          },
          {
            '@type': 'WebPage',
            '@id': `${SITE_CONFIG.url}/contact#schedule`,
            'url': `${SITE_CONFIG.url}/contact#schedule`,
            'name': 'Schedule a Meeting with Tarun Kumar (@heytarunkumar)',
            'description': 'Reserve dedicated calendar time with Tarun Kumar via Google Calendar.',
          },
        ],
      });
      document.head.appendChild(script);
    }

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, []);

  const scrollToAnchor = (id: 'contact' | 'schedule') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] pt-16">
      <SEO
        title="Contact &amp; Schedule Meeting | Executive Communications &amp; Calendar"
        description="Initiate direct communications or schedule a 1:1 executive consultation with Tarun Kumar (@heytarunkumar) for AI engineering collaborations, tech talks, and startup ventures."
        path="/contact"
      />

      {/* Sticky Executive Mode Switcher Sub-Bar */}
      <div className="w-full border-b border-[#DDD2C2] bg-[#FAF8F3]/90 backdrop-blur-md sticky top-[64px] z-30 transition-all shadow-xs">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2.5 text-[#78000F] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-widest uppercase text-[10.5px] sm:text-[11px]">
              EXECUTIVE COMMUNICATIONS DESK //
            </span>
            <span className="hidden md:inline text-[10px] text-[#736B60] font-normal">
              DUAL CHANNELS: ASYNC INQUIRY &amp; 1:1 CALENDAR
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={() => scrollToAnchor('contact')}
              className={`px-3.5 py-1.5 rounded-[3px] border text-[11px] font-mono tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'contact'
                  ? 'border-[#78000F] bg-[#78000F] text-[#F4EEE4] font-bold shadow-xs'
                  : 'border-[#CFC3B3] bg-[#FAF8F3] text-[#38342E] hover:border-[#78000F] hover:text-[#78000F]'
              }`}
            >
              <span>✉️</span>
              <span className="uppercase">Direct Dispatch Form</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToAnchor('schedule')}
              className={`px-3.5 py-1.5 rounded-[3px] border text-[11px] font-mono tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'schedule'
                  ? 'border-[#78000F] bg-[#78000F] text-[#F4EEE4] font-bold shadow-xs'
                  : 'border-[#111111] bg-[#111111] text-[#F4EEE4] hover:bg-[#78000F] hover:border-[#78000F]'
              }`}
            >
              <span>📅</span>
              <span className="uppercase">Schedule 1:1 Meeting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Part 1: Contact & Direct Dispatch Section */}
      <ContactSection />

      {/* Editorial Decorative Divider */}
      <div className="relative py-4 bg-[#F4EEE4]">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex items-center space-x-4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#CFC3B3] to-[#78000F]/40 flex-1" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78000F] font-bold">
              // CALENDAR DESK
            </span>
            <div className="h-[1px] bg-gradient-to-r from-[#78000F]/40 via-[#CFC3B3] to-transparent flex-1" />
          </div>
        </div>
      </div>

      {/* Part 2: Schedule & Calendar Appointment Desk Section */}
      <ScheduleSection />

      {/* Part 3: Verified ATS Resume & Credentials */}
      <ResumeSection />
    </div>
  );
};

export default ContactPage;
