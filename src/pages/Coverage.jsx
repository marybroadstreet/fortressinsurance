import Seo from '../components/Seo.jsx';
import { Icon } from '../components/Icons.jsx';
import { Img, PageHeader, CtaBand, PortalCard, ExtLink } from '../components/ui.jsx';
import { SmartForm } from '../components/Forms.jsx';
import { BUSINESS, PRODUCTS, QUOTES, productByKey } from '../data/site.js';
import { graph, businessNode, websiteNode, webPageNode, breadcrumbNode, serviceNode } from '../data/schema.js';

/* ---------- Product / coverage page ---------- */
export function ProductPage({ product }) {
  const p = product;
  const crumbs = [{ name: 'Home', href: '/' }, { name: p.name }];
  const related = PRODUCTS.filter((x) => x.key !== p.key).slice(0, 6);
  return (
    <>
      <Seo
        title={p.title}
        description={p.description}
        path={p.path}
        jsonLd={graph(
          businessNode(), websiteNode(),
          webPageNode({ path: p.path, title: p.title, description: p.description }),
          breadcrumbNode(p.path, crumbs),
          serviceNode({ path: p.path, name: p.name, description: p.description, list: p.list }),
        )}
      />
      <PageHeader crumbs={crumbs} eyebrow="Coverage" title={p.h1 || p.name} lead={p.summary}>
        <a className="btn btn--light" href={p.quotePath}>Request a Quote <Icon name="arrow" size={18} /></a>
        <a className="btn btn--outline-light" href={BUSINESS.phoneHref}><Icon name="phone" size={18} /> {BUSINESS.phoneDisplay}</a>
      </PageHeader>

      <div className="container page-grid">
        <article className="prose">
          <Img name={p.image} widths={[480, 800]} sizes="(max-width: 900px) 92vw, 720px" width="800" height="800" alt={p.imageAlt} className="prose__figure framed" eager />
          {p.body.map((b, i) => (typeof b === 'string' ? <p key={i}>{b}</p> : <h2 key={i}>{b.heading}</h2>))}
          {p.list?.length > 0 && (
            <div className="specialties">
              <h2 className="specialties__title">{p.listTitle}</h2>
              <ul className="checklist">
                {p.list.map((l) => <li key={l}><Icon name="check" size={18} /> {l}</li>)}
              </ul>
            </div>
          )}
        </article>

        <aside className="sidebar" aria-label="Get started">
          <div className="side-card side-card--quote">
            <p className="side-card__title">Get your {p.short.toLowerCase()} quote</p>
            <p>We’ll compare our carriers and bring you options that fit your needs and budget.</p>
            <a className="btn btn--primary btn--block" href={p.quotePath}>Request a Quote <Icon name="arrow" size={18} /></a>
            <a className="btn btn--outline btn--block" href={BUSINESS.phoneHref}><Icon name="phone" size={18} /> Call {BUSINESS.phoneDisplay}</a>
          </div>
          <PortalCard />
          <nav className="side-card" aria-label="Other coverage">
            <p className="side-card__title">Other coverage</p>
            <ul className="side-links">
              {related.map((r) => <li key={r.key}><a href={r.path}>{r.name} <Icon name="next" size={16} /></a></li>)}
              <li><ExtLink href={BUSINESS.travelUrl}>Travel Insurance <Icon name="external" size={14} /></ExtLink></li>
            </ul>
          </nav>
        </aside>
      </div>
      <CtaBand title={`Let’s build your ${p.short.toLowerCase()} coverage`} />
    </>
  );
}

/* ---------- Quote request page ---------- */
export function QuotePage({ quote }) {
  const q = quote;
  const product = productByKey[q.product];
  const title = `${q.name} Insurance Quote | Fortress Insurance Solutions`.replace('Insurance Insurance', 'Insurance');
  const description = `Request a ${q.name.toLowerCase()} insurance quote from Fortress Insurance Solutions in Camden, SC. We compare top carriers to find coverage that fits your budget.`;
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Get a Quote', href: '/get-a-quote' }, { name: q.name }];
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={q.path}
        jsonLd={graph(
          businessNode(), websiteNode(),
          webPageNode({ path: q.path, title, description }),
          breadcrumbNode(q.path, crumbs),
          serviceNode({ path: q.path, name: `${q.name} Insurance`, description }),
        )}
      />
      <PageHeader crumbs={crumbs} eyebrow="Request a quote" title={q.h1} lead={q.intro} />
      <div className="container page-grid">
        <section className="form-panel" aria-labelledby="quote-form-title">
          <h2 id="quote-form-title" className="form-panel__title">Tell us about your {q.form === 'auto' ? 'drivers and vehicles' : 'needs'}</h2>
          <SmartForm formKey={q.form || 'quote'} quoteType={q.name} submitLabel="Request My Quote" page={q.path} />
        </section>
        <aside className="sidebar" aria-label="Help with your quote">
          <div className="side-card">
            <p className="side-card__title">What happens next?</p>
            <ol className="steps">
              <li>We review your information.</li>
              <li>We shop our carriers for the best fit.</li>
              <li>An agent reaches out with options — usually within one business day.</li>
            </ol>
          </div>
          <div className="side-card side-card--quote">
            <p className="side-card__title">Rather talk it through?</p>
            <a className="btn btn--primary btn--block" href={BUSINESS.phoneHref}><Icon name="phone" size={18} /> {BUSINESS.phoneDisplay}</a>
            <ExtLink className="btn btn--outline btn--block" href={BUSINESS.chatUrl}><Icon name="chat" size={18} /> Chat Now</ExtLink>
          </div>
          {product && (
            <div className="side-card">
              <p className="side-card__title">Learn about coverage</p>
              <a className="side-links__single" href={product.path}>{product.name} <Icon name="next" size={16} /></a>
            </div>
          )}
          <PortalCard />
        </aside>
      </div>
    </>
  );
}

/* ---------- Quote hub ---------- */
export function GetQuotePage() {
  const title = 'Get an Insurance Quote | Fortress Insurance Solutions';
  const description = 'Request a free insurance quote online: auto, home, farm, commercial, life, pet, flood, umbrella, boat, motorcycle, RV and more from Fortress Insurance Solutions.';
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Get a Quote' }];
  return (
    <>
      <Seo title={title} description={description} path="/get-a-quote"
        jsonLd={graph(businessNode(), websiteNode(), webPageNode({ path: '/get-a-quote', title, description }), breadcrumbNode('/get-a-quote', crumbs))} />
      <PageHeader crumbs={crumbs} eyebrow="Free, no-obligation quotes" title="Get an Insurance Quote"
        lead="Choose the coverage you’re interested in. We’ll compare our carriers and follow up — usually within one business day." />
      <section className="section section--tight" aria-label="Quote types">
        <div className="container">
          <ul className="quote-grid">
            {QUOTES.map((q) => {
              const icon = { home: 'home', renters: 'home', flood: 'home', umbrella: 'home', auto: 'auto', 'classic-car': 'auto', farm: 'farm', commercial: 'commercial', life: 'life', pet: 'pet' }[q.key] || 'recreational';
              return (
                <li key={q.key}>
                  <a href={q.path} className="quote-tile">
                    <img src={`/images/icon-${icon}-164.webp`} width="164" height="199" alt="" loading="lazy" />
                    <span className="quote-tile__name">{q.name}<span className="sr-only"> insurance quote</span></span>
                    <Icon name="arrow" size={18} />
                  </a>
                </li>
              );
            })}
            <li>
              <ExtLink href={BUSINESS.travelUrl} className="quote-tile">
                <img src="/images/icon-travel-164.webp" width="164" height="199" alt="" loading="lazy" />
                <span className="quote-tile__name">Travel<span className="sr-only"> insurance quote</span></span>
                <Icon name="external" size={18} />
              </ExtLink>
            </li>
          </ul>
          <p className="center muted top-gap">Not sure what you need? <a href="/contact-us">Send us a message</a> or call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>.</p>
        </div>
      </section>
    </>
  );
}
