import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { SITE_CONFIG } from '../../config/site';

interface ConsultationPillar {
  id: string;
  icon: string;
  title: string;
  badge: string;
  description: string;
  topics: string[];
}

const CONSULTATION_PILLARS: ConsultationPillar[] = [
  {
    id: 'ai-architecture',
    icon: '⚡',
    title: 'AI & Python Architecture',
    badge: 'TECHNICAL DEEP DIVE',
    description: 'Engineering reviews, Generative AI agent workflows, XAI / SHAP explainability models, and FastAPI backend systems.',
    topics: ['Agentic Workflows', 'Model Explainability (XAI)', 'FastAPI & Microservices', 'RAG & Vector Pipelines'],
  },
  {
    id: 'ventures-community',
    icon: '🚀',
    title: 'Startup & OrigoHOST Ventures',
    badge: 'VENTURES & ECOSYSTEM',
    description: 'Discussions on developer community initiatives, cloud platform synergies, startup partnerships, and venture advisory.',
    topics: ['OrigoHOST Ecosystem', 'Developer Education', 'Cloud Infrastructure', 'Tech Venture Strategy'],
  },
  {
    id: 'speaking-workshops',
    icon: '🎙️',
    title: 'Keynotes & Tech Workshops',
    badge: 'SPEAKING & PANELS',
    description: 'Conference keynotes, university guest lectures, hackathon mentoring, and practical engineering masterclasses.',
    topics: ['AI Conference Keynotes', 'Hackathon Judging & Mentoring', 'Developer Masterclasses', 'Panel Discussions'],
  },
  {
    id: 'executive-line',
    icon: '👔',
    title: 'Executive Line & Advisory',
    badge: 'DIRECT STRATEGIC LINE',
    description: 'Confidential 1:1 strategic advisory, tech due diligence, proprietary architectures, and strategic introductions.',
    topics: ['Technical Advisory', 'Engineering Leadership', 'Product Roadmap Review', 'Confidential Briefings'],
  },
];

export const ScheduleSection: React.FC = () => {
  const { profile } = usePortfolio();
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [userTimezone, setUserTimezone] = useState<string>('UTC');
  const [activePillar, setActivePillar] = useState<string>('ai-architecture');

  const calendarUrl =
    profile.meetingScheduleUrl ||
    SITE_CONFIG.scheduleUrl ||
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1StHsObzZFYVjRIHgjJtQ0A5Oj4Rw6eUZS0QyLHFGp7EClv7zauUKgiDIylHhj5r0x8W8GpFRM?gv=true';

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(tz || 'Local Time');
    } catch {
      setUserTimezone('Local Time');
    }
  }, []);

  const handleRefresh = () => {
    setIsLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section
      id="schedule"
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-[1760px] mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex items-center space-x-4 mb-4 sm:mb-6"
        >
          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
            // 06 · EXECUTIVE APPOINTMENT DESK
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Section Headline & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.06] tracking-[-0.03em] mb-4 sm:mb-6">
              Schedule a 1:1 Executive or Advisory Session.
            </h1>
            <p className="text-sm sm:text-base font-sans font-normal text-[#38342E] leading-relaxed max-w-3xl">
              Reserve dedicated calendar time with {profile.name || 'Tarun Kumar'} for technical deep dives in AI and Python architectures, OrigoHOST ecosystem collaborations, keynote engagements, or venture advisory. Confirmed appointments automatically generate a Google Meet video conference and synchronize across your calendar.
            </p>
          </motion.div>

          {/* Quick Real-Time Desk Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 editorial-card p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#DDD2C2] pb-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#78000F] font-bold">
                CALENDAR DESK STATUS
              </span>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-[#0F6848] uppercase">
                  ACCEPTING BOOKINGS
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-[#555047]">
                <span className="text-[11px] text-[#736B60]">Detected Timezone:</span>
                <span className="text-[#111111] font-semibold truncate max-w-[180px] text-right" title={userTimezone}>
                  {userTimezone}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#555047]">
                <span className="text-[11px] text-[#736B60]">Standard Duration:</span>
                <span className="text-[#111111] font-semibold">30 – 45 Minutes</span>
              </div>
              <div className="flex items-center justify-between text-[#555047]">
                <span className="text-[11px] text-[#736B60]">Meeting Platform:</span>
                <span className="text-[#78000F] font-bold">Google Meet (Auto-Link)</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-executive-primary w-full py-2.5 text-[10.5px] font-mono font-bold tracking-[0.16em] uppercase flex items-center justify-center space-x-2 rounded-[3px] text-center"
              >
                <span>OPEN IN GOOGLE CALENDAR</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Consultation Focus Pillars */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase text-[#78000F]">
              // PURPOSE &amp; COLLABORATION TRACKS
            </h2>
            <span className="text-[11px] font-mono text-[#736B60] hidden sm:inline">
              SELECT A TRACK BELOW OR CHOOSE AN OPEN SLOT ON THE DESK
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONSULTATION_PILLARS.map((pillar) => {
              const isSelected = activePillar === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`editorial-card p-5 rounded-[4px] bg-[#FAF8F3] border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#78000F] shadow-md ring-1 ring-[#78000F]'
                      : 'border-[#CFC3B3] hover:border-[#78000F]/60 shadow-sm'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#78000F]" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{pillar.icon}</span>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider bg-[#DDD2C2]/40 text-[#78000F] border border-[#CFC3B3]">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#111111] mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-sans text-[#555047] leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DDD2C2]">
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9.5px] font-mono px-2 py-0.5 rounded-[2px] bg-[#F4EEE4] text-[#38342E] border border-[#DDD2C2]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Google Calendar Appointment Embed Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
          className="editorial-card w-full rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] shadow-lg overflow-hidden mb-14"
        >
          {/* Calendar Widget Control Top Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#FAF8F3] border-b border-[#CFC3B3] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-[3px] bg-[#111111] flex items-center justify-center text-[#F4EEE4] font-mono text-xs font-bold shrink-0">
                📅
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-serif font-bold text-[#111111] leading-none">
                  Google Calendar Appointment Scheduling Desk
                </h3>
                <span className="text-[10px] font-mono text-[#736B60] tracking-wider uppercase">
                  DIRECT APPOINTMENT PORTAL · ENCRYPTED &amp; VERIFIED
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleRefresh}
                title="Reload Calendar Frame"
                className="px-3 py-1.5 rounded-[3px] border border-[#CFC3B3] bg-[#FAF8F3] hover:border-[#78000F] text-[11px] font-mono text-[#38342E] hover:text-[#78000F] transition-all flex items-center space-x-1 cursor-pointer"
              >
                <span>↻</span>
                <span className="hidden sm:inline">RELOAD</span>
              </button>

              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in Native Google Calendar"
                className="px-3 py-1.5 rounded-[3px] border border-[#111111] bg-[#111111] hover:bg-[#78000F] hover:border-[#78000F] text-[11px] font-mono text-[#F4EEE4] transition-all flex items-center space-x-1 cursor-pointer"
              >
                <span>FULLSCREEN</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Iframe Frame Box with Skeleton Loading Overlay */}
          <div className="relative w-full min-h-[600px] sm:min-h-[700px] bg-white">
            {/* Loading Skeleton */}
            {!isLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-[#FAF8F3]/95 backdrop-blur-sm transition-opacity duration-300">
                <div className="w-10 h-10 border-2 border-[#78000F]/20 border-t-[#78000F] rounded-full animate-spin mb-4" />
                <h4 className="text-sm font-serif font-bold text-[#111111] mb-1">
                  Initializing Google Calendar Appointment Scheduler
                </h4>
                <p className="text-xs font-mono text-[#736B60] max-w-sm text-center">
                  Loading verified available slots and matching to your detected timezone: {userTimezone}...
                </p>
                <div className="mt-6 flex items-center space-x-3 text-[10px] font-mono text-[#8C8275]">
                  <span>🔒 SECURE IFRAME</span>
                  <span>•</span>
                  <span>GOOGLE VERIFIED</span>
                </div>
              </div>
            )}

            {/* Google Calendar Appointment Scheduling begin */}
            <iframe
              key={iframeKey}
              src={calendarUrl}
              style={{ border: 0 }}
              width="100%"
              height="700"
              frameBorder="0"
              title="Google Calendar Appointment Scheduling"
              className={`w-full h-[650px] sm:h-[720px] transition-opacity duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsLoaded(true)}
            />
            {/* end Google Calendar Appointment Scheduling */}
          </div>

          {/* Footer Ribbon inside the Widget Box */}
          <div className="px-4 sm:px-6 py-3 bg-[#FAF8F3] border-t border-[#CFC3B3] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#736B60]">
            <div className="flex items-center space-x-2">
              <span>🔒 DATA FIDUCIARY: TARUN KUMAR</span>
              <span>•</span>
              <span>CALENDAR SYNC VIA GOOGLE WORKSPACE</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>TIMEZONE: {userTimezone}</span>
              <span>•</span>
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#78000F] hover:underline font-bold"
              >
                DIRECT GOOGLE URL ↗
              </a>
            </div>
          </div>
        </motion.div>

        {/* Meeting Protocol & Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="editorial-card p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm space-y-2">
            <span className="text-[10px] font-mono text-[#78000F] font-bold tracking-wider uppercase block">
              01 / PREPARATION &amp; AGENDA
            </span>
            <h4 className="text-sm font-serif font-bold text-[#111111]">
              Share Discussion Topics Ahead
            </h4>
            <p className="text-xs text-[#555047] font-sans leading-relaxed">
              When booking your slot, kindly include a 1–2 sentence overview or relevant links (GitHub repositories, whitepapers, or system specs) to maximize the session’s value.
            </p>
          </div>

          <div className="editorial-card p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm space-y-2">
            <span className="text-[10px] font-mono text-[#78000F] font-bold tracking-wider uppercase block">
              02 / FLEXIBLE RESCHEDULING
            </span>
            <h4 className="text-sm font-serif font-bold text-[#111111]">
              One-Click Reschedule or Cancel
            </h4>
            <p className="text-xs text-[#555047] font-sans leading-relaxed">
              Priorities evolve. If you need to modify or cancel your booking, you can do so immediately using the direct management link embedded in your Google Calendar invite email.
            </p>
          </div>

          <div className="editorial-card p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm space-y-2">
            <span className="text-[10px] font-mono text-[#78000F] font-bold tracking-wider uppercase block">
              03 / OFF-SCHEDULE DISPATCH
            </span>
            <h4 className="text-sm font-serif font-bold text-[#111111]">
              Need an Urgent or Alternative Slot?
            </h4>
            <p className="text-xs text-[#555047] font-sans leading-relaxed">
              If none of the listed windows align with your timezone or urgency, reach out via direct email to{' '}
              <a href="mailto:tarunsinghchaudharyy@gmail.com" className="text-[#78000F] underline font-semibold">
                tarunsinghchaudharyy@gmail.com
              </a>{' '}
              for an expedited bespoke time.
            </p>
          </div>
        </div>

        {/* Alternative Contact Banner */}
        <div className="editorial-card p-6 sm:p-8 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10.5px] font-mono font-bold tracking-wider uppercase text-[#78000F]">
              ALTERNATIVE COMMUNICATION CHANNEL
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
              Prefer an Asynchronous Message or Written Brief?
            </h3>
            <p className="text-xs text-[#555047] font-sans max-w-xl">
              You can also initiate written contact through the official contact portal or dispatch a direct inquiry through LinkedIn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="btn-executive-primary px-5 py-3 text-xs font-mono font-bold tracking-[0.18em] uppercase rounded-[3px] text-center"
            >
              CONTACT FORM →
            </Link>
            <a
              href={profile.socials?.linkedin || 'https://www.linkedin.com/in/heytarunkumar/'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-[3px] border border-[#CFC3B3] bg-[#FAF8F3] text-xs font-mono text-[#111111] hover:text-[#78000F] hover:border-[#78000F] font-semibold tracking-wider transition-colors"
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ScheduleSection;
