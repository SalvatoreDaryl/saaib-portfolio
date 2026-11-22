/* Saaib portfolio - portfolio copy, menu icons and arrow bitmap (edit the text here)
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

/* ============ CONTENT (edit me) ============ */
const SECT = {
  projects: {
    label: "PROJECTS",
    head: "QUEST LOG",
    intro: "Selected quests from the road so far. More unlock soon.",
    items: [
      [
        "ELEGANCE CURTAINS & BLINDS",
        "Client website for a curtains and blinds studio serving Dubai and Abu Dhabi.",
      ],
      [
        "MUGHAL HERITAGE",
        "Multi-page React site exploring Mughal history and architecture.",
      ],
      ["???", "Next quest loading..."],
    ],
  },
  skills: {
    label: "SKILLS",
    head: "SKILL TREE",
    intro: "Stats earned across client work, study and late-night experiments.",
    items: [
      ["FRONT-END", "React, TypeScript, responsive interfaces"],
      ["DEPLOY", "Vercel, Lovable"],
      ["STRATEGY", "Marketing and digital strategy for small businesses"],
      ["STUDY", "BS Computer Science, Air University"],
    ],
  },
  about: {
    label: "ABOUT",
    head: "PLAYER PROFILE",
    intro:
      "Hi, I am Saaib, a creative developer and designer from Pakistan. I mix marketing instincts with hands-on code to build websites small businesses are proud of.",
    items: [
      ["CLASS", "Creative Developer / Designer"],
      ["BASE", "Pakistan"],
      ["SIDE QUEST", "Tinkering with electronics"],
    ],
  },
  contact: {
    label: "CONTACT",
    head: "SEND A MESSAGE",
    intro: "Got a quest for me? Reach out and let us team up.",
    items: [
      [
        "GITHUB",
        "github.com/MuhammadSaaib",
        "https://github.com/MuhammadSaaib",
      ],
      ["EMAIL", "you@example.com (swap in your address)"],
    ],
  },
};
const ICONS = {
  projects: {
    c: ["#ffd27a", "#e8648a"],
    r: [
      "..####..",
      ".#====#.",
      "########",
      "#======#",
      "#==##==#",
      "#==##==#",
      "########",
      "........",
    ],
  },
  skills: {
    c: ["#59d3c3"],
    r: [
      "...##...",
      "...##...",
      "########",
      ".######.",
      "..####..",
      ".##..##.",
      ".#....#.",
      "........",
    ],
  },
  about: {
    c: ["#e8648a"],
    r: [
      ".##..##.",
      "########",
      "########",
      "########",
      ".######.",
      "..####..",
      "...##...",
      "........",
    ],
  },
  contact: {
    c: ["#fff1d6"],
    r: [
      "########",
      "##....##",
      "#.#..#.#",
      "#..##..#",
      "#......#",
      "#......#",
      "########",
      "........",
    ],
  },
};
const ARROW = ["#...", "##..", "###.", "####", "###.", "##..", "#..."];
