import { donationMethods } from '../content'
import { Arrow, SectionHeading } from '../components/ui'

export default function Donate() {
  return <>
    <SectionHeading id="donate" label="Support my work" title={<>A little support.<br /><em>More possibilities.</em></>}>Thank you for supporting my creative work and personal projects.</SectionHeading>
    <section className="donation-grid" aria-label="Donation methods">
      {donationMethods.map(method => <article className="donation-card" key={method.name}>
        <h3>{method.name}</h3>
        <a href={method.qrUrl} target="_blank" rel="noreferrer" aria-label={`Open the full-size ${method.name} donation QR code`}><img className="donation-qr" src={method.qrUrl} alt={`${method.name} donation QR code for Rinzai Terrado`} width={method.width} height={method.height} decoding="async" loading="lazy" /></a>
        <a className="text-link" href={method.qrUrl} download>Save {method.name} QR code <Arrow /></a>
      </article>)}
    </section>
  </>
}
