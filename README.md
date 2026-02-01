# Woolwich Temple [![Netlify Status](https://api.netlify.com/api/v1/badges/fb91273d-f91e-41f2-90ad-8e7f34f6c37a/deploy-status)](https://app.netlify.com/sites/sksswoolwich/deploys)

> [Vue.js](https://vuejs.org) project with content managed in [Prismic](https://prismic.io)

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