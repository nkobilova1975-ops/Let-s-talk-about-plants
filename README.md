# GreenNest — Grow Your Indoor Jungle

A modern, multilingual (English, Russian, Uzbek) houseplant care platform built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and React Router. 100% frontend-only with `localStorage` persistence and PWA support.

## Features

- **Plant Encyclopedia**: 24 curated houseplants with live search, filters, favorites, comparison tool, and step-by-step care guides.
- **Plant Finder Quiz**: 7-question personalized matching wizard returning your top 3 plants with match percentages.
- **Knowledge Quizzes**: 4 categories × 10 questions (40 total) with timers, explanations, streaks, personal best leaderboard, and confetti rewards.
- **Mini-Games**: Memory Match, "Water or Not?" rapid-fire true/false, and Guess the Plant from clues.
- **Plant Doctor**: Rule-based diagnostic wizard mapping symptoms and conditions to causes, recovery steps, and prevention.
- **Care Tools**: Watering Schedule Planner with calendar & browser notifications, Window Light Calculator, Pot & Soil Mix Helper, and Plant Journal.
- **Green Academy**: 30-day daily challenge, 4 weekly homework modules, XP, levels, animated growing SVG plant, achievement badges, and printable certificate.
- **Learning Hub**: Video library (privacy-enhanced `youtube-nocookie.com` embeds), masonry gallery with lightbox, A–Z botanical glossary, 6 editorial articles, FAQ + Contact form, and global `Ctrl+K` command search.
- **Trilingual i18n**: Full UI and content translation in English (`en`), Russian (`ru`), and Uzbek Latin (`uz`).

## Local Development

```bash
npm install
npm run dev
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Deploy to Vercel from GitHub

1. Push this repository to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial GreenNest release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/greennest.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **Add New → Project**.
3. Import your `greennest` GitHub repository.
4. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. `vercel.json` automatically handles client-side React Router rewrites to `index.html`.
