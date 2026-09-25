import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/site';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = SITE_CONFIG.description,
  path = '',
  ogImage = SITE_CONFIG.defaultOgImage,
  noindex = false,
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title
      ? `${title} | Tarun Kumar (@heytarunkumar)`
      : SITE_CONFIG.title;
    document.title = fullTitle;

    // 2. Canonical URL
    const canonicalUrl = `${SITE_CONFIG.url}${path.startsWith('/') ? path : `/${path}`}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 3. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 4. OpenGraph Tags
    const updateMeta = (selector: string, content: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (meta) {
        meta.setAttribute('content', content);
      }
    };

    updateMeta('meta[property="og:title"]', fullTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[property="og:image"]', ogImage);
    updateMeta('meta[name="twitter:title"]', fullTitle);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', ogImage);

    // 5. Robots tag (noindex if requested)
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (metaRobots) {
      metaRobots.setAttribute(
        'content',
        noindex
          ? 'noindex, nofollow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      );
    }
  }, [title, description, path, ogImage, noindex]);

  return null;
};
