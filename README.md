# Rinzai Terrado

A one-page resume and portfolio built with React, Vite, TypeScript, and plain CSS. About, Resume, Projects, Commissions, Proverbs, Contact, and Donate are sections of one scrolling document. The sticky top navigation jumps to each section and highlights the section currently in view. Cloudflare serves the prerendered HTML without a backend.

Source: [Rin0666/rinzai-terrado](https://github.com/Rin0666/rinzai-terrado) (public). Review images are in `Documents/Previews/`.


## Content and design

- `src/content.ts`: professional background, interests, skills, projects, section navigation, legacy redirects, and site metadata.
- `src/App.tsx`: page sections, expandable project notes, anchor navigation, and interactions.
- `src/components/Footer.tsx`: the shared “Connect with me” footer used on every page. Edit this component once to update the footer throughout the site.
- `src/styles.css`: shared design variables, typography, and responsive styles.
- `public/rinzai-terrado-resume.pdf`: the PDF linked by the Resume section’s download button. Keep this file synchronized with the intended public resume.
- `public/social-card.png` and `public/favicon.svg`: sharing image and favicon.
- `Documents/project-plan.md`: production plan and implementation status.
- `References/`: local reference documents, excluded from Git and the public build.

The approved visual reference is `Documents/Designs/homepage-liquid-glass-approved.png`. The homepage uses white space, sans-serif typography, a centered header, the owner's portrait in a rounded panel, and one “Learn More” link to About. The document ends with a centered “Connect with me” footer, with extra space above its heading. Its Instagram link points to `rinzai._`; the email icon uses the resume's email address. Update both destinations in `src/content.ts`.

Home and About use the supplied `public/portrait.jpg`. All sections use the same typography, quiet dividers, and restrained glass treatments. Project graphics are concept illustrations. ForgeRouter and StudyBuddy retain their prototype status. Project cards expand their notes in place; MiLady and ViralCut have been removed at the owner’s request. Proverbs contains the owner's supplied sayings and homepage tagline.

Commissions (`/#commissions`) features the owner's [anniversary website](https://3rdanniversary.rinzaiterrado.com/) and opens an email inquiry with a commission subject. Donate (`/#donate`) displays the supplied `public/maribank-qr.png` and `public/gcash-qr.png` with links to open or download each original. Both sections are included in navigation and the generated homepage HTML. Donation image paths and dimensions live in `donationMethods` in `src/content.ts`. The uploaded QR files are displayed unchanged, without decoding or regenerating them.

To capture updated review screenshots, run the production preview on port 4174 and then `node scripts/capture-preview.mjs`. The script captures the hero and individual sections, and also regenerates the social card; run the build afterward to copy it into `dist`.

## Production metadata

Copy `.env.example` to `.env` and set `SITE_URL` to the final HTTPS origin, such as `https://your-domain.com`, without a path. For Cloudflare Builds, set `SITE_URL` as a production build variable. Use the preview origin for preview builds if desired.

With a configured origin, the build generates the homepage canonical URL, absolute social metadata, and a single-URL `sitemap.xml`. Hash links share that homepage canonical URL. Without it, local builds omit domain-specific metadata and disable indexing. Never use an example domain for a real deployment. Check the live build's metadata and `robots.txt` after connecting the production domain.

## GitHub and Cloudflare

The GitHub workflow runs verification; it does not deploy. Use Cloudflare Builds as the single deployment mechanism:

1. Push the project to the selected GitHub repository.
2. In Cloudflare Workers & Pages, import that repository as a Worker.
3. Use Node.js 24, production branch `main`, build command `npm run build`, and deploy command `npx wrangler deploy`.
4. Keep the Cloudflare Worker name aligned with `name` in `wrangler.jsonc`.
5. Configure branch previews and the production `SITE_URL` build variable.
6. Connect the desired domain and rebuild with its final origin.

For an authenticated manual deployment, use `npm run deploy` instead of configuring automatic deployments. Do not configure both mechanisms for the same release workflow.

The configuration serves `dist`, removes trailing slashes, and uses `404.html` for unknown paths. The main content is generated in `index.html`. The build also creates `_redirects` rules and HTML redirect fallbacks so former paths such as `/resume` and `/projects/study-buddy` lead to `/#resume` and `/#project-study-buddy`. Old MiLady and ViralCut links lead to `/#projects`. Section links and native expandable project notes work without JavaScript; JavaScript adds active-section tracking and project filters. `public/_headers` supplies security and asset-cache headers.

## Update and rollback

Make content changes on a branch, run the checks, review the preview, then merge to `main`. Keep `src/content.ts`, the Resume section, and the downloadable PDF synchronized with the current public resume. Keep the portrait, employer details, project links, and contact information current.

To roll back, restore the last known working Cloudflare deployment in Version History, then revert the corresponding Git commit and verify the next build. Check top navigation, a direct section link, a legacy project redirect, an unknown URL, the resume download, contact action, and production metadata after a deployment or rollback.

## Deployment references

- [Vite documentation](https://vite.dev/guide/)
- [React Router declarative mode](https://reactrouter.com/start/declarative/installation)
- [Cloudflare Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Cloudflare HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
