import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';
import { speakingEventsData } from '../data/speaking';

export const SpeakingEventPage: React.FC = () => {
  const event = speakingEventsData[0];
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation for photo lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;

      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % event.photos.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev - 1 + event.photos.length) % event.photos.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, event.photos.length]);

  // Schema.org Event & EducationalEvent structured data
  useEffect(() => {
    const scriptId = 'speaking-event-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationEvent',
        '@id': `${SITE_CONFIG.url}/speaking/${event.slug}#event`,
        'name': event.sessionTitle,
        'description': event.summary,
        'startDate': '2026-10-17T10:00:00+05:30',
        'endDate': '2026-10-17T14:00:00+05:30',
        'eventStatus': 'https://schema.org/EventScheduled',
        'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
        'location': {
          '@type': 'Place',
          'name': event.institution,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Netaji Subhas University of Technology, Sector 3, Dwarka',
            'addressLocality': 'New Delhi',
            'postalCode': '110078',
            'addressCountry': 'IN'
          }
        },
        'organizer': {
          '@type': 'Organization',
          'name': event.organizers,
          'url': 'https://gdg.community.dev/'
        },
        'performer': {
          '@type': 'Person',
          'name': 'Tarun Kumar',
          'jobTitle': 'Founder & AI Systems Engineer',
          'url': SITE_CONFIG.url,
          'sameAs': [
            SITE_CONFIG.socials.linkedin,
            SITE_CONFIG.socials.github,
            SITE_CONFIG.socials.x
          ]
        },
        'image': [
          `${SITE_CONFIG.url}${event.photos[0].url}`,
          `${SITE_CONFIG.url}${event.photos[1].url}`,
          `${SITE_CONFIG.url}${event.photos[2].url}`
        ]
      });
      document.head.appendChild(script);
    }

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [event]);

  const primaryPhoto = event.photos.find((p) => p.role === 'primary') || event.photos[0];
  const galleryPhotos = event.photos;

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] font-sans pt-24 sm:pt-28 pb-20 sm:pb-32 selection:bg-[#78000F] selection:text-[#F4EEE4]">
      <SEO
        title="Leadership Development Session — Before the Title"
        description="Documentation of Tarun Kumar's leadership development masterclass, 'Before the Title,' held on 17 October 2026 at Netaji Subhas University of Technology (NSUT) with GDG NSUT and SHUNYA 2026."
        path={`/speaking/${event.slug}`}
        ogImage={`${SITE_CONFIG.url}${primaryPhoto.url}`}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 sm:mb-12">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[#736B60]">
            <li>
              <Link to="/" className="hover:text-[#78000F] transition-colors">
                HOME
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/experience" className="hover:text-[#78000F] transition-colors">
                EXPERIENCE &amp; LEADERSHIP
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#78000F] font-bold truncate max-w-[240px] sm:max-w-none">
              BEFORE THE TITLE (NSUT DELHI)
            </li>
          </ol>
        </nav>

        {/* Section Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-4 sm:mb-6"
        >
          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
            {event.eyebrow}
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Headline & Editorial Lead */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em] mb-6">
            {event.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-[#38342E] leading-relaxed">
            &ldquo;{event.summary}&rdquo;
          </p>
        </motion.header>

        {/* Verified Event Metadata Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm mb-16 sm:mb-20"
        >
          <div>
            <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#78000F] font-bold mb-1">
              DATE
            </span>
            <span className="text-sm sm:text-base font-serif font-bold text-[#111111]">
              {event.date}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#78000F] font-bold mb-1">
              HOST &amp; INSTITUTION
            </span>
            <span className="text-sm sm:text-base font-serif font-bold text-[#111111] block leading-snug">
              {event.institution}
            </span>
            <span className="text-[11px] font-mono text-[#736B60] block mt-0.5">
              {event.location}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#78000F] font-bold mb-1">
              ORGANIZING BODIES
            </span>
            <span className="text-sm sm:text-base font-serif font-bold text-[#111111] block leading-snug">
              {event.organizers}
            </span>
            <span className="text-[11px] font-mono text-[#736B60] block mt-0.5">
              Annual Tech Symposium Track
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#78000F] font-bold mb-1">
              COLLABORATOR &amp; SPEAKER
            </span>
            <span className="text-sm sm:text-base font-serif font-bold text-[#111111] block leading-snug">
              {event.presenter}
            </span>
            <span className="text-[11px] font-mono text-[#78000F] font-semibold block mt-0.5">
              {event.presenterRole}
            </span>
          </div>
        </motion.div>

        {/* Core Thesis Hero Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[4px] bg-[#111111] text-[#F4EEE4] p-8 sm:p-12 lg:p-16 border-l-4 border-[#78000F] shadow-md mb-16 sm:mb-24"
        >
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">
              SESSION CORE THESIS
            </span>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#FAF8F3] leading-[1.15] mb-6">
              &ldquo;{event.thesis}&rdquo;
            </p>
            <p className="text-sm sm:text-base font-sans text-[#C4BCB3] leading-relaxed">
              Leadership is neither a designation conferred by an organization nor a milestone reserved for formal managers. It is an operational discipline built through repeated practice, intellectual honesty under uncertainty, and the ability to influence peers without relying on authority.
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Photography Grid & Evidence */}
        <section aria-labelledby="session-media-heading" className="mb-20 sm:mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 pb-4 border-b border-[#CFC3B3]">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F] block mb-1">
                AUTHENTIC DOCUMENTATION
              </span>
              <h2 id="session-media-heading" className="text-2xl sm:text-4xl font-serif font-bold text-[#111111]">
                Session Photography &amp; Presentation Moments
              </h2>
            </div>
            <p className="text-xs font-mono text-[#736B60] max-w-xs">
              Live photography captured at Netaji Subhas University of Technology (NSUT), 17 October 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Primary Image: Appreciation Moment (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-7 group cursor-pointer"
              onClick={() => setActivePhotoIndex(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePhotoIndex(0);
                }
              }}
              aria-label={`Enlarge photo: ${event.photos[0].caption}`}
            >
              <div className="relative overflow-hidden rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] aspect-[3/4] shadow-sm group-hover:border-[#78000F] transition-all">
                <picture>
                  <source srcSet={event.photos[0].webpUrl} type="image/webp" />
                  <img
                    src={event.photos[0].url}
                    alt={event.photos[0].alt}
                    width={event.photos[0].width}
                    height={event.photos[0].height}
                    loading="eager"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-500"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-[#FAF8F3]">
                  <span className="inline-block text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded-[2px] bg-[#78000F] text-[#FAF8F3] font-bold mb-2">
                    KEYNOTE CONVERSATION &amp; APPRECIATION
                  </span>
                  <p className="text-xs sm:text-sm font-sans leading-snug line-clamp-2">
                    {event.photos[0].caption}
                  </p>
                  <span className="text-[10px] font-mono text-[#D4AF37] block mt-1 tracking-wider">
                    CLICK TO VIEW HIGH RESOLUTION ↗
                  </span>
                </div>
              </div>
            </motion.div>

            {/* In-Session Photographs (5 Cols, Stacked) */}
            <div className="md:col-span-5 flex flex-col gap-6 sm:gap-8">
              
              {/* Photo 2: Judgment Traps */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActivePhotoIndex(1)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePhotoIndex(1);
                  }
                }}
                aria-label={`Enlarge photo: ${event.photos[1].caption}`}
              >
                <div className="relative overflow-hidden rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] aspect-[4/3] sm:aspect-[3/4] shadow-sm group-hover:border-[#78000F] transition-all">
                  <picture>
                    <source srcSet={event.photos[1].webpUrl} type="image/webp" />
                    <img
                      src={event.photos[1].url}
                      alt={event.photos[1].alt}
                      width={event.photos[1].width}
                      height={event.photos[1].height}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.015] transition-transform duration-500"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-[#FAF8F3]">
                    <span className="inline-block text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded-[2px] bg-[#111111] text-[#FAF8F3] font-bold mb-1.5 border border-white/20">
                      PART 1 · THE TRAPS OF JUDGMENT
                    </span>
                    <p className="text-xs font-sans leading-snug line-clamp-2">
                      {event.photos[1].caption}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Photo 3: Leading Others */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group cursor-pointer"
                onClick={() => setActivePhotoIndex(2)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePhotoIndex(2);
                  }
                }}
                aria-label={`Enlarge photo: ${event.photos[2].caption}`}
              >
                <div className="relative overflow-hidden rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] aspect-[4/3] sm:aspect-[3/4] shadow-sm group-hover:border-[#78000F] transition-all">
                  <picture>
                    <source srcSet={event.photos[2].webpUrl} type="image/webp" />
                    <img
                      src={event.photos[2].url}
                      alt={event.photos[2].alt}
                      width={event.photos[2].width}
                      height={event.photos[2].height}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.015] transition-transform duration-500"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-[#FAF8F3]">
                    <span className="inline-block text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded-[2px] bg-[#111111] text-[#FAF8F3] font-bold mb-1.5 border border-white/20">
                      PART 2 · LEADING OTHERS
                    </span>
                    <p className="text-xs font-sans leading-snug line-clamp-2">
                      {event.photos[2].caption}
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* Masterclass Modules & Core Curriculum */}
        <section aria-labelledby="curriculum-heading" className="mb-20 sm:mb-28">
          <div className="mb-10 sm:mb-14">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F] block mb-1">
              CURRICULUM BREAKDOWN
            </span>
            <h2 id="curriculum-heading" className="text-2xl sm:text-4xl font-serif font-bold text-[#111111]">
              Verified Session Topics &amp; Frameworks
            </h2>
            <p className="text-sm font-sans text-[#555047] mt-2 max-w-2xl">
              Transcribed directly from the presentation slides and materials delivered at the NSUT session.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16">
            
            {/* Module 1: The Traps of Judgment */}
            <div className="p-6 sm:p-10 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-6 border-b border-[#CFC3B3] mb-8">
                <div>
                  <span className="text-xs font-mono font-bold text-[#78000F] tracking-widest block mb-1">
                    MODULE {event.modules[0].number}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#111111]">
                    {event.modules[0].title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base font-serif italic text-[#78000F]">
                  &ldquo;{event.modules[0].subtitle}&rdquo;
                </p>
              </div>

              <p className="text-sm sm:text-base font-sans text-[#38342E] leading-relaxed mb-8">
                {event.modules[0].description}
              </p>

              {/* 5 Bias Check Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {event.modules[0].items.map((item, idx) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-[4px] bg-[#F4EEE4] border border-[#CFC3B3]/80 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#8C8275] block mb-1">
                        TRAP 0{idx + 1}
                      </span>
                      <h4 className="text-sm font-sans font-bold text-[#111111] mb-2">
                        {item.name}
                      </h4>
                    </div>
                    <div className="pt-3 border-t border-[#CFC3B3]/60">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#78000F] font-bold block mb-1">
                        CHECK QUESTION
                      </span>
                      <p className="text-xs font-serif italic text-[#202020] leading-snug">
                        &ldquo;{item.questionOrNote}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Practical Exercise Box */}
              {event.modules[0].practicalPrompt && (
                <div className="p-4 rounded-[4px] bg-[#FAF8F3] border-l-2 border-[#78000F] text-xs font-mono text-[#555047] flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-[#78000F]">
                    PRACTICAL EXERCISE:
                  </span>
                  <span>{event.modules[0].practicalPrompt}</span>
                </div>
              )}
            </div>

            {/* Module 2: Leading Others */}
            <div className="p-6 sm:p-10 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-6 border-b border-[#CFC3B3] mb-8">
                <div>
                  <span className="text-xs font-mono font-bold text-[#78000F] tracking-widest block mb-1">
                    MODULE {event.modules[1].number}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#111111]">
                    {event.modules[1].title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base font-serif italic text-[#78000F]">
                  &ldquo;{event.modules[1].subtitle}&rdquo;
                </p>
              </div>

              <p className="text-sm sm:text-base font-sans text-[#38342E] leading-relaxed mb-8">
                {event.modules[1].description}
              </p>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {event.modules[1].items.map((item, idx) => (
                  <div
                    key={item.name}
                    className="p-5 rounded-[4px] bg-[#F4EEE4] border border-[#CFC3B3]/80"
                  >
                    <span className="text-[10px] font-mono text-[#8C8275] block mb-1">
                      PILLAR 0{idx + 1}
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#111111] mb-2">
                      {item.name}
                    </h4>
                    <p className="text-xs font-sans text-[#555047] leading-relaxed">
                      {item.questionOrNote}
                    </p>
                  </div>
                ))}
              </div>

              {event.modules[1].practicalPrompt && (
                <div className="p-4 rounded-[4px] bg-[#FAF8F3] border-l-2 border-[#78000F] text-xs font-mono text-[#555047]">
                  <span className="font-bold text-[#78000F] mr-2">CORE TAKEAWAY:</span>
                  {event.modules[1].practicalPrompt}
                </div>
              )}
            </div>

            {/* Daily Habit & Repetition System */}
            <div className="p-6 sm:p-10 rounded-[4px] bg-[#111111] text-[#F4EEE4] border border-[#26211B] shadow-sm">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#D4AF37] block mb-2">
                ACTIONABLE REPETITIONS
              </span>
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#FAF8F3] mb-6">
                {event.habitsAndFrameworks.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {event.habitsAndFrameworks.items.map((item, idx) => (
                  <div
                    key={item.action}
                    className="p-5 rounded-[4px] bg-[#1A1816] border border-white/10"
                  >
                    <span className="text-xs font-mono text-[#D4AF37] block mb-2 font-bold">
                      0{idx + 1} · REPETITION
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#FAF8F3] mb-2">
                      {item.action}
                    </h4>
                    <p className="text-xs font-sans text-[#C4BCB3] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Official Appreciation Letter Section */}
        <section aria-labelledby="appreciation-letter-heading" className="mb-20 sm:mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 pb-4 border-b border-[#CFC3B3]">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F] block mb-1">
                INSTITUTIONAL COMMENDATION
              </span>
              <h2 id="appreciation-letter-heading" className="text-2xl sm:text-4xl font-serif font-bold text-[#111111]">
                Letter of Appreciation — NSUT Delhi
              </h2>
            </div>
            <p className="text-xs font-mono text-[#736B60] max-w-xs">
              Formally issued by the SHUNYA 2026 Organizing Team &amp; GDG NSUT.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Verified Excerpt Card (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#CFC3B3] mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#78000F] font-bold block">
                    ISSUED BY
                  </span>
                  <span className="text-sm font-serif font-bold text-[#111111]">
                    {event.appreciationLetter.organizers}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#736B60] block">
                    DATE
                  </span>
                  <span className="text-xs font-mono text-[#111111] font-bold">
                    {event.appreciationLetter.date}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-xs font-mono text-[#736B60] block mb-1">
                  SUBJECT:
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#111111]">
                  {event.appreciationLetter.title}
                </h3>
              </div>

              <div className="p-5 rounded-[4px] bg-[#F4EEE4] border-l-2 border-[#78000F] mb-6">
                <p className="text-xs sm:text-sm font-sans italic text-[#38342E] leading-relaxed">
                  &ldquo;{event.appreciationLetter.verifiedKeyQuote}&rdquo;
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm font-sans text-[#555047] leading-relaxed mb-8">
                <p>
                  The letter recognizes the initiative taken by OrigoHOST and Mr. Tarun Kumar in creating an interactive forum for university students to examine leadership beyond mere designations, understand the weight of accountability, and adopt practical behavioral frameworks.
                </p>
                <p>
                  Signed by <strong>{event.appreciationLetter.signatory}</strong> ({event.appreciationLetter.signatoryRole}), Netaji Subhas University of Technology, New Delhi.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#CFC3B3]">
                <a
                  href={event.appreciationLetter.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 py-3 px-6 rounded-[4px] bg-[#78000F] hover:bg-[#5D000B] text-[#FAF8F3] text-xs font-mono tracking-[0.16em] uppercase font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#78000F]"
                >
                  <span>VIEW ORIGINAL PDF</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href={event.appreciationLetter.pdfUrl}
                  download="Letter-of-Appreciation-NSUT-Delhi.pdf"
                  className="inline-flex items-center space-x-2 py-3 px-6 rounded-[4px] bg-transparent hover:bg-[#FAF8F3] border border-[#111111] text-[#111111] hover:text-[#78000F] hover:border-[#78000F] text-xs font-mono tracking-[0.16em] uppercase font-medium transition-all focus:outline-none"
                >
                  <span>DOWNLOAD PDF</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            {/* Right: PDF Metadata & Verification Badge (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-9 h-9 rounded-[4px] bg-[#F4EEE4] border border-[#CFC3B3] flex items-center justify-center text-[#78000F] text-lg">
                  📄
                </div>
                <div>
                  <h4 className="text-sm font-mono font-bold text-[#111111]">
                    VERIFIED ARTIFACT
                  </h4>
                  <span className="text-[10px] font-mono text-[#736B60]">
                    {event.appreciationLetter.fileName} (PDF, 347 KB)
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono text-[#38342E]">
                <div className="pb-3 border-b border-[#DDD2C2]">
                  <span className="text-[#8C8275] block text-[10px]">INSTITUTION:</span>
                  <span className="font-semibold text-[#111111]">
                    Netaji Subhas University of Technology (NSUT)
                  </span>
                </div>

                <div className="pb-3 border-b border-[#DDD2C2]">
                  <span className="text-[#8C8275] block text-[10px]">CAMPUS LOCATION:</span>
                  <span className="font-semibold text-[#111111]">
                    Dwarka, New Delhi - 110078
                  </span>
                </div>

                <div className="pb-3 border-b border-[#DDD2C2]">
                  <span className="text-[#8C8275] block text-[10px]">ORGANIZING CHAPTER:</span>
                  <span className="font-semibold text-[#111111]">
                    GDG NSUT &amp; SHUNYA 2026 Organizing Team
                  </span>
                </div>

                <div className="pb-3 border-b border-[#DDD2C2]">
                  <span className="text-[#8C8275] block text-[10px]">RECIPIENT DESIGNATION:</span>
                  <span className="font-semibold text-[#78000F]">
                    Mr. Tarun Kumar, President of OrigoHOST
                  </span>
                </div>

                <div>
                  <span className="text-[#8C8275] block text-[10px]">DOCUMENT AUTHENTICITY:</span>
                  <span className="inline-flex items-center space-x-1.5 text-[#1E7E34] font-bold mt-1">
                    <span>✓</span>
                    <span>VERIFIED PHYSICAL &amp; DIGITAL DOCUMENT</span>
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDD2C2]">
                <p className="text-[11px] font-sans text-[#736B60] leading-normal">
                  This document serves as formal evidence of Tarun Kumar&apos;s keynote engagement and OrigoHOST&apos;s collaborative workshop with university developer communities.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Book Connection Section: Before the Title */}
        <section aria-labelledby="book-connection-heading" className="p-8 sm:p-12 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] mb-20 sm:mb-28 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F] block mb-2">
              LITERARY &amp; INTELLECTUAL ROOTS
            </span>
            <h2 id="book-connection-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] mb-4">
              Connection to &ldquo;{event.bookConnection.bookTitle}&rdquo;
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#38342E] leading-relaxed mb-6">
              {event.bookConnection.relationNote}
            </p>
            <div className="p-4 rounded-[4px] bg-[#F4EEE4] border border-[#DDD2C2] text-xs font-mono text-[#555047]">
              <span className="font-bold text-[#111111] block mb-1">
                CORE PHILOSOPHY:
              </span>
              Do not wait for external authorization, job promotions, or institutional titles to begin practicing the responsibilities of leadership. The repetitions come first; the title is incidental.
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <div className="text-center py-12 sm:py-16 px-6 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F] block mb-2">
            ENGAGEMENT &amp; KEYNOTES
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#111111] mb-4">
            Invite Tarun for a Leadership Masterclass or Technical Session
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#555047] max-w-xl mx-auto mb-8">
            Tarun delivers interactive masterclasses on engineering leadership, applied AI systems, decision traps, and entrepreneurial execution for universities, developer summits, and technology organizations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={event.cta.primaryLink}
              className="py-3 px-8 rounded-[4px] bg-[#111111] hover:bg-[#78000F] text-[#FAF8F3] text-xs font-mono tracking-[0.18em] uppercase font-bold transition-all shadow-sm focus:outline-none"
            >
              {event.cta.primaryText} →
            </Link>

            <a
              href={event.cta.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-8 rounded-[4px] bg-transparent hover:bg-[#F4EEE4] border border-[#CFC3B3] text-[#202020] hover:text-[#78000F] text-xs font-mono tracking-[0.18em] uppercase font-medium transition-all focus:outline-none"
            >
              {event.cta.secondaryText} ↗
            </a>
          </div>
        </div>

      </div>

      {/* Accessible Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Event photograph lightbox"
            onClick={() => setActivePhotoIndex(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                aria-label="Close lightbox"
                className="absolute -top-12 right-0 sm:-right-8 text-white hover:text-[#D4AF37] p-2 text-2xl font-mono focus:outline-none cursor-pointer"
              >
                ✕
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : null
                  )
                }
                aria-label="Previous photograph"
                className="hidden sm:block absolute -left-16 top-1/2 -translate-y-1/2 text-white hover:text-[#D4AF37] p-3 text-2xl font-mono focus:outline-none cursor-pointer"
              >
                ←
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev !== null ? (prev + 1) % galleryPhotos.length : null
                  )
                }
                aria-label="Next photograph"
                className="hidden sm:block absolute -right-16 top-1/2 -translate-y-1/2 text-white hover:text-[#D4AF37] p-3 text-2xl font-mono focus:outline-none cursor-pointer"
              >
                →
              </button>

              {/* Image Container */}
              <div className="relative max-h-[75vh] overflow-hidden rounded-[4px] border border-white/20">
                <picture>
                  <source
                    srcSet={galleryPhotos[activePhotoIndex].webpUrl}
                    type="image/webp"
                  />
                  <img
                    src={galleryPhotos[activePhotoIndex].url}
                    alt={galleryPhotos[activePhotoIndex].alt}
                    width={galleryPhotos[activePhotoIndex].width}
                    height={galleryPhotos[activePhotoIndex].height}
                    className="max-h-[75vh] w-auto object-contain mx-auto"
                  />
                </picture>
              </div>

              {/* Caption Bar */}
              <div className="mt-4 text-center max-w-2xl px-4">
                <p className="text-xs sm:text-sm font-sans text-[#FAF8F3] leading-snug">
                  {galleryPhotos[activePhotoIndex].caption}
                </p>
                <span className="text-[10px] font-mono text-[#D4AF37] block mt-1">
                  PHOTO {activePhotoIndex + 1} OF {galleryPhotos.length} · NSUT DELHI (17 OCT 2026)
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeakingEventPage;
