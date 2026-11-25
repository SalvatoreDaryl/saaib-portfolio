/* Saaib portfolio - project library data for the interactive bookshelf
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html).

   HOW TO CUSTOMISE:
   - Edit, add, or remove entries in PROJECTS below.
   - Each entry represents one physical book on the arched bookshelf.
   - Leave link `url` empty ("") to display the placeholder label, or add a real URL when ready. */

const PROJECTS = [
  {
    id: "project-01",
    volume: "VOL. 01",
    title: "Project 01",
    subtitle: "Placeholder Project Subtitle",
    overview:
      "Placeholder overview for Project 01. Replace this with a concise description of what the project is, who it was built for, and what problem it solves.",
    technologies: ["Technology 01", "Framework 02", "Tool 03"],
    contribution:
      "Placeholder for your personal contribution — architecture, UI/UX design, front-end implementation, or key features you built.",
    preview: {
      label: "SCREENSHOT / PREVIEW PLACEHOLDER",
      caption: "Visual preview or screenshot for Project 01 goes here.",
      image: "",
    },
    links: {
      demo: {
        label: "Live Demo",
        url: "",
        placeholder: "Live Demo — Placeholder Link",
      },
      github: {
        label: "GitHub Repository",
        url: "",
        placeholder: "GitHub Repository — Placeholder Link",
      },
      docs: {
        label: "Project Documentation",
        url: "",
        placeholder: "Project Documentation — Placeholder Link",
      },
    },
    book: {
      shelf: 0,
      w: 12,
      h: 31,
      spine: "#4b3859",
      shade: "#31233d",
      trim: "#b8cfa8",
      detail: "botanical",
    },
  },
  {
    id: "project-02",
    volume: "VOL. 02",
    title: "Project 02",
    subtitle: "Placeholder Project Subtitle",
    overview:
      "Placeholder overview for Project 02. Describe the core experience, mechanics, or product goals of this project here.",
    technologies: ["Technology 01", "Framework 02", "Tool 03"],
    contribution:
      "Placeholder for your personal contribution — highlight the parts you designed, coded, or shipped.",
    preview: {
      label: "SCREENSHOT / PREVIEW PLACEHOLDER",
      caption: "Visual preview or screenshot for Project 02 goes here.",
      image: "",
    },
    links: {
      demo: {
        label: "Live Demo",
        url: "",
        placeholder: "Live Demo — Placeholder Link",
      },
      github: {
        label: "GitHub Repository",
        url: "",
        placeholder: "GitHub Repository — Placeholder Link",
      },
      docs: {
        label: "Project Documentation",
        url: "",
        placeholder: "Project Documentation — Placeholder Link",
      },
    },
    book: {
      shelf: 0,
      w: 11,
      h: 28,
      spine: "#425947",
      shade: "#2a3b2e",
      trim: "#d9c28f",
      detail: "bands",
    },
  },
  {
    id: "project-03",
    volume: "VOL. 03",
    title: "Project 03",
    subtitle: "Placeholder Project Subtitle",
    overview:
      "Placeholder overview for Project 03. Explain what this project does and what makes it unique.",
    technologies: ["Technology 01", "Framework 02", "Tool 03"],
    contribution:
      "Placeholder for your personal contribution — detail your role, technical decisions, and outcomes.",
    preview: {
      label: "SCREENSHOT / PREVIEW PLACEHOLDER",
      caption: "Visual preview or screenshot for Project 03 goes here.",
      image: "",
    },
    links: {
      demo: {
        label: "Live Demo",
        url: "",
        placeholder: "Live Demo — Placeholder Link",
      },
      github: {
        label: "GitHub Repository",
        url: "",
        placeholder: "GitHub Repository — Placeholder Link",
      },
      docs: {
        label: "Project Documentation",
        url: "",
        placeholder: "Project Documentation — Placeholder Link",
      },
    },
    book: {
      shelf: 1,
      w: 12,
      h: 30,
      spine: "#384c66",
      shade: "#233145",
      trim: "#cfd6e0",
      detail: "mushroom",
    },
  },
  {
    id: "project-04",
    volume: "VOL. 04",
    title: "Project 04",
    subtitle: "Placeholder Project Subtitle",
    overview:
      "Placeholder overview for Project 04. Summarise the purpose, features, and audience of this project.",
    technologies: ["Technology 01", "Framework 02", "Tool 03"],
    contribution:
      "Placeholder for your personal contribution — outline what you personally built and refined.",
    preview: {
      label: "SCREENSHOT / PREVIEW PLACEHOLDER",
      caption: "Visual preview or screenshot for Project 04 goes here.",
      image: "",
    },
    links: {
      demo: {
        label: "Live Demo",
        url: "",
        placeholder: "Live Demo — Placeholder Link",
      },
      github: {
        label: "GitHub Repository",
        url: "",
        placeholder: "GitHub Repository — Placeholder Link",
      },
      docs: {
        label: "Project Documentation",
        url: "",
        placeholder: "Project Documentation — Placeholder Link",
      },
    },
    book: {
      shelf: 1,
      w: 13,
      h: 32,
      spine: "#5a3d5c",
      shade: "#3b263d",
      trim: "#d8b4d8",
      detail: "roman",
    },
  },
  {
    id: "project-05",
    volume: "VOL. 05",
    title: "Project 05",
    subtitle: "Placeholder Project Subtitle",
    overview:
      "Placeholder overview for Project 05. Add a short narrative covering the concept and functionality.",
    technologies: ["Technology 01", "Framework 02", "Tool 03"],
    contribution:
      "Placeholder for your personal contribution — note your engineering, design, or strategy work.",
    preview: {
      label: "SCREENSHOT / PREVIEW PLACEHOLDER",
      caption: "Visual preview or screenshot for Project 05 goes here.",
      image: "",
    },
    links: {
      demo: {
        label: "Live Demo",
        url: "",
        placeholder: "Live Demo — Placeholder Link",
      },
      github: {
        label: "GitHub Repository",
        url: "",
        placeholder: "GitHub Repository — Placeholder Link",
      },
      docs: {
        label: "Project Documentation",
        url: "",
        placeholder: "Project Documentation — Placeholder Link",
      },
    },
    book: {
      shelf: 2,
      w: 12,
      h: 31,
      spine: "#4e6785",
      shade: "#324459",
      trim: "#b8cfa8",
      detail: "moon",
    },
  },
  {
    id: "project-06",
    volume: "VOL. 06",
    title: "Project 06",
    subtitle: "Placeholder Project Subtitle",
    overview:
      "Placeholder overview for Project 06. Replace with your project summary, goals, and key highlights.",
    technologies: ["Technology 01", "Framework 02", "Tool 03"],
    contribution:
      "Placeholder for your personal contribution — describe what you created and learned.",
    preview: {
      label: "SCREENSHOT / PREVIEW PLACEHOLDER",
      caption: "Visual preview or screenshot for Project 06 goes here.",
      image: "",
    },
    links: {
      demo: {
        label: "Live Demo",
        url: "",
        placeholder: "Live Demo — Placeholder Link",
      },
      github: {
        label: "GitHub Repository",
        url: "",
        placeholder: "GitHub Repository — Placeholder Link",
      },
      docs: {
        label: "Project Documentation",
        url: "",
        placeholder: "Project Documentation — Placeholder Link",
      },
    },
    book: {
      shelf: 2,
      w: 13,
      h: 29,
      spine: "#58755a",
      shade: "#394d3b",
      trim: "#ffd27a",
      detail: "ribbon",
    },
  },
];
