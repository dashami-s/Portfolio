(function () {
  const STORAGE_KEY = "dashami_portfolio_content_v9";
  const PREFERRED_GITHUB_URL = "https://github.com/dashami-s";
  const LEGACY_GITHUB_TEST_PATTERN = /(https?:\/\/)?(www\.)?github\.com\/dashami-s-2004\/?/i;
  const LEGACY_GITHUB_REPLACE_PATTERN = /(https?:\/\/)?(www\.)?github\.com\/dashami-s-2004\/?/gi;

  const defaultContent = {
    landing: {
      eyebrow: "DASHAMI S",
      title: "B.Tech CSE Student | Ready for Available Job Profiles",
      description:
        "B.Tech Computer Science and Engineering student with experience in project coordination, documentation, and team collaboration, ready to contribute across available entry-level job profiles.",
      primaryLabel: "View Portfolio",
      primaryHref: "portfolio.html#about",
      secondaryLabel: "Projects",
      secondaryHref: "portfolio.html#projects",
      profilePanel: {
        title: "Education",
        meta: "Presidency University",
        lines: [
          "B.Tech (Computer Science and Engineering)",
          "08/2022 - Present",
          "Bengaluru, India"
        ]
      },
      contactPanel: {
        title: "Contact",
        meta: "Banglore, Karnataka",
        description: "dashamishetty2004@gmail.com | 8971408959"
      },
      chips: ["Python", "Power BI", "Project Coordination"],
      stats: [
        { value: "Top 10", label: "Inventra'25 Capstone shortlist" },
        { value: "26 / 450", label: "Student Project Expo 2024 rank" },
        { value: "50+", label: "RC Rally participants supported" }
      ],
      highlights: [
        {
          label: "Objective",
          title: "Entry-level job profile readiness",
          description: "Support teams with tracking project progress, report maintenance, process improvement, and on-time delivery.",
          href: "portfolio.html#about",
          cta: "Career Objective"
        },
        {
          label: "Experience",
          title: "STEM Club | BUILD Club",
          description: "Worked on activity planning, approvals, documentation, and timely execution as Social Media Manager and Core Member.",
          href: "portfolio.html#experience",
          cta: "Professional Experience"
        },
        {
          label: "Projects",
          title: "RoboDog | Finance Tracker | Handibuddy",
          description: "Built projects across AI robotics, finance tracking, and accessibility-focused mobile application development.",
          href: "portfolio.html#projects",
          cta: "Projects"
        }
      ]
    },
    about: {
      eyebrow: "CAREER OBJECTIVE",
      title: "Detail-oriented Computer Science Engineering graduate.",
      description:
        "Detail-oriented Computer Science Engineering graduate with experience in project coordination, documentation, and team collaboration through academic and organizational projects. Ready to work according to available entry-level job profiles where I can assist teams in tracking project progress, maintenance of reports, support to process improvement, and on-time delivery while learning industry best practices.",
      cards: [
        {
          label: "Role Focus",
          title: "Ready for suitable job profiles",
          description: "Prepared to contribute across available entry-level roles with focus on project tracking, reporting, and execution support."
        },
        {
          label: "Strength",
          title: "Coordination and documentation",
          description: "Experience with project coordination, approvals, and structured documentation in academic and organizational teams."
        },
        {
          label: "Work Style",
          title: "Collaborative and detail-oriented",
          description: "Combines professional communication, analytical problem solving, and accountability in fast-paced team environments."
        }
      ],
      education: {
        degree: "B.Tech (Computer Science and Engineering)",
        institution: "Presidency University",
        dates: "08/2022 - Present",
        location: "Bengaluru, India"
      },
      softSkills: [
        "Professional communication",
        "Cross-functional collaboration",
        "Analytical problem solving",
        "Time & task management",
        "Adaptability in fast-paced environments",
        "Ownership & accountability",
        "Attention to detail"
      ],
      technicalGroups: [
        {
          label: "Programming & Scripting",
          items: ["Python", "Java", "JavaScript", "C++", "C#"]
        },
        {
          label: "Data Analysis & Reporting",
          items: ["Python (NumPy, Pandas)", "Power BI", "Excel-based analysis"]
        },
        {
          label: "Web & Application Fundamentals",
          items: ["HTML", "CSS", "Node.js"]
        },
        {
          label: "Databases",
          items: ["MySQL (data storage, querying, reporting)"]
        },
        {
          label: "Version Control & Collaboration",
          items: ["GitHub"]
        },
        {
          label: "Hardware & Embedded Systems (Academic Projects)",
          items: ["Arduino", "Raspberry Pi", "ESP32"]
        }
      ]
    },
    experience: {
      eyebrow: "PROFESSIONAL EXPERIENCE",
      title: "STEM Club and BUILD Club roles",
      description:
        "Planned and organized activities, coordinated approvals and updates, maintained project documentation, and supported timely team execution.",
      roles: [
        {
          organization: "STEM Club",
          role: "Social Media Manager",
          dates: "08/2025 - Present",
          location: "Presidency University, Bengaluru, India",
          bullets: [
            "Planned and organized club activities and tracked engagement outcomes.",
            "Coordinated with team members and faculty for approvals and updates.",
            "Maintained basic documentation and progress updates."
          ]
        },
        {
          organization: "BUILD Club",
          role: "Core Member",
          dates: "07/2024 - Present",
          location: "Presidency University, Bengaluru, India",
          bullets: [
            "Supported project and event execution through task coordination.",
            "Assisted in documentation and the smooth conduct of workshops.",
            "Collaborated with peers to ensure the timely completion of activities."
          ]
        }
      ]
    },
    work: {
      eyebrow: "PROJECTS",
      title: "Academic and application-focused project work",
      description:
        "AI-Powered Autonomous Security RoboDog (Capstone Project), Personal Finance Tracker - Web Application, and Handibuddy.com - Mobile Application.",
      gallery: [
        {
          label: "07/2025 - Present",
          title: "AI-Powered Autonomous Security RoboDog (Capstone Project)",
          description: "Planned project activities and coordinated task execution.",
          image: "",
          bullets: [
            "Maintained documentation and progress updates.",
            "Delivered a working prototype, shortlisted in the Top 10 projects."
          ]
        },
        {
          label: "04/2025 - 05/2025",
          title: "Personal Finance Tracker - Web Application",
          description: "Analyzed user needs and translated them into application features.",
          image: "",
          bullets: [
            "Ensured accuracy of financial calculations and data flow.",
            "Created dashboards for clear data visualization."
          ]
        },
        {
          label: "10/2023 - 05/2024",
          title: "Handibuddy.com - Mobile Application",
          description: "Analyzed user needs with focus on accessibility.",
          image: "",
          bullets: [
            "Documented workflows and supported feature delivery."
          ]
        }
      ]
    },
    recognition: {
      eyebrow: "CERTIFICATIONS & ACHIEVEMENTS",
      title: "Certifications, achievements, organisations, and languages",
      description:
        "Portfolio highlights from certifications, university project expos, event coordination, and communication skills.",
      certifications: [
        "The Complete Full-Stack Web Development Bootcamp.",
        "Data Visualization Techniques from Infosys, Springboard.",
        "Machine Learning, using Python from SimpliLearn SkillUP.",
        "Microsoft Power BI Desktop for Business Intelligence.",
        "AWS certified Cloud Practitioner CLF-CO2 2025."
      ],
      achievements: [
        {
          title: "INVENTRA'25 - CAPSTONE PROJECT EXPO",
          date: "27/11/2025",
          description: "Presidency University. Represented the ROBO-DOG project and got into the Top 10 Projects. Hardware project with integration of face detection has an AI-Powered Autonomous Security Robot."
        },
        {
          title: "IOT AND ROBOTICS - VAC CERTIFICATION",
          date: "07/07/2025",
          description: "Presidency University. Completed an IoT & Robotics certification, gaining hands-on experience with sensors, automation, and building prototypes like an object-detecting car and RoboDog."
        },
        {
          title: "STUDENT PROJECT EXPO 2024",
          date: "03/06/2024",
          description: "Presidency University. Top 26th Project out of 450 Projects. Developed two websites, one for Brain Haemorrhage and another for Detecting different stages Lung Diseases."
        }
      ],
      organizations: [
        {
          title: "Build Club-MAKERSPACE | Event Coordinator-RC RALLY",
          date: "04/2025",
          description: "Coordinated the RC Rally off-road racing event, managing logistics, track setup, and supporting 50+ participants for a smooth and engaging competition."
        },
        {
          title: "Office of International Affairs | Volunteer",
          date: "08/2024",
          description: "Recognition and appreciation for dedication and commitment at \"ACHIVERS DIALOGUES-2024\"."
        }
      ],
      languages: [
        { name: "Kannada", level: "Native / Bilingual" },
        { name: "Hindi", level: "Basic" },
        { name: "English", level: "Fluent" }
      ]
    },
    contact: {
      eyebrow: "CONTACT",
      title: "DASHAMI S",
      description:
        "dashamishetty2004@gmail.com | 8971408959 | https://www.linkedin.com/in/dashamis5426 | https://github.com/dashami-s",
      directNote: "Ready to work across available entry-level job profiles and assist teams with project tracking, report maintenance, process improvement, and on-time delivery.",
      email: "dashamishetty2004@gmail.com",
      phone: "8971408959",
      location: "Banglore, Karnataka",
      linkedin: "https://www.linkedin.com/in/dashamis5426",
      github: "https://github.com/dashami-s",
      notes: [
        {
          label: "LinkedIn",
          title: "dashamis5426",
          description: "https://www.linkedin.com/in/dashamis5426"
        },
        {
          label: "GitHub",
          title: "dashami-s",
          description: "https://github.com/dashami-s"
        }
      ]
    }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeDefaults(base, incoming) {
    if (Array.isArray(base)) {
      return Array.isArray(incoming) ? incoming : clone(base);
    }

    if (!base || typeof base !== "object") {
      return incoming === undefined ? base : incoming;
    }

    const result = {};
    for (const key of Object.keys(base)) {
      result[key] = mergeDefaults(base[key], incoming ? incoming[key] : undefined);
    }

    if (incoming && typeof incoming === "object") {
      for (const key of Object.keys(incoming)) {
        if (!(key in result)) {
          result[key] = incoming[key];
        }
      }
    }

    return result;
  }

  function normalizeGithubLinks(content) {
    const next = clone(content || {});
    if (!next.contact) {
      return next;
    }

    const contact = next.contact;
    const githubValue = String(contact.github || "").trim();
    const hasPreferredGithub = githubValue.toLowerCase() === PREFERRED_GITHUB_URL.toLowerCase();

    if (!githubValue || LEGACY_GITHUB_TEST_PATTERN.test(githubValue)) {
      contact.github = PREFERRED_GITHUB_URL;
    } else if (!hasPreferredGithub) {
      contact.github = githubValue;
    }

    if (typeof contact.description === "string") {
      contact.description = contact.description.replace(LEGACY_GITHUB_REPLACE_PATTERN, PREFERRED_GITHUB_URL);
    }

    if (Array.isArray(contact.notes)) {
      contact.notes = contact.notes.map((note) => {
        const normalizedNote = { ...note };

        if (typeof normalizedNote.description === "string") {
          normalizedNote.description = normalizedNote.description.replace(LEGACY_GITHUB_REPLACE_PATTERN, PREFERRED_GITHUB_URL);
        }

        if (String(normalizedNote.label || "").toLowerCase() === "github") {
          normalizedNote.title = "dashami-s";
          if (!normalizedNote.description) {
            normalizedNote.description = PREFERRED_GITHUB_URL;
          }
        }

        return normalizedNote;
      });
    }

    return next;
  }

  function getContent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return normalizeGithubLinks(defaultContent);
      }
      return normalizeGithubLinks(mergeDefaults(defaultContent, JSON.parse(raw)));
    } catch (error) {
      console.warn("Falling back to default content.", error);
      return normalizeGithubLinks(defaultContent);
    }
  }

  function saveContent(content) {
    const normalized = normalizeGithubLinks(content);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function resetContent() {
    localStorage.removeItem(STORAGE_KEY);
    return normalizeGithubLinks(defaultContent);
  }

  window.SiteData = {
    STORAGE_KEY,
    defaultContent,
    getContent,
    saveContent,
    resetContent,
    clone
  };
})();
