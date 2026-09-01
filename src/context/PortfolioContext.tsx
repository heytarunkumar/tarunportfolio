import React, { createContext, useContext, useState } from 'react';
import { profileData as initialProfile, type Profile } from '../data/profile';
import { projectsData as initialProjects, type Project } from '../data/projects';
import { skillsData as initialSkills, type SkillGroup } from '../data/skills';
import { engineeringLabTracks as initialLab, type LabTrack } from '../data/engineeringLab';
import { researchData as initialResearch, type ResearchProject } from '../data/research';
import { experienceData as initialExperience, type ExperienceItem } from '../data/experience';
import { articlesData as initialArticles, type Article } from '../data/articles';

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  robotsIndex: boolean;
  sitemapEnabled: boolean;
}

export interface DesignSettings {
  theme: 'dark' | 'light' | 'system';
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  morphingEnabled: boolean;
  pageTransitionsEnabled: boolean;
  animationIntensity: 'low' | 'medium' | 'high';
}

export interface ContactSettings {
  email: string;
  formEnabled: boolean;
  spamProtection: boolean;
  successMessage: string;
  inboxMessages: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
    read: boolean;
  }>;
}

export interface NavItemSetting {
  id: string;
  name: string;
  path: string;
  visible: boolean;
  order: number;
}

export interface PortfolioContextType {
  profile: Profile;
  updateProfile: (updated: Partial<Profile>) => void;

  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (slug: string, updated: Partial<Project>) => void;
  deleteProject: (slug: string) => void;

  skills: SkillGroup[];
  updateSkills: (groups: SkillGroup[]) => void;

  labTracks: LabTrack[];
  updateLabTracks: (tracks: LabTrack[]) => void;

  experience: ExperienceItem[];
  updateExperience: (items: ExperienceItem[]) => void;

  research: ResearchProject;
  updateResearch: (updated: Partial<ResearchProject>) => void;

  articles: Article[];
  updateArticles: (articles: Article[]) => void;

  navigation: NavItemSetting[];
  updateNavigation: (nav: NavItemSetting[]) => void;

  seo: SeoSettings;
  updateSeo: (seo: Partial<SeoSettings>) => void;

  design: DesignSettings;
  updateDesign: (design: Partial<DesignSettings>) => void;

  contact: ContactSettings;
  updateContact: (contact: Partial<ContactSettings>) => void;
  addMessage: (msg: { name: string; email: string; message: string }) => void;
  markMessageRead: (id: string) => void;
}

const STORAGE_PREFIX = 'tarun_portfolio_cms_';

const safeGetStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(STORAGE_PREFIX + key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const safeSetStorage = <T,>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {
    // Fail gracefully
  }
};

const initialNav: NavItemSetting[] = [
  { id: '1', name: 'HOME', path: '/', visible: true, order: 1 },
  { id: '2', name: 'ABOUT', path: '/about', visible: true, order: 2 },
  { id: '3', name: 'PROJECTS', path: '/projects', visible: true, order: 3 },
  { id: '4', name: 'ENGINEERING LAB', path: '/lab', visible: true, order: 4 },
  { id: '5', name: 'RESEARCH', path: '/research', visible: true, order: 5 },
  { id: '6', name: 'EXPERIENCE', path: '/experience', visible: true, order: 6 },
  { id: '7', name: 'CONTACT', path: '/contact', visible: true, order: 7 },
];

const initialSeo: SeoSettings = {
  siteTitle: 'Tarun Kumar — Python Developer | Cloud & DevOps Engineer',
  metaDescription:
    'Portfolio of Tarun Kumar. Python Developer building backend services, REST APIs, automation workflows, and cloud solutions.',
  keywords: 'Tarun Kumar, Python Developer, Backend Developer, Cloud Engineer, DevOps Engineer, REST API, Docker, AWS',
  canonicalUrl: 'https://heytarunkumar.vercel.app',
  ogTitle: 'Tarun Kumar — Python Developer | Cloud & DevOps Engineer',
  ogDescription: 'Python-focused developer building backend services, APIs, automation workflows, and cloud solutions.',
  ogImage: 'https://heytarunkumar.vercel.app/og-image.png',
  twitterCard: 'summary_large_image',
  robotsIndex: true,
  sitemapEnabled: true,
};

const initialDesign: DesignSettings = {
  theme: 'dark',
  primaryColor: '#D4AF37',
  accentColor: '#8C6D4F',
  backgroundColor: '#0A0806',
  morphingEnabled: true,
  pageTransitionsEnabled: true,
  animationIntensity: 'high',
};

const initialContact: ContactSettings = {
  email: 'imtarunchaudharyy@gmail.com',
  formEnabled: true,
  spamProtection: true,
  successMessage: 'Message transmitted successfully. Tarun will get back to you shortly.',
  inboxMessages: [
    {
      id: 'msg-1',
      name: 'Engineering Recruiter',
      email: 'recruiter@techfirm.com',
      message: 'Hi Tarun, loved your Python backend & DevOps project architecture. Let us connect!',
      date: '2026-08-28 14:30',
      read: true,
    },
  ],
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(() => safeGetStorage('profile', initialProfile));
  const [projects, setProjects] = useState<Project[]>(() => safeGetStorage('projects', initialProjects));
  const [skills, setSkills] = useState<SkillGroup[]>(() => safeGetStorage('skills', initialSkills));
  const [labTracks, setLabTracks] = useState<LabTrack[]>(() => safeGetStorage('lab', initialLab));
  const [experience, setExperience] = useState<ExperienceItem[]>(() => safeGetStorage('experience', initialExperience));
  const [research, setResearch] = useState<ResearchProject>(() => safeGetStorage('research', initialResearch));
  const [articles, setArticles] = useState<Article[]>(() => safeGetStorage('articles', initialArticles));
  const [navigation, setNavigation] = useState<NavItemSetting[]>(() => safeGetStorage('navigation', initialNav));
  const [seo, setSeo] = useState<SeoSettings>(() => safeGetStorage('seo', initialSeo));
  const [design, setDesign] = useState<DesignSettings>(() => safeGetStorage('design', initialDesign));
  const [contact, setContact] = useState<ContactSettings>(() => safeGetStorage('contact', initialContact));

  // Save changes to LocalStorage
  const updateProfile = (updated: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      safeSetStorage('profile', next);
      return next;
    });
  };

  const addProject = (project: Project) => {
    setProjects((prev) => {
      const next = [project, ...prev];
      safeSetStorage('projects', next);
      return next;
    });
  };

  const updateProject = (slug: string, updated: Partial<Project>) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.slug === slug ? { ...p, ...updated } : p));
      safeSetStorage('projects', next);
      return next;
    });
  };

  const deleteProject = (slug: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.slug !== slug);
      safeSetStorage('projects', next);
      return next;
    });
  };

  const updateSkills = (groups: SkillGroup[]) => {
    setSkills(groups);
    safeSetStorage('skills', groups);
  };

  const updateLabTracks = (tracks: LabTrack[]) => {
    setLabTracks(tracks);
    safeSetStorage('lab', tracks);
  };

  const updateExperience = (items: ExperienceItem[]) => {
    setExperience(items);
    safeSetStorage('experience', items);
  };

  const updateResearch = (updated: Partial<ResearchProject>) => {
    setResearch((prev) => {
      const next = { ...prev, ...updated };
      safeSetStorage('research', next);
      return next;
    });
  };

  const updateArticles = (art: Article[]) => {
    setArticles(art);
    safeSetStorage('articles', art);
  };

  const updateNavigation = (nav: NavItemSetting[]) => {
    setNavigation(nav);
    safeSetStorage('navigation', nav);
  };

  const updateSeo = (updated: Partial<SeoSettings>) => {
    setSeo((prev) => {
      const next = { ...prev, ...updated };
      safeSetStorage('seo', next);
      return next;
    });
  };

  const updateDesign = (updated: Partial<DesignSettings>) => {
    setDesign((prev) => {
      const next = { ...prev, ...updated };
      safeSetStorage('design', next);
      return next;
    });
  };

  const updateContact = (updated: Partial<ContactSettings>) => {
    setContact((prev) => {
      const next = { ...prev, ...updated };
      safeSetStorage('contact', next);
      return next;
    });
  };

  const addMessage = (msg: { name: string; email: string; message: string }) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      name: msg.name,
      email: msg.email,
      message: msg.message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
    };
    setContact((prev) => {
      const next = {
        ...prev,
        inboxMessages: [newMsg, ...prev.inboxMessages],
      };
      safeSetStorage('contact', next);
      return next;
    });
  };

  const markMessageRead = (id: string) => {
    setContact((prev) => {
      const next = {
        ...prev,
        inboxMessages: prev.inboxMessages.map((m) => (m.id === id ? { ...m, read: true } : m)),
      };
      safeSetStorage('contact', next);
      return next;
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        updateProfile,
        projects,
        addProject,
        updateProject,
        deleteProject,
        skills,
        updateSkills,
        labTracks,
        updateLabTracks,
        experience,
        updateExperience,
        research,
        updateResearch,
        articles,
        updateArticles,
        navigation,
        updateNavigation,
        seo,
        updateSeo,
        design,
        updateDesign,
        contact,
        updateContact,
        addMessage,
        markMessageRead,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
