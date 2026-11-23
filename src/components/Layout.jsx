import { useEffect, useRef, useState } from 'react';
import { Icon, Facebook, Linkedin } from './Icons.jsx';
import { ExtLink } from './ui.jsx';
import { BUSINESS, PRODUCTS, QUOTES } from '../data/site.js';

const COVERAGE_MENU = [
  ...PRODUCTS.map((p) => ({ name: p.name, href: p.path })),
  { name: 'Travel Insurance', href: BUSINESS.travelUrl, external: true },
];
const QUOTE_MENU = QUOTES.map((q) => ({ name: q.name, href: q.path }));

function MenuLink({ item, onClick }) {
  if (item.external) {
    return (
      <ExtLink href={item.href} className="menu__link">
        {item.name} <Icon name="external" size={14} />
      </ExtLink>
    );
  }
  return <a href={item.href} className="menu__link" onClick={onClick}>{item.name}</a>;
}

function Dropdown({ id, label, items, current, columns = 1, footer }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        ref.current?.querySelector('button')?.focus();
      }
    };
    const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onClick);
    };
  }, [open]);

  return (
    <li
      className={`nav__item has-menu${open ? ' is-open' : ''}${current ? ' is-current' : ''}`}
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}
    >
      <button type="button" className="nav__link nav__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {label} <Icon name="chevron" size={16} />
      </button>
      <div className={`menu menu--cols-${columns}`} id={id}>
        <ul className="menu__list">
          {items.map((item) => (
            <li key={item.name}><MenuLink item={item} /></li>
          ))}
        </ul>
        {footer}
      </div>
    </li>
  );
}

export function Header({ path }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('nav-locked', mobileOpen);
    if (!mobileOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') { setMobileOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.querySelector('a, button')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const isCoverage = path.startsWith('/products') || path.startsWith('/insurance-solutions');
  const isQuote = QUOTES.some((q) => q.path === path);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <p className="topbar__tagline">{BUSINESS.tagline}</p>
          <ul className="topbar__links">
            <li><a href={BUSINESS.phoneHref}><Icon name="phone" size={16} /> {BUSINESS.phoneDisplay}</a></li>
            <li><ExtLink href={BUSINESS.chatUrl}><Icon name="chat" size={16} /> Chat Now</ExtLink></li>
            <li className="topbar__hours"><Icon name="clock" size={16} /> Mon–Fri 9–5</li>
          </ul>
        </div>
      </div>

      <div className="mainbar">
        <div className="container mainbar__inner">
          <a href="/" className="brand" aria-label="Fortress Insurance Solutions home">
            <img src="/images/logo-360.webp" srcSet="/images/logo-360.webp 360w, /images/logo-720.webp 720w" sizes="(max-width: 600px) 150px, 210px" width="360" height="121" alt="Fortress Insurance Solutions" />
          </a>

          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              <Dropdown id="menu-coverage" label="Coverage" items={COVERAGE_MENU} current={isCoverage} />
              <Dropdown id="menu-quotes" label="Get a Quote" items={QUOTE_MENU} current={isQuote} columns={2}
                footer={<p className="menu__foot">Prefer to talk? Call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a></p>} />
              <li className="nav__item"><a className="nav__link" href="/about-us" aria-current={path === '/about-us' ? 'page' : undefined}>About</a></li>
              <li className="nav__item"><a className="nav__link" href="/reviews" aria-current={path === '/reviews' ? 'page' : undefined}>Reviews</a></li>
              <li className="nav__item"><a className="nav__link" href="/contact-us" aria-current={path === '/contact-us' ? 'page' : undefined}>Contact</a></li>
            </ul>
          </nav>

          <div className="mainbar__actions">
            <ExtLink href={BUSINESS.portalUrl} className="btn btn--portal">
              <Icon name="lock" size={18} /> <span>Client Portal</span>
            </ExtLink>
            <a href="/get-a-quote" className="btn btn--primary mainbar__quote">Get a Quote</a>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((o) => !o)}
              ref={toggleRef}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
              <span className="menu-toggle__label">{mobileOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-nav${mobileOpen ? ' is-open' : ''}`} id="mobile-nav" ref={panelRef} hidden={!mobileOpen}>
        <div className="container">
          <ExtLink href={BUSINESS.portalUrl} className="btn btn--primary btn--block mobile-nav__portal">
            <Icon name="lock" size={18} /> Client Portal Login
          </ExtLink>
          <details className="mobile-nav__group" open={isCoverage}>
            <summary>Coverage <Icon name="chevron" size={18} /></summary>
            <ul>{COVERAGE_MENU.map((i) => <li key={i.name}><MenuLink item={i} /></li>)}</ul>
          </details>
          <details className="mobile-nav__group" open={isQuote}>
            <summary>Get a Quote <Icon name="chevron" size={18} /></summary>
            <ul className="mobile-nav__grid">{QUOTE_MENU.map((i) => <li key={i.name}><MenuLink item={i} /></li>)}</ul>
          </details>
          <ul className="mobile-nav__plain">
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/secure-customer-service-portal">Client Service Center</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
          <div className="mobile-nav__contact">
            <a href={BUSINESS.phoneHref} className="btn btn--outline btn--block"><Icon name="phone" size={18} /> Call {BUSINESS.phoneDisplay}</a>
            <ExtLink href={BUSINESS.chatUrl} className="btn btn--outline btn--block"><Icon name="chat" size={18} /> Chat on Messenger</ExtLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export function MobileActionBar() {
  return (
    <nav className="actionbar" aria-label="Quick actions">
      <a href={BUSINESS.phoneHref}><Icon name="phone" size={20} /><span>Call</span></a>
      <a href="/get-a-quote"><Icon name="file" size={20} /><span>Quote</span></a>
      <ExtLink href={BUSINESS.portalUrl} className="actionbar__portal"><Icon name="lock" size={20} /><span>Portal</span></ExtLink>
      <ExtLink href={BUSINESS.chatUrl}><Icon name="chat" size={20} /><span>Chat</span></ExtLink>
    </nav>
  );
}

export function Footer() {
  const year = __BUILD_YEAR__;
  return (
    <footer className="site-footer">
      <div className="battlements battlements--top" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="/" className="footer__logo" aria-label="Fortress Insurance Solutions home">
            <img src="/images/logo-360.webp" width="360" height="121" alt="Fortress Insurance Solutions" loading="lazy" />
          </a>
          <p className="footer__tagline">{BUSINESS.tagline}</p>
          <p className="footer__about">A caring, customer-serving independent agency providing auto, homeowners, business, farm, specialty vehicle, and life insurance for our neighbors and friends.</p>
          <ul className="footer__social">
            <li><ExtLink href={BUSINESS.facebook} aria-label="Fortress Insurance Solutions on Facebook"><Facebook /></ExtLink></li>
            <li><ExtLink href={BUSINESS.linkedin} aria-label="Tana Marshall on LinkedIn"><Linkedin /></ExtLink></li>
          </ul>
        </div>

        <div>
          <h2 className="footer__heading">Coverage</h2>
          <ul className="footer__links">
            {PRODUCTS.map((p) => <li key={p.key}><a href={p.path}>{p.name}</a></li>)}
            <li><ExtLink href={BUSINESS.travelUrl}>Travel Insurance</ExtLink></li>
          </ul>
        </div>

        <div>
          <h2 className="footer__heading">Client Service</h2>
          <ul className="footer__links">
            <li><ExtLink href={BUSINESS.portalUrl}>Client Portal Login</ExtLink></li>
            <li><a href="/secure-customer-service-portal">Client Service Center</a></li>
            <li><a href="/get-a-quote">Request a Quote</a></li>
            <li><a href="/reviews">Client Reviews</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
          </ul>
        </div>

        <div>
          <h2 className="footer__heading">Visit or Call</h2>
          <address className="footer__address">
            <a href={BUSINESS.mapUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={18} /> <span>{BUSINESS.street}<br />{BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}<span className="sr-only"> (opens Google Maps in a new tab)</span></span></a>
            <a href={BUSINESS.phoneHref}><Icon name="phone" size={18} /> <span>{BUSINESS.phoneDisplay}</span></a>
            <a href={`mailto:${BUSINESS.email}`}><Icon name="mail" size={18} /> <span>{BUSINESS.email}</span></a>
          </address>
          <dl className="footer__hours">
            {BUSINESS.hoursDisplay.map(([d, h]) => (<div key={d}><dt>{d}</dt><dd>{h}</dd></div>))}
          </dl>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Fortress Insurance Solutions. All rights reserved.</p>
          <p>Site developed and maintained by <ExtLink href="https://broadstreet.net/">Broadstreet.net</ExtLink></p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ path, children }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header path={path} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
