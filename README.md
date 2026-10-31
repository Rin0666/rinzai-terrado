# Rinzai Terrado

A resume and portfolio built with React, Vite, TypeScript, and plain CSS. The production build generates an HTML document for every page, then React hydrates it for navigation and interactions. Cloudflare serves the generated files without a backend.

Source: [Rin0666/rinzai-terrado](https://github.com/Rin0666/rinzai-terrado) (public). Review images are in `Documents/Previews/`.


## Content and design

- `src/content.ts`: professional background, interests, skills, projects, and page metadata.
- `src/App.tsx`: page structure, Proverbs, navigation, and interactions.
- `src/components/Footer.tsx`: the shared “Connect with me” footer used on every page. Edit this component once to update the footer throughout the site.
- `src/styles.css`: shared design variables, typography, and responsive styles.
- `public/rinzai-terrado-resume.pdf`: archived PDF from an earlier resume edition (not linked from the website). The current resume button links to [Rinzai Terrado - Revised Resume (2026)](https://www.canva.com/d/F86H5QFSMO394Bq) on Canva.
- `public/social-card.png` and `public/favicon.svg`: sharing image and favicon.
- `Documents/project-plan.md`: production plan and implementation status.
- `References/`: local reference documents, excluded from Git and the public build.

The approved visual reference is `Documents/Designs/homepage-liquid-glass-approved.png`. The homepage uses white space, sans-serif typography, a centered header, the owner's portrait in a rounded panel, and one “Learn More” link to About. Every page ends with the same centered “Connect with me” footer, with extra space above its heading. Its Instagram link points to `rinzai._`; the email icon uses the resume's email address. Update both destinations in `src/content.ts`.

Home and About use the supplied `public/portrait.jpg`. The remaining pages use the same typography, quiet dividers, and restrained glass treatments. Project graphics are concept illustrations. The four personal projects retain their prototype status. Proverbs contains the owner's supplied sayings and homepage tagline.

Commissions (`/commissions`) features the owner's [anniversary website](https://3rdanniversary.rinzaiterrado.com/) and opens an email inquiry with a commission subject. Donate (`/donate`) displays the supplied `public/maribank-qr.png` and `public/gcash-qr.png` with links to open or download each original. Both pages are included in navigation and the generated HTML. Donation image paths and dimensions live in `donationMethods` in `src/content.ts`. The uploaded QR files are displayed unchanged, without decoding or regenerating them.

To capture updated review screenshots, run the production preview on port 4174 and then `node scripts/capture-preview.mjs`. This also regenerates the social card; run the build afterward to copy it into `dist`.

## Production metadata

Copy `.env.example` to `.env` and set `SITE_URL` to the final HTTPS origin, such as `https://your-domain.com`, without a path. For Cloudflare Builds, set `SITE_URL` as a production build variable. Use the preview origin for preview builds if desired.

With a configured origin, the build generates canonical URLs, absolute social metadata, and `sitemap.xml`. Without it, local builds omit domain-specific metadata and disable indexing. Never use an example domain for a real deployment. Check the live build's metadata and `robots.txt` after connecting the production domain.

## GitHub and Cloudflare

The GitHub workflow runs verification; it does not deploy. Use Cloudflare Builds as the single deployment mechanism:

1. Push the project to the selected GitHub repository.
2. In Cloudflare Workers & Pages, import that repository as a Worker.
3. Use Node.js 24, production branch `main`, build command `npm run build`, and deploy command `npx wrangler deploy`.
4. Keep the Cloudflare Worker name aligned with `name` in `wrangler.jsonc`.
5. Configure branch previews and the production `SITE_URL` build variable.
6. Connect the desired domain and rebuild with its final origin.

For an authenticated manual deployment, use `npm run deploy` instead of configuring automatic deployments. Do not configure both mechanisms for the same release workflow.

The configuration serves `dist`, removes trailing slashes, and uses `404.html` for unknown paths. Each valid route has its own generated HTML. `public/_headers` supplies security and asset-cache headers.

## Update and rollback

Make content changes on a branch, run the checks, review the preview, then merge to `main`. Keep `src/content.ts` and the resume page synchronized with the latest Canva resume. The older PDF remains archived; do not relink it unless replaced by the current edition. Keep the portrait, employer details, project links, and contact information current.

To roll back, restore the last known working Cloudflare deployment in Version History, then revert the corresponding Git commit and verify the next build. Check a nested project URL, unknown URL, resume download, contact action, and production metadata after a deployment or rollback.

## Deployment references

- [Vite documentation](https://vite.dev/guide/)
- [React Router declarative mode](https://reactrouter.com/start/declarative/installation)
- [Cloudflare Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Cloudflare HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
