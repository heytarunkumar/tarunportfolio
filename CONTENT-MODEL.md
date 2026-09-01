# CONTENT MODEL & DATA LAYER ARCHITECTURE

This document describes the data schemas and content abstraction layer designed for Tarun Kumar's portfolio.

---

## 1. Unified State & Service Interface

All public frontend UI components (`Hero`, `Skills`, `Projects`, `EngineeringLab`, `Research`, `Experience`, `Writing`, `Contact`) consume content via abstract getter functions provided by [`PortfolioContext.tsx`](file:///e:/portfolio/src/context/PortfolioContext.tsx):

```ts
interface PortfolioContextType {
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
  navigation: NavItemSetting[];
  seo: SeoSettings;
  design: DesignSettings;
  contact: ContactSettings;
}
```

---

## 2. Core Entity Schemas

### Project Schema
```ts
interface Project {
  number: string;
  title: string;
  slug: string;
  category: 'Python / Backend' | 'Cloud' | 'DevOps' | 'AI / ML';
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  architectureMetrics: Array<{ label: string; value: string }>;
  github?: string;
  featured: boolean;
  status: 'completed' | 'building' | 'learning';
}
```

### Skill Schema
```ts
interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'building' | 'applied';
  status: string;
  description: string;
  relatedProjects: string[];
}
```

### Engineering Lab Track Schema
```ts
interface LabTrack {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  status: 'Completed' | 'Applied' | 'Building' | 'Learning';
  objective: string;
  architecture: string;
  learnings: string[];
  githubUrl: string;
}
```

---

## 3. Database Rule & Future Migration Path

Currently, data is served through repository static models with browser localStorage persistence for Phase 1. 

If persistent multi-user browser editing requires an external database in Phase 2:
1. Introduce **PostgreSQL** with **Prisma ORM**.
2. Connect Prisma queries inside a server-side API or Next.js route handlers matching `PortfolioContext.tsx` getter signatures.
3. **Zero public frontend component rewriting required**.
