# Deploy Cloudflare Pages

Project path:

`/Users/charlotte/Desktop/NGÂN HÀ/CTY TechGalaxy Group/SHOPPROGRAM`

## Current file format

This project is a static site and is already in the correct format for Cloudflare Pages:

```text
SHOPPROGRAM/
  index.html
  styles.css
  app.js
  README.md
  wrangler.toml
```

Important:

- `index.html` must stay at the top level.
- `styles.css` and `app.js` must stay beside `index.html`.
- No build step is required.

## Option 1: Direct Upload from Cloudflare dashboard

Use this if you want the fastest deploy.

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Click `Create application`.
4. Choose `Pages`.
5. Choose `Drag and drop your files`.
6. Upload this whole folder or a `.zip` made from this folder.
7. Set your project name, for example: `shopprogram`.
8. Click `Deploy site`.

Your site will be published on:

`https://<project-name>.pages.dev`

## Option 2: Deploy with Wrangler CLI

Use this if you want to redeploy from terminal later.

### First time

```bash
cd "/Users/charlotte/Desktop/NGÂN HÀ/CTY TechGalaxy Group/SHOPPROGRAM"
npx wrangler login
npx wrangler pages project create shopprogram
```

When asked for production branch, you can use:

`main`

### Deploy

```bash
cd "/Users/charlotte/Desktop/NGÂN HÀ/CTY TechGalaxy Group/SHOPPROGRAM"
npx wrangler pages deploy .
```

Because this is a plain static site, the output directory is:

`.`

## If you use GitHub + Cloudflare Pages

If you connect this project with Git integration, use:

- Framework preset: `None`
- Build command: leave empty if Cloudflare allows it, or use `exit 0`
- Build output directory: `.`

## Notes

- Camera scan works best on real HTTPS or localhost.
- Browser local storage data is per domain, so your Cloudflare live site will have its own saved inventory/settings separate from localhost.
- If you use Direct Upload now, Cloudflare does not let that project switch to Git integration later. In that case, create a new Pages project if you want Git-based auto deploys.
