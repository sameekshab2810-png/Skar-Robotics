# SKAR Robotics website

Static website source for SKAR Robotics.

## Files

- `index.html` — page markup, styles, animations, and Three.js scene.
- `assets/skar-robotics-logo.jpg` — supplied SKAR Robotics logo.
- `assets/skar-robotics-video.mp4` — supplied video embedded on the page.
- `.nojekyll` — tells GitHub Pages to serve the files as-is.

Keep the `assets` folder beside `index.html`; the page loads the logo and video using relative paths.

## Push to GitHub

Create an empty GitHub repository, extract this folder, then run these commands inside it. Replace the URL with your repository's URL.

```bash
git init
git add index.html README.md .nojekyll assets
git commit -m "Add SKAR Robotics website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

To publish with GitHub Pages, open the repository's **Settings → Pages** and select the `main` branch and `/ (root)` folder.

The page loads Three.js, Google Fonts, and stock photos from the internet. The supplied logo and video are stored locally in this repository.
