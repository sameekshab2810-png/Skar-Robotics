# SKAR Robotics website

Static website source for SKAR Robotics.

## Files

- `index.html` — page structure and metadata.
- `styles.css` — responsive design, 3D depth, and scroll animations.
- `script.js` — Three.js robot scene and page interactions.
- `assets/skar-robotics-logo.jpg` — supplied SKAR Robotics logo.
- `assets/skar-robotics-video.mp4` — supplied video embedded on the page.
- `.nojekyll` — tells GitHub Pages to serve the files as-is.

Keep `styles.css`, `script.js`, and the `assets` folder beside `index.html`; the page loads them using relative paths. This static website uses HTML, CSS, and JavaScript. It has no Java or Python backend.

## Push to GitHub

To clone this project, run:

```bash
git clone https://github.com/sameekshab2810-png/Skar-Robotics.git
cd Skar-Robotics
```

To publish with GitHub Pages, open the repository's **Settings → Pages** and select the `main` branch and `/ (root)` folder.

The page loads Three.js, Google Fonts, and stock photos from the internet. The supplied logo and video are stored locally in this repository.
