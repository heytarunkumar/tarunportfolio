/**
 * Centralized Site and Personal Entity Configuration
 * 
 * All absolute canonical URLs, Schema.org @id identifiers, Open Graph, Twitter/X,
 * sitemap references, and profile links must derive from SITE_URL.
 */

export const SITE_URL = 'https://heytarunkumar.vercel.app';
export const CANONICAL_SITE_URL = 'https://heytarunkumar.vercel.app/';

export const SITE_CONFIG = {
  name: 'Tarun Kumar',
  handle: 'heytarunkumar',
  title: 'Tarun Kumar | Python Developer, AI Engineer & Founder',
  tagline: 'Python Developer | AI Engineer | Researcher | Author | Founder',
  description:
    'Tarun Kumar (@heytarunkumar) is a Python Developer, AI Engineer, Researcher, Author and Founder building Generative AI architectures and intelligent systems.',
  url: SITE_URL,
  canonicalUrl: CANONICAL_SITE_URL,
  personId: `${SITE_URL}/#person`,
  websiteId: `${SITE_URL}/#website`,
  profilePageId: `${SITE_URL}/about#profilepage`,
  faqId: `${SITE_URL}/#faq`,
  organizationId: 'https://origohost.in/#organization',
  defaultOgImage: `${SITE_URL}/images/tarun-executive.webp`,
  socials: {
    linkedin: 'https://www.linkedin.com/in/heytarunkumar/',
    instagram: 'https://www.instagram.com/heytarunkumar/',
    medium: 'https://medium.com/@heytarunkumar/',
    github: 'https://github.com/heytarunkumar',
    x: 'https://x.com/heytarunkumarr',
    linktree: 'https://linktr.ee/heytarunkumar',
  },
  origohost: {
    name: 'OrigoHOST Tech Community',
    url: 'https://origohost.in',
    organizationId: 'https://origohost.in/#organization',
    logo: `${SITE_URL}/images/origohost/origohost-icon.webp`,
  },
} as const;
