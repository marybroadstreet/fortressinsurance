import Seo from '../components/Seo.jsx';
import Hero from '../components/Hero.jsx';
import { Icon } from '../components/Icons.jsx';
import { Img, ExtLink, ReviewCard } from '../components/ui.jsx';
import { SmartForm } from '../components/Forms.jsx';
import { BUSINESS, COVERAGE_CARDS, CARRIERS, FEATURED_REVIEWS, FAQS, ABOUT_TEXT, LEARN_TEXT, INSURANCE_LINKS } from '../data/site.js';
import { graph, businessNode, websiteNode, webPageNode, faqNode, reviewNodes } from '../data/schema.js';

const TITLE = 'Fortress Insurance Solutions | Camden, SC Insurance Agency';
const DESC = 'Independent insurance agency in Camden, SC. Compare auto, home, farm, commercial, life, pet and recreational coverage from top carriers. Call (803) 272-4585.';

export default function Home() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESC}
        path="/"
        jsonLd={graph(businessNode(), websiteNode(), webPageNode({ path: '/', title: TITLE, description: DESC }), faqNode('/', FAQS), reviewNodes(FEATURED_REVIEWS))}
      />
      <link rel="preload" as="image" href="/images/hero-home-1600.webp" imageSrcSet="/images/hero-home-640.webp 640w, /images/hero-home-800.webp 800w, /images/hero-home-1100.webp 1100w, /images/hero-home-1600.webp 1600w" imageSizes="100vw" fetchPriority="high" />

      <Hero />

      {/* Quick actions — portal first */}
      <section className="quick" aria-label="Quick actions">
        <div className="container">
          <ul className="quick__grid">
            <li>
              <ExtLink href={BUSINESS.portalUrl} className="quick__item quick__item--portal">
                <span className="quick__icon"><Icon name="lock" size={24} /></span>
                <span><strong>Client Portal</strong><span>Sign in to your policy</span></span>
              </ExtLink>
            </li>
            <li>
              <a href="/get-a-quote" className="quick__item">
                <span className="quick__icon"><Icon name="file" size={24} /></span>
                <span><strong>Get a Quote</strong><span>14 types of coverage</span></span>
              </a>
            </li>
            <li>
              <a href={BUSINESS.phoneHref} className="quick__item">
                <span className="quick__icon"><Icon name="phone" size={24} /></span>
                <span><strong>{BUSINESS.phoneDisplay}</strong><span>Mon–Fri, 9 AM – 5 PM</span></span>
              </a>
            </li>
            <li>
              <ExtLink href={BUSINESS.chatUrl} className="quick__item">
                <span className="quick__icon"><Icon name="chat" size={24} /></span>
                <span><strong>Chat Now</strong><span>Message us on Messenger</span></span>
              </ExtLink>
            </li>
          </ul>
        </div>
      </section>

      {/* Coverage */}
      <section className="section" aria-labelledby="coverage-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What we protect</p>
            <h2 id="coverage-title" className="section__title">Fortress Insurance Solutions is Committed to Your Protection</h2>
            <p className="section__lead">As an independent agency, we work with many carriers — so your coverage is built around you, not a one-size-fits-all policy.</p>
          </div>
          <ul className="cards">
            {COVERAGE_CARDS.map((c) => {
              const Link = c.external ? ExtLink : 'a';
              return (
                <li key={c.name} className="card">
                  <img className="card__icon" src={`/images/icon-${c.icon}-164.webp`} width="164" height="199" alt="" loading="lazy" />
                  <h3 className="card__title">{c.name}</h3>
                  <p className="card__text">{c.text}</p>
                  <Link href={c.href} className="card__link">
                    Read more<span className="sr-only"> about {c.name.toLowerCase()}</span> <Icon name="arrow" size={16} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="section section--paper" aria-labelledby="about-title">
        <div className="container split">
          <div className="split__media">
            <Img name="home-agents" widths={[560, 960]} sizes="(max-width: 900px) 92vw, 520px" width="960" height="960" alt="An agent reviewing a policy with a smiling older couple at a table" className="framed" />
          </div>
          <div className="split__body">
            <p className="eyebrow">About Fortress</p>
            <h2 id="about-title" className="section__title">A one-client-at-a-time insurance agency</h2>
            <p className="script-line">Protecting futures, building relationships.</p>
            {ABOUT_TEXT.map((t) => <p key={t.slice(0, 20)}>{t}</p>)}
            <div className="btn-row">
              <a className="btn btn--primary" href="/about-us">More about us <Icon name="arrow" size={18} /></a>
              <a className="btn btn--outline" href="/reviews">Read client reviews</a>
            </div>
          </div>
        </div>
      </section>

      {/* Carriers */}
      <section className="section section--tight" aria-labelledby="carriers-title">
        <div className="container">
          <h2 id="carriers-title" className="section__title section__title--sm center">We Are Proud to Partner With These and Many Other Carriers</h2>
          <ul className="carriers">
            {CARRIERS.map((c) => (
              <li key={c.key}><img src={`/images/carrier-${c.key}-250.webp`} width="250" height="250" alt={c.name} loading="lazy" /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="section section--ink" aria-labelledby="reviews-title">
        <div className="container">
          <div className="section__head section__head--split">
            <div>
              <p className="eyebrow eyebrow--light">Client reviews</p>
              <h2 id="reviews-title" className="section__title">Outstanding in Our Field</h2>
            </div>
            <a className="btn btn--outline-light" href="/reviews">Read more reviews <Icon name="arrow" size={18} /></a>
          </div>
          <ul className="reviews-row">
            {FEATURED_REVIEWS.map((r) => <li key={r.author}><ReviewCard review={r} /></li>)}
          </ul>
        </div>
      </section>

      {/* Learn more */}
      <section className="section" aria-labelledby="learn-title">
        <div className="container split split--reverse">
          <div className="split__media">
            <Img name="umbrella" widths={[560, 960]} sizes="(max-width: 900px) 92vw, 520px" width="960" height="960" alt="A hand stacking wooden blocks printed with family, health, home, car, savings and travel icons" className="framed" />
          </div>
          <div className="split__body">
            <p className="eyebrow">Insurance 101</p>
            <h2 id="learn-title" className="section__title">Learn More About Insurance</h2>
            {LEARN_TEXT.map((t) => <p key={t.slice(0, 20)}>{t}</p>)}
            <ul className="link-pills" aria-label="Insurance types">
              {INSURANCE_LINKS.map(([name, href]) => <li key={name}><a href={href}>{name}</a></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--paper" aria-labelledby="faq-title">
        <div className="container narrow">
          <div className="section__head center">
            <p className="eyebrow">Good to know</p>
            <h2 id="faq-title" className="section__title">Frequently Asked Questions</h2>
          </div>
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q} className="faq__item">
                <summary><span className="faq__q">{f.q}</span><Icon name="chevron" size={20} /></summary>
                <p className="faq__a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" aria-labelledby="contact-title" id="contact">
        <div className="container contact-grid">
          <div className="contact-grid__form">
            <p className="eyebrow">Get in touch</p>
            <h2 id="contact-title" className="section__title">We’d Love to Hear From You</h2>
            <SmartForm formKey="contact" page="/" />
          </div>
          <aside className="contact-card" aria-label="Contact information">
            <ContactDetails />
          </aside>
        </div>
      </section>
    </>
  );
}

export function ContactDetails() {
  return (
    <>
      <h3 className="contact-card__title">Fortress Insurance Solutions</h3>
      <ul className="contact-list">
        <li><Icon name="phone" /><div><span className="contact-list__label">Phone</span><a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a></div></li>
        <li><Icon name="mail" /><div><span className="contact-list__label">Email</span><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></div></li>
        <li><Icon name="pin" /><div><span className="contact-list__label">Mailing address</span><address>{BUSINESS.street}<br />{BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}</address></div></li>
        <li><Icon name="clock" /><div><span className="contact-list__label">Agency hours</span>
          <dl className="hours">{BUSINESS.hoursDisplay.map(([d, h]) => <div key={d}><dt>{d}</dt><dd>{h}</dd></div>)}</dl></div></li>
      </ul>
      <ExtLink href={BUSINESS.mapUrl} className="map-link">
        <img src="/images/map-343.webp" width="343" height="200" alt="Map showing our office on Lafayette Avenue in Camden, SC" loading="lazy" />
        <span className="map-link__label"><Icon name="pin" size={16} /> Get directions</span>
      </ExtLink>
    </>
  );
}
