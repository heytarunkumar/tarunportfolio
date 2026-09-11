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
    instagram?: string;
  };
  resumeUrl: string;
}

export const profileData: Profile = {
  name: "Tarun Kumar",
  title: "Founder & AI Engineer | Technology Entrepreneur",
  subtitle: "Intelligent Systems · GenAI · Automation · Ventures",
  primaryRole: "Founder & AI Engineer",
  secondaryRole: "Technology Entrepreneur",
  focusAreas: [
    "Artificial Intelligence & GenAI",
    "Intelligent Systems & Architecture",
    "Python Engineering & Automation",
    "Scalable Tech Ventures",
    "Applied AI & Developer Education",
    "Community Building (OrigoHOST)",
  ],
  narrative:
    "Founder, AI Engineer, and Technology Entrepreneur building intelligent systems, AI-powered solutions, and technology-driven ventures. Turning complex problems into practical products and scalable solutions that create measurable value.",
  bio:
    "My work sits at the intersection of Artificial Intelligence, Generative AI, Python engineering, automation, data, and entrepreneurship. Beyond building technology, I work on creating developer communities and enabling students and emerging engineers to gain practical exposure to modern technologies. As the Founder & President of OrigoHOST Tech Community, I lead institutional engagements, technical initiatives, and community growth focused on applied AI and developer education. I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.",
  location: "India · Global / Remote",
  email: "imtarunchaudharyy@gmail.com",
  socials: {
    github: "https://github.com/haytarunkumar",
    linkedin: "https://linkedin.com/in/haytarunkumar",
    x: "https://x.com/heytarunkumarr",
    medium: "https://medium.com/@haytarunkumar",
    instagram: "https://instagram.com/heytarunkumar",
  },
  resumeUrl: "/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf",
};

