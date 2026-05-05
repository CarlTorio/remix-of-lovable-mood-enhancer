import { useEffect, useRef } from "react";

const IMG_1 =
  "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/ChatGPT%20Image%20Apr%2029,%202026,%2011_46_31%20PM.png";
const IMG_2 =
  "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/ChatGPT%20Image%20Apr%2028,%202026,%2001_47_05%20AM%20(1).png";
const IMG_3 =
  "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/ChatGPT%20Image%20Apr%2029,%202026,%2004_28_13%20PM.png";

type StatProps = {
  end: number;
  format: "plus" | "percent" | "days";
  label: string;
};

function Stat({ end, format, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = formatVal(end, format);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const start = performance.now();
          const duration = 1800;
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const current = Math.floor(end * eased);
            el.textContent = formatVal(current, format);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, format]);

  return (
    <div className="story-stat">
      <div className="stat-number" ref={ref}>
        {formatVal(0, format)}
      </div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

function formatVal(n: number, format: StatProps["format"]) {
  if (format === "percent") return `${n}%`;
  if (format === "days") return `${n}-Day`;
  if (n >= 1000) return `${n.toLocaleString()}+`;
  return n.toLocaleString();
}

const HEADLINE_WORDS = [
  "Made",
  "for",
  "the",
  "couples",
  "who",
  "refuse",
  "to",
  "settle.",
];

export function ProductStory() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const fadeRefs = useRef<HTMLElement[]>([]);
  const parallaxRefs = useRef<HTMLDivElement[]>([]);

  // Scroll fade-in
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fadeRefs.current.forEach((el) => el?.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );
    fadeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Word-by-word reveal
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll(".text-reveal-word").forEach((w) =>
        w.classList.add("is-visible"),
      );
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const words = el.querySelectorAll(".text-reveal-word");
          words.forEach((w, i) => {
            setTimeout(() => w.classList.add("is-visible"), i * 80);
          });
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Subtle parallax on images (desktop, no reduced motion)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let ticking = false;
    const update = () => {
      parallaxRefs.current.forEach((img, index) => {
        if (!img) return;
        const rect = img.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        const speed = 0.04 + index * 0.015;
        const yOffset = (window.innerHeight - rect.top) * speed;
        img.style.transform = `translateY(${-yOffset}px)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setFadeRef = (i: number) => (el: HTMLElement | null) => {
    if (el) fadeRefs.current[i] = el;
  };
  const setParallaxRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) parallaxRefs.current[i] = el;
  };

  return (
    <section className="product-story-section">
      <style>{`
        .product-story-section {
          padding: 100px 24px;
          background: linear-gradient(180deg, #0F0808 0%, #1A0E0E 30%, #1A0E0E 70%, #0F0808 100%);
          position: relative; overflow: hidden;
        }
        .product-story-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse at 30% 50%, rgba(220,38,39,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 50%, rgba(184,149,90,0.04) 0%, transparent 50%);
        }
        .story-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .story-eyebrow {
          font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 3px;
          color: #C9A06D; text-transform: uppercase; font-weight: 500; margin: 0 0 16px;
        }
        .story-headline {
          font-family: 'Playfair Display', Georgia, serif; font-size: 48px;
          color: #F2EAE0; font-weight: 400; line-height: 1.1;
          letter-spacing: -0.02em; margin: 0 0 32px;
        }
        .story-headline em { font-style: italic; color: #DC2627; }
        .text-reveal-word {
          display: inline-block; opacity: 0; transform: translateY(12px);
          transition: opacity 400ms ease-out, transform 400ms cubic-bezier(0.4,0,0.2,1);
          margin-right: 0.28em;
        }
        .text-reveal-word.is-visible { opacity: 1; transform: translateY(0); }
        .story-divider {
          width: 48px; height: 0.5px;
          background: linear-gradient(to right, #B8955A, transparent);
          margin: 0 0 32px;
        }
        .story-paragraphs { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
        .story-paragraph {
          font-family: 'Playfair Display', Georgia, serif; font-size: 16px;
          color: rgba(242,234,224,0.85); line-height: 1.7; margin: 0;
        }
        .story-paragraph em { font-style: italic; color: #B8955A; }
        .story-signature {
          display: flex; align-items: center; gap: 12px;
          padding-top: 24px; border-top: 0.5px solid rgba(184,149,90,0.18);
        }
        .signature-line { width: 32px; height: 0.5px; background: #B8955A; }
        .signature-text {
          font-family: 'Playfair Display', Georgia, serif; font-size: 12px;
          color: rgba(184,149,90,0.85); margin: 0;
        }
        .signature-text em { font-style: italic; }
        .story-visual-column { display: flex; flex-direction: column; gap: 32px; }
        .story-image-stack {
          display: grid; grid-template-columns: 2fr 1fr;
          grid-template-rows: 1fr 1fr; gap: 12px; height: 400px;
        }
        .story-image {
          background-size: cover; background-position: center; border-radius: 12px;
          border: 0.5px solid rgba(184,149,90,0.2);
          box-shadow: 0 1px 0 rgba(242,234,224,0.05) inset, 0 12px 32px rgba(0,0,0,0.4);
          will-change: transform;
        }
        .story-image-1 { grid-row: 1 / 3; }
        .story-image-2 { grid-row: 1; grid-column: 2; }
        .story-image-3 { grid-row: 2; grid-column: 2; }
        .story-stats-row {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          padding: 24px;
          background: rgba(13,6,6,0.6);
          border: 0.5px solid rgba(184,149,90,0.25);
          border-radius: 14px; backdrop-filter: blur(12px);
        }
        .story-stat { text-align: center; padding: 8px 4px; border-right: 0.5px solid rgba(184,149,90,0.18); }
        .story-stat:last-child { border-right: none; }
        .stat-number {
          font-family: 'Playfair Display', Georgia, serif; font-style: italic;
          font-size: 28px; color: #DC2627; font-weight: 500; line-height: 1;
          margin: 0 0 6px; font-variant-numeric: tabular-nums;
        }
        .stat-label {
          font-family: 'Montserrat', sans-serif; font-size: 9px;
          letter-spacing: 1.5px; color: rgba(154,136,128,0.85);
          text-transform: uppercase; margin: 0;
        }

        .scroll-fade {
          opacity: 0; transform: translateY(24px);
          transition: opacity 800ms cubic-bezier(0.4,0,0.2,1), transform 800ms cubic-bezier(0.4,0,0.2,1);
        }
        .scroll-fade.is-visible { opacity: 1; transform: translateY(0); }
        .story-paragraph.scroll-fade:nth-child(1) { transition-delay: 0ms; }
        .story-paragraph.scroll-fade:nth-child(2) { transition-delay: 100ms; }
        .story-paragraph.scroll-fade:nth-child(3) { transition-delay: 200ms; }

        @media (max-width: 768px) {
          .product-story-section { padding: 56px 16px; }
          .story-grid { grid-template-columns: 1fr; gap: 40px; }
          .story-headline { font-size: 30px; margin-bottom: 24px; }
          .story-paragraph { font-size: 14px; line-height: 1.6; }
          .story-image-stack { height: 300px; gap: 8px; grid-template-columns: 1fr 1fr; }
          .story-image-1 { grid-column: 1 / 3; grid-row: 1; }
          .story-image-2 { grid-column: 1; grid-row: 2; }
          .story-image-3 { grid-column: 2; grid-row: 2; }
          .story-image { transform: none !important; }
          .story-stats-row { grid-template-columns: 1fr; gap: 12px; padding: 16px; }
          .story-stat {
            border-right: none;
            border-bottom: 0.5px solid rgba(184,149,90,0.18);
            padding: 12px 4px;
          }
          .story-stat:last-child { border-bottom: none; }
          .stat-number { font-size: 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-fade, .text-reveal-word, .story-image {
            transition: none !important; transform: none !important; opacity: 1 !important;
          }
        }
      `}</style>

      <div className="story-container">
        <div className="story-grid">
          <div>
            <p className="scroll-fade story-eyebrow" ref={setFadeRef(0)}>
              The LOVABLE Story
            </p>
            <h2 className="story-headline" ref={headlineRef}>
              {HEADLINE_WORDS.map((w, i) => {
                const isLast = i === HEADLINE_WORDS.length - 1;
                if (isLast) {
                  return (
                    <span key={i} className="text-reveal-word">
                      <em>{w}</em>
                    </span>
                  );
                }
                return (
                  <span key={i} className="text-reveal-word">
                    {w}
                  </span>
                );
              })}
            </h2>
            <div className="story-divider" />
            <div className="story-paragraphs">
              <p className="scroll-fade story-paragraph" ref={setFadeRef(1)}>
                We started LOVABLE because we noticed something: Filipino
                couples weren't talking about it.
              </p>
              <p className="scroll-fade story-paragraph" ref={setFadeRef(2)}>
                The slow fade. The polite distance. The intimacy that quietly
                disappears between work, kids, and exhaustion. Couples kept
                telling us, <em>"normal na yan eh."</em>
              </p>
              <p className="scroll-fade story-paragraph" ref={setFadeRef(3)}>
                But normal isn't acceptance. Normal is just what we got used
                to. So we created drops crafted with botanical adaptogens and
                clinical-grade nutrients, for couples who remember what it
                felt like, and want it back.
              </p>
            </div>
            <div className="scroll-fade story-signature" ref={setFadeRef(4)}>
              <span className="signature-line" />
              <p className="signature-text">
                <em>From a couple who's been there.</em>
              </p>
            </div>
          </div>

          <div className="story-visual-column">
            <div className="story-image-stack">
              <div
                className="story-image story-image-1"
                ref={setParallaxRef(0)}
                style={{ backgroundImage: `url(${IMG_1})` }}
                aria-hidden
              />
              <div
                className="story-image story-image-2"
                ref={setParallaxRef(1)}
                style={{ backgroundImage: `url(${IMG_2})` }}
                aria-hidden
              />
              <div
                className="story-image story-image-3"
                ref={setParallaxRef(2)}
                style={{ backgroundImage: `url(${IMG_3})` }}
                aria-hidden
              />
            </div>
            <div className="scroll-fade story-stats-row" ref={setFadeRef(5)}>
              <Stat end={3500} format="plus" label="Couples reconnected" />
              <Stat end={98} format="percent" label="Would recommend" />
              <Stat end={30} format="days" label="Money-back promise" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
