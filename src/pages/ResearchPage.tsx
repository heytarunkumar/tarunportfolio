import React, { useEffect } from 'react';
import { ResearchSection } from '../components/sections/ResearchSection';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const ResearchPage: React.FC = () => {
  useEffect(() => {
    const scriptId = 'research-scholarly-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        'headline': 'AI-HealthGuard: Explainable Clinical Risk Stratification for Cardiovascular Prediction',
        'author': {
          '@type': 'Person',
          '@id': SITE_CONFIG.personId,
          'name': 'Tarun Kumar',
          'url': SITE_CONFIG.canonicalUrl,
        },
        'description': 'Peer-reviewed machine learning architecture analyzing clinical tabular health datasets with SHAP-based feature importance explainability.',
        'keywords': ['Explainable AI', 'XAI', 'SHAP', 'Cardiovascular Risk', 'Clinical Machine Learning', 'Tarun Kumar'],
        'inLanguage': 'en',
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
        title="AI &amp; Machine Learning Research"
        description="Read empirical machine learning manuscripts and Explainable AI (XAI) frameworks authored by Tarun Kumar (@heytarunkumar)."
        path="/research"
      />
      <ResearchSection />
    </div>
  );
};

export default ResearchPage;
