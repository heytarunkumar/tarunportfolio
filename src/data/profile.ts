export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  primaryRole: string;
  secondaryRole: string;
  focusAreas: string[];
  narrative: string;
  bio: string;
  location: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    x: string;
    medium: string;
  };
  resumeUrl: string;
}

export const profileData: Profile = {
  name: "Tarun Kumar",
  title: "Python Developer | Cloud & DevOps Engineer",
  subtitle: "AI, Machine Learning & Automation",
  primaryRole: "Python Developer",
  secondaryRole: "Cloud & DevOps Engineer",
  focusAreas: [
    "Python Backend APIs",
    "Automation & Workflows",
    "Cloud Infrastructure (AWS)",
    "Containerization (Docker)",
    "CI/CD Pipelines",
    "AI / ML Integration",
  ],
  narrative:
    "A Python-focused developer building backend applications, REST APIs, automation workflows, and cloud-based solutions while progressively developing practical hands-on expertise in modern DevOps and infrastructure engineering.",
  bio:
    "I specialize in architecting scalable Python services, reliable REST APIs, automated backend workflows, and cloud solutions. I am actively expanding my hands-on technical stack into container orchestration, Infrastructure as Code, CI/CD pipelines, and cloud systems engineering, with machine learning and generative AI as complementary specializations.",
  location: "India · Open to Remote",
  email: "imtarunchaudharyy@gmail.com",
  socials: {
    github: "https://github.com/heytarunkumar",
    linkedin: "https://linkedin.com/in/heytarunkumar",
    x: "https://x.com/heytarunkumar",
    medium: "https://medium.com/@heytarunkumar",
  },
  resumeUrl: "/resume/tarun-kumar-resume.pdf",
};
