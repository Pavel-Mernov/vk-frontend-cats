# VK Cats App on Next.js

This project shows cat images from an external API and lets users save favorite cats on the client.

## Features

- Next.js + React + TypeScript
- tabs for `Все котики` and `Любимые котики`
- favorites stored in `localStorage`
- internal endpoint `GET /api/cats`
- all external API calls go through the internal Next.js API route
- responsive grid
- infinite scroll on the all-cats tab

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example`:

```bash
CAT_API_KEY=your_cat_api_key_here
```

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

Internal endpoint:

```text
GET /api/cats?page=0&limit=10
```

It calls `https://api.thecatapi.com/v1/images/search` and sends the API key in the `x-api-key` header.
