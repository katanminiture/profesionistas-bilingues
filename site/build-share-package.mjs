#!/usr/bin/env node
/**
 * Builds shareable preview folders for the marketing site.
 * Open index.html in a browser (network required for React CDN + fonts).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outSite = path.join(__dirname, 'share');
const outWorkspace = path.join(root, 'uploads', 'Profesionistas-Bilingues-share');

const scripts = [
  path.join(root, '_ds_bundle.js'),
  path.join(root, 'ui_kits/marketing-site/image-slot.js'),
  path.join(__dirname, 'router.js'),
  path.join(__dirname, 'config.js'),
  path.join(__dirname, 'consent.js'),
  path.join(__dirname, 'analytics.js'),
  path.join(__dirname, 'photos.js'),
  path.join(__dirname, 'pricing-catalog.js'),
  path.join(__dirname, 'resource-catalog.js'),
  path.join(__dirname, 'content.js'),
  path.join(__dirname, 'home-sections.js'),
];

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else copyFile(s, d);
  }
}

function buildInto(targetDir) {
  rmrf(targetDir);
  fs.mkdirSync(targetDir, { recursive: true });

  copyDir(path.join(__dirname, 'assets'), path.join(targetDir, 'assets'));
  for (const name of ['logo-mark.png', 'favicon-32.png', 'favicon-180.png', 'favicon-512.png']) {
    copyFile(path.join(root, 'assets', name), path.join(targetDir, 'assets', name));
  }

  const styles = [
    fs.readFileSync(path.join(root, 'styles.css'), 'utf8'),
    fs.readFileSync(path.join(__dirname, 'site.css'), 'utf8'),
  ].join('\n\n');
  fs.writeFileSync(path.join(targetDir, 'bundle.css'), styles);

  const indexSrc = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const appMatch = indexSrc.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
  if (!appMatch) throw new Error('Could not find babel app block in index.html');
  const appJs = appMatch[1].replace(/\.\.\/assets\//g, './assets/');

  const depsJs = scripts
    .map((src) => {
      if (!fs.existsSync(src)) throw new Error(`Missing: ${src}`);
      return fs.readFileSync(src, 'utf8');
    })
    .join('\n\n');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Profesionistas Bilingües — Sé Bilingüe | Palm Learning Center</title>
  <meta name="description" content="Bilingual Workforce Performance Program™ — coaching de inglés laboral para profesionistas y organizaciones.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Profesionistas Bilingües — Sé Bilingüe">
  <meta property="og:description" content="Bilingual Workforce Performance Program™ — coaching de inglés laboral para profesionistas y organizaciones.">
  <meta property="og:image" content="./assets/hero-professional.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="./assets/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="./assets/favicon-512.png" type="image/png" sizes="512x512">
  <link rel="apple-touch-icon" href="./assets/favicon-180.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./bundle.css">
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>
  <script src="./bundle.deps.js"></script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<div id="root"></div>
<script type="text/babel" src="./bundle.app.jsx"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(targetDir, 'bundle.deps.js'), depsJs);
  fs.writeFileSync(path.join(targetDir, 'bundle.app.jsx'), appJs);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);

  fs.writeFileSync(
    path.join(targetDir, 'README.txt'),
    `Profesionistas Bilingües — shareable preview
============================================

Open index.html in any modern browser (Chrome, Safari, Firefox, Edge).

Spanish:  index.html#/es
English:  index.html#/en

Requirements:
- Internet connection (loads React, Babel, and Google Fonts from CDN)
- Keep this entire folder together (index.html + assets/ + bundle files)

To share: zip this folder and send it, or upload to Netlify Drop / Cloudflare Pages.

Regenerate from source:
  node site/build-share-package.mjs
`
  );
}

buildInto(outSite);
buildInto(outWorkspace);

console.log('Share package built at:');
console.log(' ', outSite);
console.log(' ', outWorkspace);
