# ShopFlow POS

A bilingual English/Vietnamese POS-style web app for small shops.

## Included

- Product inventory with barcode, price, and stock
- POS cart with quantity controls
- Barcode input flow for scanner keyboard input
- Camera scan support for browsers with `BarcodeDetector`
- Payment handling with change calculation
- Receipt preview and print templates
- Local storage for products, settings, and sales history

## Run locally

Because camera access works better on `localhost`, serve the folder with a small local server instead of opening `index.html` directly.

Example:

```bash
python3 -m http.server 8080
```

Then open:

`http://localhost:8080`

## Main files

- `index.html`
- `styles.css`
- `app.js`

## Cloudflare deploy

This project can be deployed directly to Cloudflare Pages because it is a static site.

Quick setup:

- Framework preset: `None`
- Build output directory: `.`
- No build step is required

See [CLOUDFLARE_DEPLOY.md](/Users/charlotte/Desktop/NGÂN HÀ/CTY TechGalaxy Group/SHOPPROGRAM/CLOUDFLARE_DEPLOY.md) for full instructions.
