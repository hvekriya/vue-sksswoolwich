# Woolwich Temple [![Netlify Status](https://api.netlify.com/api/v1/badges/fb91273d-f91e-41f2-90ad-8e7f34f6c37a/deploy-status)](https://app.netlify.com/sites/sksswoolwich/deploys)

> [Vue.js](https://vuejs.org) project with content managed in [Prismic](https://prismic.io)

## How to launch this project in your local environment

Run the following commands:

```bash
npm install
npm run dev
```

Then you can access it at [http://localhost:3000](http://localhost:3000).

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run dev
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

## If SSR keeps failing (static fallback)

To switch to static-only (no server, SPA mode):

1. In `nuxt.config.ts`: set `ssr: false` and `nitro.preset: 'netlify-static'`
2. In `netlify.toml`: change build command to `npm run generate`, publish to `.output/public`
3. In `netlify.toml`: replace redirects with `from = "/*"` `to = "/index.html"` `status = 200`

All data (Prismic, Firebase, Flickr) will load in the browser. Simpler deployment.