import Seo from '../components/Seo.jsx';
import { Icon } from '../components/Icons.jsx';
import { Img, PageHeader, CtaBand, ExtLink, ReviewCard } from '../components/ui.jsx';
import { SmartForm } from '../components/Forms.jsx';
import { ContactDetails } from './Home.jsx';
import { BUSINESS, REVIEWS, CARRIERS, PRODUCTS } from '../data/site.js';
import { graph, businessNode, websiteNode, webPageNode, breadcrumbNode, reviewNodes } from '../data/schema.js';

const base = (path, title, description, crumbs, type) => [
  businessNode(), websiteNode(), webPageNode({ path, title, description, type }), breadcrumbNode(path, crumbs),
];

/* ---------- About ---------- */
export function AboutPage() {
  const path = '/about-us';
  const title = 'About Us | Fortress Insurance Solutions, Camden SC';
  const description = 'Fortress Insurance Solutions is an independent, one-client-at-a-time agency in Camden, SC, offering auto, home, business, farm and life insurance at the right price.';
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'About Us' }];
  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={graph(base(path, title, description, crumbs, 'AboutPage'))} />
      <PageHeader crumbs={crumbs} eyebrow="Why Fortress" title="About Fortress Insurance Solutions"
        lead="We’re not a one-size-fits-all insurance company — we’re a one-client-at-a-time insurance company." />
      <section className="section">
        <div className="container split">
          <div className="split__body prose">
            <h2>Why Fortress Insurance Solutions?</h2>
            <p>Fortress Insurance Solutions is an independent insurance agency that works to protect the things you love the most: your business, home, auto, or farm; your specialty vehicles or “toys”; and, most importantly, your family in the event of your death. Our relationships with the top insurance carriers in the industry mean we can offer you coverage that fits both your needs and your budget.</p>
            <p>At Fortress, we work hard to get to know you and build a relationship with you, because we believe the more we know about you — what’s most important to you and those you love — the better we can guide you to an insurance solution that fits your needs.</p>
            <p>Once we have all the information we need, Fortress Insurance agents go to work for you searching for the best coverage we can find. We research all the insurance options available and offer insurance solutions based on you and what or who you need to protect, all at the best price we can find for you.</p>
            <blockquote className="motto">
              <p>“Protecting futures while building relationships.”</p>
              <footer>— Our motto</footer>
            </blockquote>
          </div>
          <div className="split__media stack">
            <Img name="about-team" widths={[560, 600]} sizes="(max-width: 900px) 92vw, 480px" width="600" height="550" alt="Camden’s historic clock tower with the Fortress Insurance Solutions logo" className="framed" eager />
            <Img name="about-office" widths={[800, 1400]} sizes="(max-width: 900px) 92vw, 480px" width="1400" height="937" alt="The Lafayette Court sign at 708 Lafayette Avenue, listing Fortress Insurance Solutions in Suite Two" className="framed" />
          </div>
        </div>
      </section>
      <section className="section section--paper" aria-labelledby="what-title">
        <div className="container">
          <h2 id="what-title" className="section__title center">Coverage for the people and things you love</h2>
          <ul className="mini-cards">
            {PRODUCTS.map((p) => (
              <li key={p.key}><a href={p.path} className="mini-card"><img src={`/images/icon-${p.icon}-164.webp`} width="164" height="199" alt="" loading="lazy" /><span>{p.name}</span></a></li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ---------- Contact ---------- */
export function ContactPage() {
  const path = '/contact-us';
  const title = 'Contact Fortress Insurance Solutions | Camden, SC';
  const description = 'Contact Fortress Insurance Solutions at 708 Lafayette Ave, Suite 2, Camden, SC. Call (803) 272-4585, send a message, or request a quote. Open Mon–Fri 9–5.';
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Contact Us' }];
  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={graph(base(path, title, description, crumbs, 'ContactPage'))} />
      <PageHeader crumbs={crumbs} eyebrow="Get in touch" title="We’d Love to Hear From You"
        lead="A caring, customer-serving insurance agency that provides fantastic rates on auto, homeowners, business, farm, and life insurance for our neighbors and friends." />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-grid__form">
            <h2 className="section__title section__title--sm">Send us a message</h2>
            <SmartForm formKey="contact" page={path} />
          </div>
          <aside className="contact-card" aria-label="Contact information"><ContactDetails /></aside>
        </div>
      </section>
    </>
  );
}

/* ---------- Reviews ---------- */
export function ReviewsPage() {
  const path = '/reviews';
  const title = 'Client Reviews | Fortress Insurance Solutions, Camden SC';
  const description = 'Read what our clients say about Fortress Insurance Solutions — real savings on home and auto insurance, fast answers, and agents who truly care. Camden, SC.';
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Reviews' }];
  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={graph(base(path, title, description, crumbs), reviewNodes(REVIEWS))} />
      <PageHeader crumbs={crumbs} eyebrow="Outstanding in our field" title="Read Our Reviews"
        lead="Kind words from the neighbors and friends we’re proud to protect.">
        <ExtLink className="btn btn--light" href={BUSINESS.mapUrl}>Review us on Google <Icon name="external" size={16} /></ExtLink>
      </PageHeader>
      <section className="section">
        <div className="container">
          <ul className="reviews-grid">
            {REVIEWS.map((r) => <li key={r.author}><ReviewCard review={r} /></li>)}
          </ul>
        </div>
      </section>
      <CtaBand title="Join our happy clients" />
    </>
  );
}

/* ---------- Client portal / service center ---------- */
export function PortalPage() {
  const path = '/secure-customer-service-portal';
  const title = 'Secure Client Portal | Fortress Insurance Solutions';
  const description = 'Sign in to the Fortress Insurance Solutions secure customer service portal, or find the fastest way to reach your agent or your insurance carrier.';
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Client Portal' }];
  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={graph(base(path, title, description, crumbs))} />
      <PageHeader crumbs={crumbs} eyebrow="Client service center" title="Secure Customer Service Portal"
        lead="Existing clients can sign in anytime to access their policy information.">
        <ExtLink className="btn btn--light btn--lg" href={BUSINESS.portalUrl}><Icon name="lock" size={20} /> Sign In to the Client Portal</ExtLink>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          <ul className="service-grid">
            <li className="service-tile service-tile--primary">
              <Icon name="lock" size={28} />
              <h2>Client Portal</h2>
              <p>Sign in anytime to our secure online customer service portal.</p>
              <ExtLink className="btn btn--light btn--block" href={BUSINESS.portalUrl}>Sign in</ExtLink>
            </li>
            <li className="service-tile">
              <Icon name="phone" size={28} />
              <h2>Call your agent</h2>
              <p>Policy changes, ID cards, questions — we’re here Monday–Friday, 9 AM to 5 PM.</p>
              <a className="btn btn--outline btn--block" href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            </li>
            <li className="service-tile">
              <Icon name="chat" size={28} />
              <h2>Chat with us</h2>
              <p>Send us a message on Facebook Messenger.</p>
              <ExtLink className="btn btn--outline btn--block" href={BUSINESS.chatUrl}>Chat Now</ExtLink>
            </li>
            <li className="service-tile">
              <Icon name="mail" size={28} />
              <h2>Email us</h2>
              <p>Send documents or questions to our office.</p>
              <a className="btn btn--outline btn--block" href={`mailto:${BUSINESS.email}`}>Email the office</a>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="carrier-title">
        <div className="container">
          <div className="section__head center">
            <p className="eyebrow">Bills &amp; claims</p>
            <h2 id="carrier-title" className="section__title">Pay a Bill or Report a Claim With Your Carrier</h2>
            <p className="section__lead">Many policies can be paid or claimed directly with the insurance company. Choose your carrier below, or call us and we’ll help.</p>
          </div>
          <ul className="carrier-links">
            {CARRIERS.map((c) => (
              <li key={c.key}>
                <ExtLink href={c.url} className="carrier-link">
                  <img src={`/images/carrier-${c.key}-250.webp`} width="250" height="250" alt="" loading="lazy" />
                  <span>{c.name}</span>
                </ExtLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* ---------- Accessibility statement ---------- */
export function AccessibilityPage() {
  const path = '/accessibility';
  const title = 'Accessibility Statement | Fortress Insurance Solutions';
  const description = 'Fortress Insurance Solutions is committed to a website everyone can use. Read our accessibility statement and tell us about any barrier you find on our site.';
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Accessibility' }];
  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={graph(base(path, title, description, crumbs))} />
      <PageHeader crumbs={crumbs} eyebrow="Our commitment" title="Accessibility Statement" />
      <section className="section">
        <div className="container narrow prose">
          <p>Fortress Insurance Solutions wants everyone to be able to learn about coverage, request a quote, and reach our team online. We aim for our website to meet the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA.</p>
          <h2>What we do</h2>
          <ul>
            <li>Use clear headings, landmarks, and a “skip to main content” link.</li>
            <li>Support full keyboard navigation with visible focus indicators.</li>
            <li>Provide text alternatives for meaningful images.</li>
            <li>Maintain color contrast of at least 4.5:1 for body text.</li>
            <li>Label every form field and explain how to fix any errors.</li>
            <li>Respect your device’s reduced-motion setting and let you pause the rotating banner.</li>
          </ul>
          <p>Some links, such as our client portal, carrier websites, and Facebook Messenger, lead to services run by other companies. We can’t control their accessibility, but we’re happy to help you by phone with anything you need from them.</p>
          <h2>Need help or found a barrier?</h2>
          <p>If anything on this site is difficult to use, please let us know and we’ll help you get the information or service you need another way.</p>
          <ul className="contact-inline">
            <li><Icon name="phone" /> <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> (Monday–Friday, 9 AM – 5 PM)</li>
            <li><Icon name="mail" /> <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
            <li><Icon name="pin" /> {BUSINESS.street}, {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}</li>
          </ul>
          <p className="muted">This statement was last reviewed on November 23, 2026.</p>
        </div>
      </section>
    </>
  );
}

/* ---------- 404 ---------- */
export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found | Fortress Insurance Solutions" description="Sorry, we couldn’t find that page. Explore our coverage, request a quote, or sign in to the client portal." path="/404" noindex />
      <header className="masthead">
        <div className="container masthead__inner">
          <p className="eyebrow eyebrow--light">Error 404</p>
          <h1 className="masthead__title">We couldn’t find that page</h1>
          <p className="masthead__lead">The page may have moved when we updated our website. These links will get you where you need to go.</p>
          <div className="masthead__actions">
            <a className="btn btn--light" href="/">Go to the home page</a>
            <ExtLink className="btn btn--outline-light" href={BUSINESS.portalUrl}><Icon name="lock" size={18} /> Client Portal</ExtLink>
          </div>
        </div>
        <div className="battlements" aria-hidden="true" />
      </header>
      <section className="section">
        <div className="container">
          <h2 className="section__title section__title--sm center">Popular pages</h2>
          <ul className="mini-cards">
            {PRODUCTS.map((p) => (
              <li key={p.key}><a href={p.path} className="mini-card"><img src={`/images/icon-${p.icon}-164.webp`} width="164" height="199" alt="" loading="lazy" /><span>{p.name}</span></a></li>
            ))}
            <li><a href="/get-a-quote" className="mini-card mini-card--text"><span>Get a Quote</span></a></li>
            <li><a href="/contact-us" className="mini-card mini-card--text"><span>Contact Us</span></a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
