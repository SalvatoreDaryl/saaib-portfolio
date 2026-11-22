/* Saaib portfolio - shared helpers and user settings
   Classic script: top-level names are shared with the other files in js/ (load order is set in index.html). */

const $ = (s, r = document) => r.querySelector(s),
  body = document.body;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
