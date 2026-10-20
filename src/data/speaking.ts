export interface SpeakingModule {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: Array<{
    name: string;
    questionOrNote: string;
  }>;
  practicalPrompt?: string;
}

export interface SpeakingPhoto {
  id: string;
  url: string;
  webpUrl: string;
  alt: string;
  caption: string;
  role: 'primary' | 'presentation' | 'supporting';
  width: number;
  height: number;
}

export interface AppreciationLetterMeta {
  pdfUrl: string;
  fileName: string;
  title: string;
  institution: string;
  location: string;
  organizers: string;
  signatory: string;
  signatoryRole: string;
  recipient: string;
  recipientRole: string;
  date: string;
  summary: string;
  verifiedKeyQuote: string;
}

export interface SpeakingEvent {
  id: string;
  slug: string;
  title: string;
  sessionTitle: string;
  eyebrow: string;
  date: string;
  dateIso: string;
  institution: string;
  location: string;
  organizers: string;
  presenter: string;
  presenterRole: string;
  summary: string;
  thesis: string;
  bookConnection: {
    bookTitle: string;
    relationNote: string;
  };
  modules: SpeakingModule[];
  habitsAndFrameworks: {
    title: string;
    items: Array<{
      action: string;
      description: string;
    }>;
  };
  photos: SpeakingPhoto[];
  appreciationLetter: AppreciationLetterMeta;
  cta: {
    primaryText: string;
    primaryLink: string;
    secondaryText: string;
    secondaryLink: string;
  };
}

export const speakingEventsData: SpeakingEvent[] = [
  {
    id: "nsut-leadership-masterclass-2026",
    slug: "before-the-title-leadership-session",
    title: "Leadership Development Session — Before the Title",
    sessionTitle: "Before the Title: Leadership Development Masterclass",
    eyebrow: "01 / SPEAKING & LEADERSHIP DEVELOPMENT",
    date: "17 October 2026",
    dateIso: "2026-10-17",
    institution: "Netaji Subhas University of Technology (NSUT)",
    location: "Dwarka, New Delhi, India",
    organizers: "SHUNYA 2026 & GDG NSUT (Google Developer Groups NSUT)",
    presenter: "Tarun Kumar",
    presenterRole: "President @ OrigoHOST | Founder, AI & Technology",
    summary:
      "An interactive session exploring how leadership develops through consistent practice, better judgment, communication, feedback, and the ability to lead others.",
    thesis: "You don't need the title to start. You need the repetitions.",
    bookConnection: {
      bookTitle: "Before the Title",
      relationNote:
        "The masterclass curriculum draws directly from the foundational principles of Tarun Kumar's book, 'Before the Title' — centering on actionable decision frameworks, cognitive bias checks, and leading teams without formal authority.",
    },
    modules: [
      {
        number: "01",
        title: "The Traps of Judgment",
        subtitle: "The goal is not to be bias-free; notice the shortcut and check it.",
        description:
          "Cognitive shortcuts can compromise sound engineering and leadership choices. This module presents five recurring judgment traps and equips leaders with targeted self-check questions.",
        items: [
          {
            name: "Confirmation Bias",
            questionOrNote: "What evidence would change my mind?",
          },
          {
            name: "Overconfidence",
            questionOrNote: "How sure am I, and why?",
          },
          {
            name: "Sunk Cost",
            questionOrNote: "Would I start this today?",
          },
          {
            name: "Halo / Horns",
            questionOrNote: "Am I judging one trait or the whole person?",
          },
          {
            name: "Groupthink",
            questionOrNote: "Is agreement hiding dissent?",
          },
        ],
        practicalPrompt: "TRY IT: Circle your most likely bias and write your check question.",
      },
      {
        number: "02",
        title: "Leading Others",
        subtitle: "Influence people who have not been told to listen to you.",
        description:
          "True leadership operates through influence rather than formal organizational hierarchy. This module dissects interpersonal dynamics essential for emerging founders and technical leads.",
        items: [
          {
            name: "Communication",
            questionOrNote: "Framing technical context with clarity, alignment, and shared purpose.",
          },
          {
            name: "Assertiveness & Safety",
            questionOrNote: "Fostering psychological safety while establishing high standards and clear boundaries.",
          },
          {
            name: "Feedback",
            questionOrNote: "Delivering timely, behavior-specific input focused on collaborative growth.",
          },
          {
            name: "Coaching & Motivation",
            questionOrNote: "Cultivating intrinsic ownership and motivating team members toward shared outcomes.",
          },
        ],
        practicalPrompt: "Focus on consistent behavioral repetitions across teams rather than relying on positional authority.",
      },
    ],
    habitsAndFrameworks: {
      title: "Repetitions & Daily Habit System",
      items: [
        {
          action: "Keep a Leadership Journal",
          description: "Document daily interpersonal encounters, decisions made under uncertainty, and self-corrections.",
        },
        {
          action: "Do the Exercises in Writing",
          description: "Articulate bias-checking questions on paper to bypass instinctive rationalization.",
        },
        {
          action: "Re-rate in 30 Days",
          description: "Periodically reassess judgment tendencies and communication patterns against concrete milestones.",
        },
      ],
    },
    photos: [
      {
        id: "photo-appreciation",
        url: "/images/speaking/tarun-leadership-nsut-appreciation.jpg",
        webpUrl: "/images/speaking/tarun-leadership-nsut-appreciation.webp",
        alt: "Tarun Kumar holding the official Letter of Appreciation alongside an organizer at NSUT Delhi, with the slide reading 'You don't need the title to start. You need the repetitions.'",
        caption:
          "Tarun Kumar with an organizing team member holding the Letter of Appreciation at Netaji Subhas University of Technology (NSUT), New Delhi, following the masterclass session.",
        role: "primary",
        width: 768,
        height: 1024,
      },
      {
        id: "photo-judgment-traps",
        url: "/images/speaking/tarun-leadership-nsut-judgment-traps.jpg",
        webpUrl: "/images/speaking/tarun-leadership-nsut-judgment-traps.webp",
        alt: "Tarun Kumar presenting Part 1: The Traps of Judgment to students and attendees in a lecture hall at NSUT Delhi.",
        caption:
          "Tarun Kumar presenting Module 1: 'The Traps of Judgment' at NSUT, breaking down confirmation bias, overconfidence, sunk cost, halo/horns, and groupthink.",
        role: "presentation",
        width: 768,
        height: 1024,
      },
      {
        id: "photo-leading-others",
        url: "/images/speaking/tarun-leadership-nsut-leading-others.jpg",
        webpUrl: "/images/speaking/tarun-leadership-nsut-leading-others.webp",
        alt: "Tarun Kumar speaking on Module 2: Leading Others — Influence people who have not been told to listen to you, in the NSUT lecture hall.",
        caption:
          "Tarun Kumar presenting Module 2: 'Leading Others' at NSUT Delhi, focusing on communication, assertiveness, psychological safety, feedback, and motivation.",
        role: "supporting",
        width: 768,
        height: 1024,
      },
    ],
    appreciationLetter: {
      pdfUrl: "/documents/Letter-of-Appreciation-NSUT-Delhi.pdf",
      fileName: "Letter-of-Appreciation-NSUT-Delhi.pdf",
      title: "Letter of Appreciation for Conducting the 'Before the Title' Leadership Masterclass",
      institution: "Netaji Subhas University of Technology (NSUT)",
      location: "Dwarka, New Delhi - 110078",
      organizers: "SHUNYA 2026 | GDG NSUT",
      signatory: "Mr. Roshan Sharma",
      signatoryRole: "Vice President, GDG NSUT & SHUNYA 2026 Organizing Team",
      recipient: "Mr. Tarun Kumar, President of OrigoHOST (and the OrigoHOST team)",
      recipientRole: "President @ OrigoHOST",
      date: "17 October 2026",
      summary:
        "Official letter of appreciation extended to OrigoHOST and Mr. Tarun Kumar for contributing to the student community through the 'Before the Title' leadership development masterclass at NSUT Delhi on 17 October 2026.",
      verifiedKeyQuote:
        "We appreciate OrigoHOST's initiative in creating a platform for students to explore leadership beyond designations, understand the importance of responsibility and accountability, and develop the mindset required to become effective leaders and changemakers.",
    },
    cta: {
      primaryText: "DISCUSS A SPEAKING ENGAGEMENT",
      primaryLink: "/contact",
      secondaryText: "EXPLORE VENTURE & COMMUNITY",
      secondaryLink: "https://www.origohost.in/",
    },
  },
];
