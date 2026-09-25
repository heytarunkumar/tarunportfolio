import React, { useEffect } from 'react';
import { ResearchSection } from '../components/sections/ResearchSection';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const ResearchPage: React.FC = () => {
  useEffect(() => {
    const scriptId = 'research-article-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        '@id': `${SITE_CONFIG.url}/research#paper-healthguard`,
        'name': 'AI-HealthGuard: Multi-Disease Risk Prediction Using Explainable AI (XAI / SHAP)',
        'headline': 'AI-HealthGuard: Machine Learning Risk Stratification with SHAP Explainability on Tabular Health Data',
        'author': {
          '@id': SITE_CONFIG.personId,
        },
        'publisher': {
          '@id': SITE_CONFIG.personId,
        },
        'mainEntityOfPage': `${SITE_CONFIG.url}/research`,
        'about': [
          'Explainable AI',
          'Machine Learning',
          'SHAP',
          'Tabular Health Data',
          'Predictive Modeling',
        ],
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
        title="Explainable AI &amp; ML Research"
        description="Empirical machine learning research, SHAP explainability benchmarks, and clinical tabular risk modeling by Tarun Kumar (@heytarunkumar)."
        path="/research"
      />
      <ResearchSection />
    </div>
  );
};

export default ResearchPage;
