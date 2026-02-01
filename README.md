# Woolwich Temple [![Netlify Status](https://api.netlify.com/api/v1/badges/fb91273d-f91e-41f2-90ad-8e7f34f6c37a/deploy-status)](https://app.netlify.com/sites/sksswoolwich/deploys)

> [Vue.js](https://vuejs.org) project with content managed in [Prismic](https://prismic.io)

## Deploy to Netlify

1. **Connect the repo**  
   In [Netlify](https://app.netlify.com): Add new site → Import an existing project → connect your Git provider and select this repo.

2. **Build settings** (usually auto-detected from `netlify.toml`)  
   - **Build command:** `npm run build`  
   - **Publish directory:** `.output/public`  
   - **Node version:** 20 (set in `netlify.toml` or in Netlify → Site settings → Environment → NODE_VERSION).

3. **Environment variables**  
   In Netlify → Site settings → Environment variables, add the same vars you use in `.env` (do **not** commit `.env`). At minimum:
   - **Firebase:** `firebase_apiKey`, `firebase_authDomain`, `firebase_databaseURL`, `firebase_projectId`, `firebase_storageBucket`, `firebase_messagingSenderId`, `firebase_appId`, `firebase_measurementId`
   - **Prismic:** `VUE_APP_PRISMIC`
   - **Optional:** `GOOGLE_APPLICATION_CREDENTIALS` (for Firebase Admin; use a path or leave unset if you don’t need server-side auth), `GOOGLE_API_KEY`, `flickrApiKey`, `flickrUserId`, `flickrUrl`, `google_calendarApiKey`

4. **Deploy**  
   Push to your main branch; Netlify will build and deploy. The first deploy may take a few minutes.

5. **Firebase auth in production**  
   In Google Cloud Console → Credentials → your API key → HTTP referrers, add your Netlify URL (e.g. `https://yoursite.netlify.app/*` and any custom domain like `https://www.sksswoolwich.org/*`).

## How to launch this project in your local environment

Run the following commands:

```bash
npm install
npm run dev
```

Then you can access it at [http://localhost:3000](http://localhost:3000).

### Firebase Admin (SSR + auth)

If you see **"The default Firebase app does not exist"** from `firebase-admin`, you are using SSR with auth but the Admin SDK is not initialized.

1. In [Firebase Console](https://console.firebase.google.com) → Project settings → Service accounts, create a key and download the JSON.
2. Save it as `service-account.json` in the project root (or another path; do **not** commit it).
3. In `.env`, set:
   ```bash
   GOOGLE_APPLICATION_CREDENTIALS=service-account.json
   ```
4. Restart the dev server. `service-account.json` is in `.gitignore`.

### Admin login 403 "requests from referer are blocked"

If sign-in at `/admin/auth` returns **403** and **"auth/requests-from-referer-http://localhost:3001-are-blocked"**, the **API key** (not Firebase Authorized domains) is restricting referrers.

1. Open [Google Cloud Console](https://console.cloud.google.com) and select the **same project** as your Firebase app.
2. Go to **APIs & Services** → **Credentials**.
3. Find the **API key** used by your Firebase Web app (the one in your Firebase config `apiKey`).
4. Click the key → under **Application restrictions** choose **HTTP referrers**.
5. Under **Website restrictions**, add your dev and prod origins, for example:
   - `http://localhost:3000/*` (or the port you use, e.g. `http://localhost:3001/*`)
   - `http://localhost/*`
   - `https://www.sksswoolwich.org/*`
   - `https://sksswoolwich.org/*`
6. Save. Changes can take a few minutes to apply.

Firebase **Authentication → Sign-in method** and **Authorized domains** are separate; this 403 is fixed in **Credentials → API key → HTTP referrers**.

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