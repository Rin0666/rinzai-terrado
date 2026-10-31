import { commissions } from '../content'
import { Arrow, Label, SectionHeading } from '../components/ui'

export default function Commissions() {
  return <>
    <SectionHeading id="commissions" label="Creative commissions" title={<>Small websites.<br /><em>Personal stories.</em></>}>Custom creative websites for the people, moments, and stories that matter to you.</SectionHeading>
    <section className="commission-feature" aria-labelledby="commission-example-title">
      <a className="commission-art" href={commissions.exampleUrl} target="_blank" rel="noreferrer" aria-label="Visit the anniversary website (opens in a new tab)">
        <span className="commission-art-note">A moment, made into a website</span>
        <span className="commission-art-heart" aria-hidden="true">♡</span>
        <span className="commission-art-title" aria-hidden="true">For the memories.<br />For the two of you.</span>
        <span className="commission-art-link">View anniversary website <Arrow diagonal /></span>
      </a>
      <div className="commission-copy prose">
        <Label>Featured creative work</Label>
        <h3 id="commission-example-title">An anniversary,<br />a little differently.</h3>
        <p>A personal website to celebrate a shared story. Explore my anniversary site for an example of the creative work I make.</p>
        <a className="text-link" href={commissions.exampleUrl} target="_blank" rel="noreferrer">Explore the anniversary site <Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </section>
    <section className="commission-inquiry" aria-labelledby="commission-inquiry-title">
      <div><Label>Have something in mind?</Label><h3 id="commission-inquiry-title">Let’s make it personal.</h3><p>Tell me about your idea, the occasion, and when you need it. We can talk through the details by email.</p></div>
      <a className="button button-dark" href={commissions.inquiryUrl}>Discuss a commission <Arrow diagonal /></a>
    </section>
  </>
}
