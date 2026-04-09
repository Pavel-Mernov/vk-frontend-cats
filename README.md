# VK Cats App on Next.js

This project shows cat images from an external API and lets users save favorite cats on the client.

## Features

- Next.js + React + TypeScript
- tabs for `Все котики` and `Любимые котики`
- favorites stored in `localStorage`
- static export for GitHub Pages
- responsive grid
- infinite scroll on the all-cats tab

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_CAT_API_KEY=your_cat_api_key_here
```

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages deployment

The project is configured for static export and deployment through GitHub Actions.

1. Open repository `Settings -> Pages`.
2. Set source to `GitHub Actions`.
3. Add `NEXT_PUBLIC_CAT_API_KEY` in `Settings -> Secrets and variables -> Actions`.
4. Push to `master` and wait for the workflow to publish the `out` folder.

## Notes

- GitHub Pages does not run a Next.js server, so `app/api/*` routes are not available there.
- In static hosting mode the Cat API key is public, because requests are made from the browser.
