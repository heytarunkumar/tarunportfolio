import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FaqItem[] = [
  {
    category: 'IDENTITY & POSITIONING',
    question: 'Who is Tarun Kumar?',
    answer:
      'Tarun Kumar is a Python Developer, AI Engineer, Researcher, Author, and Founder building practical intelligence, Generative AI architectures, and scalable technology ventures. He is the Founder & President of OrigoHOST Tech Community.',
  },
  {
    category: 'DIGITAL HANDLE',
    question: 'What is @heytarunkumar?',
    answer:
      'heytarunkumar is the primary verified digital handle used by Tarun Kumar across GitHub, LinkedIn, Medium, X, Instagram, and official online platforms.',
  },
  {
    category: 'TECHNICAL EXPERTISE',
    question: 'What technologies and engineering domains does Tarun Kumar specialize in?',
    answer:
      'Tarun specializes in Python backend engineering, Generative AI systems, Large Language Models (LLMs), Explainable AI (XAI), Scikit-Learn / PyTorch pipelines, REST API microservices, Docker containerization, and automated workflows.',
  },
  {
    category: 'COMMUNITY & VENTURE',
    question: 'What is OrigoHOST Tech Community?',
    answer:
      'OrigoHOST Tech Community (https://origohost.in) is an applied AI and developer education ecosystem founded and led by Tarun Kumar, focused on empowering emerging engineers with hands-on exposure to intelligent systems and production-grade architectures.',
  },
  {
    category: 'RESEARCH & AUTHORSHIP',
    question: 'What research and publications has Tarun Kumar authored?',
    answer:
      'Tarun is the lead co-author on the AI-HealthGuard research project exploring Explainable AI (XAI / SHAP) for clinical risk stratification on tabular health datasets, alongside technical dispatches published on Medium covering modular Python architectures and Docker optimization.',
  },
  {
    category: 'COLLABORATION & CONTACT',
    question: 'How can teams or individuals collaborate with Tarun Kumar?',
    answer:
      'You can initiate contact through the portfolio contact dispatch form, email directly at imtarunchaudharyy@gmail.com, or explore verified social profiles on the Official Links Hub (/links).',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-4 sm:mb-6"
        >
          <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37]">
            07 / FREQUENTLY ASKED QUESTIONS
          </span>
          <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-normal leading-[1.15] mb-3">
            Entity &amp; technical <span className="italic text-[#D4AF37]">frequently asked questions.</span>
          </h2>
          <p className="text-xs sm:text-sm font-sans font-light text-[#A8988B] max-w-xl">
            Verified answers about Tarun Kumar (@heytarunkumar), technical focus areas, OrigoHOST leadership, and research initiatives.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#D4AF37]/50 bg-[#141210] shadow-[0_4px_25px_rgba(0,0,0,0.6)]'
                    : 'border-[#26211B] bg-[#12100E] hover:border-[#8C6D4F]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="text-[9.5px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-[#D4AF37] transition-colors">
                      {item.question}
                    </h3>
                  </div>

                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#26211B] flex items-center justify-center text-xs font-mono text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#1D1814] border-[#D4AF37]/40' : 'bg-[#0E0C0A]'
                    }`}
                  >
                    ↓
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-[#26211B]/60 text-xs sm:text-sm font-light text-[#C4BCB3] leading-relaxed font-sans">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
