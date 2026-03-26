(function () {
  const STORAGE_KEY = "dashami_portfolio_content_v4";

  const defaultContent = {
    landing: {
      eyebrow: "Dashami S",
      title: "Analyst-minded. Detail-driven. Ready to support delivery.",
      description:
        "Computer Science Engineering graduate with experience in project coordination, documentation, reporting, and team collaboration through academic and organizational work.",
      primaryLabel: "View Portfolio",
      primaryHref: "portfolio.html#about",
      secondaryLabel: "See Projects",
      secondaryHref: "portfolio.html#projects",
      stats: [
        { value: "Top 10", label: "Inventra'25 Capstone shortlist" },
        { value: "50+", label: "Participants supported in RC Rally" },
        { value: "26 / 450", label: "Student Project Expo ranking" }
      ],
      highlights: [
        {
          label: "Objective",
          title: "Analyst / PMO-support focus",
          description: "Interested in tracking progress, maintaining reports, supporting process improvement, and helping teams stay on time.",
          href: "portfolio.html#about",
          cta: "Read Objective"
        },
        {
          label: "Experience",
          title: "Coordination and documentation",
          description: "Hands-on involvement in planning activities, securing approvals, and keeping updates visible across student teams.",
          href: "portfolio.html#experience",
          cta: "View Experience"
        },
        {
          label: "Projects",
          title: "AI, finance, accessibility",
          description: "Academic work spanning robotics, finance tracking, accessibility, and healthcare-focused web solutions.",
          href: "portfolio.html#projects",
          cta: "See Projects"
        }
      ]
    },
    about: {
      eyebrow: "Career Objective",
      title: "Supporting structured progress, clear reporting, and on-time delivery.",
      description:
        "Detail-oriented Computer Science Engineering graduate with experience in project coordination, documentation, and team collaboration through academic and organizational projects. Looking to work as an Analyst or PMO-support professional where I can assist teams in tracking project progress, maintaining reports, supporting process improvement, and enabling on-time delivery while learning industry best practices.",
      cards: [
        {
          label: "Focus",
          title: "Reporting and coordination",
          description: "Comfortable supporting teams with updates, follow-through, task visibility, and communication across moving pieces."
        },
        {
          label: "Strength",
          title: "Documentation and clarity",
          description: "Brings attention to detail, structured notes, and dependable progress visibility to collaborative work."
        },
        {
          label: "Approach",
          title: "Analytical problem solving",
          description: "Combines technical fundamentals with a practical mindset for organized execution and continuous improvement."
        }
      ],
      education: {
        degree: "B.Tech in Computer Science and Engineering",
        institution: "Presidency University",
        dates: "08/2022 - Present",
        location: "Bengaluru, India"
      },
      softSkills: [
        "Professional communication",
        "Cross-functional collaboration",
        "Analytical problem solving",
        "Time and task management",
        "Adaptability in fast-paced environments",
        "Ownership and accountability",
        "Attention to detail"
      ],
      technicalGroups: [
        {
          label: "Programming and Scripting",
          items: ["Python", "Java", "JavaScript", "C++", "C#"]
        },
        {
          label: "Data Analysis and Reporting",
          items: ["NumPy", "Pandas", "Power BI", "Excel-based analysis"]
        },
        {
          label: "Web and Application Fundamentals",
          items: ["HTML", "CSS", "Node.js"]
        },
        {
          label: "Databases",
          items: ["MySQL"]
        },
        {
          label: "Version Control and Collaboration",
          items: ["GitHub"]
        },
        {
          label: "Hardware and Embedded Systems",
          items: ["Arduino", "Raspberry Pi", "ESP32"]
        }
      ]
    },
    experience: {
      eyebrow: "Professional Experience",
      title: "Academic and organizational roles with coordination ownership.",
      description:
        "Experience across student clubs and university activities with emphasis on planning, communication, approvals, documentation, and keeping execution on track.",
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
      eyebrow: "Projects",
      title: "Selected academic and product-focused work.",
      description:
        "Projects spanning AI, web applications, accessibility, and healthcare-focused problem solving, with attention to execution, documentation, and user needs.",
      gallery: [
        {
          label: "07/2025 - Present",
          title: "AI-Powered Autonomous Security RoboDog",
          description: "Planned project activities, coordinated task execution, and maintained documentation and progress updates throughout the capstone build.",
          image: "",
          bullets: [
            "Delivered a working prototype shortlisted in the Top 10 projects.",
            "Hardware project with face detection integration for AI-powered autonomous security."
          ]
        },
        {
          label: "04/2025 - 05/2025",
          title: "Personal Finance Tracker Web Application",
          description: "Analyzed user needs and translated them into application features for practical financial tracking and reporting.",
          image: "",
          bullets: [
            "Ensured accuracy of financial calculations and data flow.",
            "Created dashboards for clear data visualization."
          ]
        },
        {
          label: "10/2023 - 05/2024",
          title: "Handibuddy.com Mobile Application",
          description: "Worked with accessibility-focused user needs, documented workflows, and supported structured feature delivery.",
          image: "",
          bullets: [
            "Analyzed user needs with a focus on accessibility.",
            "Documented workflows and supported feature delivery."
          ]
        },
        {
          label: "03/06/2024",
          title: "Healthcare Detection Websites",
          description: "Developed one website for brain haemorrhage detection and another for detecting different stages of lung diseases.",
          image: "",
          bullets: [
            "Presented at Student Project Expo 2024.",
            "Ranked in the Top 26 projects out of 450 entries."
          ]
        }
      ]
    },
    recognition: {
      eyebrow: "Recognition",
      title: "Certifications, achievements, and involvement.",
      description:
        "A snapshot of certifications, recognitions, event coordination, and broader contribution beyond coursework.",
      certifications: [
        "The Complete Full-Stack Web Development Bootcamp",
        "Data Visualization Techniques from Infosys Springboard",
        "Machine Learning Using Python from SimpliLearn SkillUP",
        "Microsoft Power BI Desktop for Business Intelligence",
        "AWS Certified Cloud Practitioner CLF-C02 (2025)"
      ],
      achievements: [
        {
          title: "Inventra'25 - Capstone Project Expo",
          date: "27/11/2025",
          description: "Represented the RoboDog project and reached the Top 10 with an AI-powered autonomous security robot integrating face detection."
        },
        {
          title: "IoT and Robotics - VAC Certification",
          date: "07/07/2025",
          description: "Completed an IoT and Robotics certification with hands-on work in sensors, automation, and prototypes like an object-detecting car and RoboDog."
        },
        {
          title: "Student Project Expo 2024",
          date: "03/06/2024",
          description: "Placed in the Top 26 projects out of 450 with healthcare detection websites."
        }
      ],
      organizations: [
        {
          title: "Build Club Makerspace - Event Coordinator, RC Rally",
          date: "04/2025",
          description: "Coordinated the RC Rally off-road racing event, managed logistics and track setup, and supported 50+ participants for a smooth competition."
        },
        {
          title: "Office of International Affairs - Volunteer",
          date: "08/2024",
          description: "Recognized for dedication and commitment during Achivers Dialogues-2024."
        }
      ],
      languages: [
        { name: "Kannada", level: "Native / Bilingual" },
        { name: "English", level: "Fluent" },
        { name: "Hindi", level: "Basic" }
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "Open to analyst, PMO-support, and early-career opportunities.",
      description:
        "If you are looking for someone who can support documentation, reporting, coordination, and reliable follow-through, I would be glad to connect.",
      email: "dashamishetty2004@gmail.com",
      phone: "8971408959",
      location: "Bangalore, Karnataka",
      linkedin: "https://www.linkedin.com/in/dashamis5426",
      github: "https://github.com/Dashami-S-2004",
      notes: [
        {
          label: "Availability",
          title: "Ready to contribute",
          description: "Interested in analyst, PMO-support, project coordination, and early-career roles where structured execution matters."
        },
        {
          label: "Profiles",
          title: "Professional links",
          description: "LinkedIn and GitHub are available for a fuller view of experience, projects, and technical work."
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

  function getContent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return clone(defaultContent);
      }
      return mergeDefaults(defaultContent, JSON.parse(raw));
    } catch (error) {
      console.warn("Falling back to default content.", error);
      return clone(defaultContent);
    }
  }

  function saveContent(content) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    return content;
  }

  function resetContent() {
    localStorage.removeItem(STORAGE_KEY);
    return clone(defaultContent);
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
