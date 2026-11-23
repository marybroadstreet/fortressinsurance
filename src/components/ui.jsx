import { Icon } from './Icons.jsx';
import { BUSINESS } from '../data/site.js';

/** Responsive WebP image from /public/images/{name}-{width}.webp */
export function Img({ name, widths, sizes, alt, width, height, eager = false, className }) {
  const srcSet = widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
  const src = `/images/${name}-${widths[widths.length - 1]}.webp`;
  return (
    <img
      src={src}
      srcSet={widths.length > 1 ? srcSet : undefined}
      sizes={widths.length > 1 ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : undefined}
      className={className}
    />
  );
}

/** External link that opens in a new tab and says so to screen readers. */
export function ExtLink({ href, children, className, ...rest }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Breadcrumbs({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        {crumbs.map((c, i) => (
          <li key={c.name}>
            {c.href ? <a href={c.href}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
            {i < crumbs.length - 1 && <Icon name="next" size={14} className="crumbs__sep" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Inner-page masthead: breadcrumbs, eyebrow, h1, lead text, actions. */
export function PageHeader({ crumbs, eyebrow, title, lead, children, image }) {
  return (
    <header className={`masthead${image ? ' masthead--image' : ''}`}>
      {image && <div className="masthead__media">{image}</div>}
      <div className="container masthead__inner">
        <Breadcrumbs crumbs={crumbs} />
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1 className="masthead__title">{title}</h1>
        {lead && <p className="masthead__lead">{lead}</p>}
        {children && <div className="masthead__actions">{children}</div>}
      </div>
      <div className="battlements" aria-hidden="true" />
    </header>
  );
}

export function CtaBand({ title = 'Ready to see what you could save?', text = 'An independent agent will compare carriers for you — one client at a time.' }) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band__inner">
        <div>
          <h2 id="cta-band-title" className="cta-band__title">{title}</h2>
          <p className="cta-band__text">{text}</p>
        </div>
        <div className="cta-band__actions">
          <a className="btn btn--light" href="/get-a-quote">Request a Quote <Icon name="arrow" size={18} /></a>
          <a className="btn btn--outline-light" href={BUSINESS.phoneHref}><Icon name="phone" size={18} /> {BUSINESS.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}

export function ReviewCard({ review, as: Tag = 'figure' }) {
  return (
    <Tag className="review">
      <Icon name="quote" size={28} className="review__mark" />
      <blockquote className="review__text"><p>{review.text}</p></blockquote>
      <figcaption className="review__author">— {review.author}</figcaption>
    </Tag>
  );
}

/** Small "Already a client?" portal card used in sidebars. */
export function PortalCard() {
  return (
    <div className="portal-card">
      <p className="portal-card__eyebrow"><Icon name="lock" size={16} /> Already a client?</p>
      <p className="portal-card__text">Sign in to the secure client portal to access your policy information.</p>
      <ExtLink className="btn btn--primary btn--block" href={BUSINESS.portalUrl}>
        <Icon name="lock" size={18} /> Client Portal Login
      </ExtLink>
      <a className="portal-card__link" href="/secure-customer-service-portal">More ways to manage your policy</a>
    </div>
  );
}
