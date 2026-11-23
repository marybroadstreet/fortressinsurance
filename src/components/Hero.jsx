import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons.jsx';
import { SLIDES } from '../data/site.js';

const INTERVAL = 7000;
const widths = [640, 800, 1100, 1600];
export const HERO_SIZES = '100vw';
const srcSet = (name) => widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');

/**
 * Rotating hero featuring each insurance type (carried over from the current
 * site's scrolling header). Accessible tabbed carousel: a labelled tab per
 * insurance type, pause/play control, pauses on hover/focus, and no autoplay
 * when the visitor prefers reduced motion. Only the first photo is in the
 * prerendered HTML (it is the LCP image); the others load after hydration.
 */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [deferredReady, setDeferredReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const tabsRef = useRef(null);

  useEffect(() => {
    setPlaying(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    // Other slides' photos wait until the page has fully loaded so they never compete with the first (LCP) photo.
    const ready = () => setTimeout(() => setDeferredReady(true), 600);
    if (document.readyState === 'complete') ready();
    else window.addEventListener('load', ready, { once: true });
    return () => window.removeEventListener('load', ready);
  }, []);

  const go = useCallback((i) => setIndex((i + SLIDES.length) % SLIDES.length), []);
  const running = playing && deferredReady && !hovered && !focused;

  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [running, index, go]);

  const onTabKey = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    let next = null;
    if (step) next = (index + step + SLIDES.length) % SLIDES.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = SLIDES.length - 1;
    if (next === null) return;
    e.preventDefault();
    go(next);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  const s = SLIDES[index];

  return (
    <section
      className={`hero${running ? ' is-playing' : ''}`}
      aria-roledescription="carousel"
      aria-label="Insurance we offer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
    >
      <div className="hero__slides">
        {SLIDES.map((slide, i) => (
          <div key={slide.key} className={`hero__media${i === index ? ' is-active' : ''}`} aria-hidden={i !== index}>
            {(i === 0 || deferredReady) && (
              <img
                src={`/images/${slide.image}-1600.webp`}
                srcSet={srcSet(slide.image)}
                sizes={HERO_SIZES}
                width="1600"
                height="800"
                alt={slide.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'low'}
                decoding={i === 0 ? 'sync' : 'async'}
              />
            )}
          </div>
        ))}
      </div>

      <div className="container hero__content">
        <div className="hero__card">
          <h1 className="hero__eyebrow">Independent Insurance Agency in Camden, SC</h1>
          <div
            className="hero__panel"
            id="hero-panel"
            role="tabpanel"
            aria-labelledby={`tab-${s.key}`}
            aria-live={running ? 'off' : 'polite'}
            key={s.key}
          >
            <p className="hero__title">{s.title}</p>
            <p className="hero__text">{s.text}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={s.quote}>Get a {s.label} Quote <Icon name="arrow" size={18} /></a>
              <a className="btn btn--ghost" href={s.href}>Learn more<span className="sr-only"> about {s.title.toLowerCase()}</span></a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__controls">
        <div className="container hero__controls-inner">
          <button
            type="button"
            className="hero__play"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          >
            <Icon name={playing ? 'pause' : 'play'} size={16} />
          </button>
          <div className="hero__tabs" role="tablist" aria-label="Choose an insurance type" ref={tabsRef} onKeyDown={onTabKey}>
            {SLIDES.map((slide, i) => (
              <button
                key={slide.key}
                id={`tab-${slide.key}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-controls="hero-panel"
                tabIndex={i === index ? 0 : -1}
                className="hero__tab"
                onClick={() => go(i)}
              >
                <span className="hero__tab-label">{slide.label}</span>
                <span className="hero__tab-bar" aria-hidden="true"><span /></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
