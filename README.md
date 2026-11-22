# Saaib Portfolio - Pixel Game Title Screen

An interactive, game-style portfolio entrance: pixel-art sunset scene, a cursor-following cat on a fishing deck,
a log cabin you enter with PRESS START, and an in-game Quick Access menu. No build step, no dependencies.

## Run
Open `index.html` in any modern browser (double-click works), or serve the folder:

    npx serve .

The pixel font (Press Start 2P) loads from Google Fonts, so an internet connection is needed for the exact look.

## Structure
    index.html          markup (title screen, quick-access menu, cabin dialogue, iris overlay)
    css/style.css       all styling, responsive rules, reduced-motion support
    js/                 classic scripts that share one global scope; load order is set in index.html
      config.js         shared helpers and the reduced-motion flag
      content.js        PORTFOLIO TEXT (SECT), menu icons, arrow bitmap  <-- edit your copy here
      pixel-utils.js    320x180 canvas setup, constants, pixel/dither helpers
      world.js          sky, sun, mountains, lake, banks, foreground, stars, clouds, trees, grass
      state.js          pointer tracking (scene coordinates) and layer helpers
      scenery.js        animated cloud and pine-tree drawing
      cat.js            cat sprite + cursor-following behaviour (turns, leans head, eyes track)
      cabin.js          exterior cabin, door, fishing deck, rod, line and bobber
      interior.js       cabin interior (window, fireplace, shelves, rug) and its renderer
      render.js         exterior renderer, frame loop, startup paint
      ui.js             menu items, dialogue box, enter/leave cabin
      transitions.js    iris wipe, door-open transition, go / back
      main.js           keyboard input, #hash routing (#projects, #skills, #about, #contact), startup

## Customise
- Section text, project list, links and email: `js/content.js` (the `SECT` object). Replace `you@example.com`.
- Title text: `index.html` (`<h1>`, `.sub`).
- Colours: palette hex values are in `js/world.js`, `js/cabin.js`, `js/cat.js`; UI colours are CSS variables at the top of `css/style.css`.

## Controls
Enter / Space / tap = start. Arrow keys move through the menu. Esc = back to the title. Quick Access skips straight to a section.

## Deploy
Drop the folder on Vercel, Netlify or GitHub Pages (static site, no config needed).
