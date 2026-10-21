import { profile } from '../content'

export default function Footer() {
  return (
    <footer className="site-footer shell" aria-labelledby="footer-heading">
      <h2 id="footer-heading">Connect with me</h2>
      <div className="social-links">
        <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram: rinzai._ (opens in a new tab)">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
        </a>
        <a href={`mailto:${profile.email}`} className="social-link" aria-label="Email Rinzai Terrado">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      <p className="footer-location">Based in the Philippines</p>
    </footer>
  )
}
