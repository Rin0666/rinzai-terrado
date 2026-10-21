# Rinzai Terrado — Website Resume Production Plan

Date: October 21, 2026

Status: Initial implementation verified and stored in private GitHub; Cloudflare deployment pending account connection.

## 1. Project objective

Create a professional personal website that presents Rinzai Terrado's experience, skills, projects, and interests. Visitors should quickly understand his work, explore supporting examples, download his resume, and find a way to contact him.

The website uses React + Vite, will have its source stored in GitHub, and will be hosted on Cloudflare. The owner requested implementation after reviewing this plan. Hosting account and repository configuration are tracked separately below.

## 2. Reference material

- `References/Terrado Resume.pdf`: source for professional experience, education, skills, projects, and publication details.
- `References/HomePage.png`: initial visual and navigation reference.

The homepage reference establishes a white background, restrained black typography and dividers, generous whitespace, a text introduction beside a portrait, and navigation for About, Resume, Projects, Proverbs, Contact, and Donate.

Use these references as a starting point. Refine the copy and layout for readability, accessibility, and mobile screens. Verify employment details and links before publication; do not invent achievements or project results.

## 3. Technology decisions

| Area | Selection | Status / purpose |
| --- | --- | --- |
| UI framework | React | Confirmed by user |
| Development and build tooling | Vite | Confirmed by user |
| Language | TypeScript | Proposed for components, content types, and interactions |
| Styling | Plain CSS with shared design variables | Proposed for typography, colors, spacing, and responsive layouts |
| Navigation | React Router if separate page routes are approved | Proposed; confirm route structure before implementation |
| Content | Typed local data for resume entries; Markdown for longer project and Proverbs content | Proposed; keep updates versioned with the source |
| Package manager | npm with a committed lockfile | Proposed for reproducible installs |
| Source control | GitHub | Confirmed destination; repository details pending |
| Hosting | Cloudflare | Confirmed destination |
| Hosting product | Workers Static Assets | Proposed for the Vite production output |
| Deployment | Cloudflare Builds connected to GitHub | Proposed for production and branch previews |
| Contact | Email and professional profile links | Proposed launch approach |

Use stable, compatible dependencies at implementation time and pin them through the lockfile. Select libraries only when a specific feature needs them.

### Rendering and discoverability

React + Vite will produce the static frontend assets. Before implementation, decide whether the approved routes need generated HTML for search discovery and route-specific social previews. Client-side metadata alone should not be assumed to work for all link preview services.

If the first release uses client-side routes, configure Cloudflare navigation fallback and verify direct visits and refreshes for every route. Define how unknown URLs display a useful not-found screen. If generated HTML is required, select a compatible prerendering approach while retaining React + Vite.

### Optional services

The proposed initial release uses local content and does not require a database, authentication, or a content management system. A contact form, content editor, analytics, or hosted project demonstrations can be scoped separately when their purpose is clear. If a contact form is selected, plan its delivery service, server-side validation, spam protection, secrets, and success/error behavior before implementation.

## 4. Proposed launch scope

| Page / area | Planned content and behavior |
| --- | --- |
| Home | Name, role, concise introduction, portrait, and clear links to Projects, Resume, and Contact |
| About | Professional background, working interests, education, and personal context supplied by the owner |
| Resume | Readable HTML experience and skills, education, publication entry, and downloadable public PDF |
| Projects | Project overview with links to individual case studies where sufficient material is available |
| Proverbs | Personal sayings or reflections, with attribution where applicable; content and format pending |
| Contact | Approved public email address and supplied professional profile links |
| Donate | Optional external support link; provider, placement, and launch inclusion pending |
| Shared layout | Navigation, responsive mobile menu, footer, keyboard focus states, and not-found experience |

Recommended navigation prioritizes professional information. Consider placing Donate in the footer, subject to the owner's preference.

## 5. Content direction

### Professional positioning

The resume describes Python development and data science work at Okada Manila, including internal applications, APIs, machine learning deployment, SQL integrations, ETL, reporting, testing, and business automation. Use these as the factual basis for the website's introduction and experience sections.

Candidate introduction for review:

> Python Developer building applications, data workflows, and business automation.

“Making things happen” can remain a supporting personal tagline. The final emphasis depends on the intended audience: Python/backend, data science, AI application development, or a broader mix.

### Project case studies

Start with the projects listed in the resume:

- **ForgeRouter:** AI routing prototype. Any mention of roughly 50% lower token consumption must retain the tested-task context and avoid implying a universal result.
- **StudyBuddy:** AI study companion prototype for study plans, quizzes, lessons, and presentation content.
- **MiLady:** Personal AI agent prototype exploring tool-enabled workflows in the Hermes Agent ecosystem.
- **ViralCut:** AI clipping prototype that identifies candidate clips from YouTube content.

For each published case study, collect the problem, intended users, personal contribution, technical approach, actual technology stack, current status, screenshots, and available repository or demo links. Publish only material suitable for public sharing. Keep prototype and production work accurately distinguished.

### Assets and resume

- Select a portrait and prepare appropriate responsive image sizes.
- Choose the contact details intended for public display and prepare the downloadable PDF accordingly.
- Check the publication title and bibliographic details against the source.
- Keep website experience entries and the downloadable resume aligned through the update checklist.

## 6. Design requirements

- Preserve the reference's restrained visual direction, with a consistent type scale and spacing system.
- Use a balanced desktop introduction and portrait layout; stack content naturally on smaller screens.
- Make navigation usable on mobile, with accessible menu controls and visible keyboard focus.
- Use semantic page structure, readable contrast, meaningful link text, image alternatives, and reduced-motion support.
- Use subtle interactions when they improve comprehension or feedback.
- Give project evidence and readable experience content sufficient space beyond the homepage introduction.

## 7. Production phases

### Phase 1 — Confirm scope and architecture

Deliverables: agreed audience, launch pages, route structure, rendering approach, stack details, and optional feature decisions.

Completion condition: remaining choices affecting implementation are resolved and the owner explicitly requests the build.

### Phase 2 — Prepare content and design

Deliverables: revised copy, resume data, project case-study outlines, selected assets, and desktop/mobile layout direction.

Completion condition: launch content is available and factual claims, public details, and design direction have been reviewed. Decide whether incomplete sections are deferred.

### Phase 3 — Implement the website

Deliverables: React + Vite + TypeScript project, reusable layouts and components, approved pages, responsive styling, content rendering, metadata, and resume download.

Completion condition: the agreed visitor journeys work locally and launch content is integrated.

### Phase 4 — Validate the release

Deliverables: successful type checks and production build, browser and accessibility review, targeted interaction checks, and resolved launch defects.

Completion condition: the release checklist below passes, with any remaining limitations documented.

### Phase 5 — Configure hosting and launch

Deliverables: GitHub repository, Cloudflare configuration, preview deployment, production deployment, domain configuration when available, and maintenance instructions.

Completion condition: the live site passes route, navigation, asset, and resume-download checks; a rollback procedure is documented.

## 8. Proposed GitHub and Cloudflare workflow

1. Store application source, approved public assets, content, hosting configuration, and setup documentation in GitHub.
2. Keep original working references separate from assets included in the public build. Set repository visibility deliberately before uploading source documents.
3. Develop changes on branches and use preview deployments for review.
4. Run type checks and the production build before release. Add focused browser tests for important interactions as needed.
5. Merge reviewed changes into the production branch, proposed as `main`.
6. Have Cloudflare build and deploy the Vite output, normally `dist`, using the agreed routing configuration.
7. Configure the production domain, HTTPS, redirects, cache behavior, and applicable security headers.
8. Retain a known working release and document how to restore it.

Use one deployment mechanism to avoid duplicate deployments. Any future service credentials belong in deployment secrets rather than frontend code or GitHub-tracked files.

## 9. Release checklist

- All approved pages contain final content and working navigation.
- Layouts work on mobile, tablet, and desktop without unintended horizontal scrolling.
- Menus and controls work with keyboard input and expose appropriate accessible states.
- Portraits and project images load at suitable sizes and have appropriate alternatives.
- Project claims, employment information, publication details, and external links are verified.
- The public PDF downloads correctly and matches the intended public contact details.
- Direct visits, refreshes, and unknown URLs behave correctly on Cloudflare.
- Titles, descriptions, canonical URLs, social previews, favicon, sitemap, and indexing rules match the rendering approach and production domain.
- Performance is reviewed on representative mobile and desktop conditions; oversized assets and unnecessary JavaScript are addressed.
- Type checks and the production build pass; browser checks show no unresolved functional errors.
- Setup, content updates, deployment, and rollback instructions are documented.

## 10. Decisions still open

- Primary audience and target roles.
- TypeScript, plain CSS, and content format confirmation.
- Separate pages versus sections on one page; rendering and metadata strategy.
- Final portrait, project screenshots, professional profile links, and public resume PDF.
- Proverbs content and whether it is ready for launch.
- Donate inclusion, provider, and navigation placement.
- Email links versus a contact form.
- GitHub repository name and visibility; Cloudflare account and custom domain details.
- Analytics needs and the maintenance cadence.

## 11. Implementation record — October 21, 2026

### Confirmed direction

- Emphasize Python development and AI applications.
- Use Proverbs for personal reflections and sayings.
- Include the supplied saying: “The Calmest Waves Flow The Firmest”.
- Retain “Making things happen” from the homepage reference.
- Store the site in a new private GitHub repository: `Rin0666/rinzai-terrado`.

Repository: [Rin0666/rinzai-terrado](https://github.com/Rin0666/rinzai-terrado) (private).

### Implemented locally

- React, Vite, TypeScript, React Router, plain CSS, and self-hosted fonts.
- Home, About, Resume, Projects, four project detail pages, Proverbs, Contact, and a not-found page.
- Responsive navigation, project category filters, resume download, print styling, and email-copy feedback.
- Typed professional and project content from the supplied resume, with prototype labels and qualified ForgeRouter results.
- Generated HTML for all routes, route-specific metadata, an optional production sitemap, and a social sharing image.
- Cloudflare Workers Static Assets configuration and a GitHub verification workflow.
- Desktop/mobile browser and automated accessibility checks.

### Verification results

- TypeScript checks and the production build pass.
- Browser checks: 31 passed; one desktop-only mobile-menu check intentionally skipped.
- GitHub's verification workflow passed after the initial push, including a clean install, production build, and Chromium browser checks on Linux.
- Automated accessibility checks pass for all pages on desktop and mobile.
- Cloudflare's local runtime verified direct routes, real HTTP 404 responses, trailing-slash redirects, and security headers.
- Additional layout checks pass at 320px width.
- Production-origin metadata, canonical URLs, the sitemap, public PDF, and social image were verified. The local build omits a production origin until the real domain is supplied.

### Still needed for the public release

- Replace the initials graphic when a portrait is supplied.
- Confirm the public PDF and current employment details.
- Authenticate Cloudflare and configure the production domain and build origin.
- Add project repositories or demos when their public URLs are supplied.
- Define a Donate destination if that feature is wanted.

Detailed development, deployment, update, and rollback instructions are in `README.md` at the project root.
