import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FaqItem[] = [
  {
    category: 'IDENTITY & EXECUTIVE PROFILE',
    question: 'Who is Mr. Tarun Kumar?',
    answer:
      'Tarun Kumar is a Python Developer, AI Systems Engineer, Researcher, Author, and Founder building practical intelligence, Generative AI architectures, and scalable technology ventures. He is the Founder & President of OrigoHOST Tech Community.',
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
      'Tarun is the lead author on the AI-HealthGuard research project exploring Explainable AI (XAI / SHAP) for clinical risk stratification on tabular health datasets, alongside technical dispatches published on Medium covering modular Python architectures and Docker optimization.',
  },
  {
    category: 'COLLABORATION & CONTACT',
    question: 'How can teams or individuals collaborate with Tarun Kumar?',
    answer:
      'You can initiate contact through the portfolio contact dispatch form, email directly at tarunsinghchaudharyy@gmail.com, or explore verified social profiles on the Official Links Hub (/links).',
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
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex items-center space-x-4 mb-4 sm:mb-6"
        >
          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
            05 / FREQUENTLY ASKED QUESTIONS
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em] mb-3">
            Executive &amp; Technical <span className="text-[#78000F] italic">Inquiries.</span>
          </h2>
          <p className="text-xs sm:text-sm font-sans font-normal text-[#38342E] max-w-xl">
            Verified answers about Tarun Kumar (@heytarunkumar), technical focus areas, OrigoHOST leadership, and research initiatives.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="editorial-card rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <div className="pr-4">
                    <span className="text-[9.5px] font-mono text-[#78000F] uppercase tracking-wider font-bold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#111111]">
                      {item.question}
                    </h3>
                  </div>
                  <span className={`w-6 h-6 rounded-[2px] border border-[#CFC3B3] bg-[#F4EEE4] flex items-center justify-center text-xs font-mono transition-transform duration-300 shrink-0 text-[#78000F] font-bold ${
                    isOpen ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 sm:px-6 pb-5 pt-1 border-t border-[#DDD2C2] text-xs sm:text-sm font-sans font-normal text-[#38342E] leading-relaxed"
                    >
                      {item.answer}
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
