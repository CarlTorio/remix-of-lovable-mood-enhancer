import { useEffect, useState } from "react";
import { useShopState } from "@/lib/shop-store";

const IMG = {
  citrulline:
    "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/L-citrulline%20(3).png",
  magnesium:
    "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/Magnesium%20Glycinate%20(3).png",
  taurine:
    "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/Taurine%20(3).png",
  b6: "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/Vitamin%20B6%20(3).png",
  tongkat:
    "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/Tongkat%20Ali%20(2).png",
  maca: "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/Maca%20root%20(2).png",
  ginseng:
    "https://hmavnijneqxnythlehpw.supabase.co/storage/v1/object/public/LOVABLE%20ASSETS/Panax%20Ginseng%20(2).png",
};

type Ingredient = {
  key: string;
  tab: string;
  img: string;
  meta: string;
  name: React.ReactNode;
  description: string;
  benefits: string[];
};

const HER: Ingredient[] = [
  {
    key: "citrulline",
    tab: "L-Citrulline",
    img: IMG.citrulline,
    meta: "AMINO ACID · 1,000mg",
    name: <>L-<em>Citrulline</em></>,
    description:
      "A naturally occurring amino acid that supports healthy blood circulation and natural arousal response.",
    benefits: [
      "Promotes natural blood flow",
      "Supports physical responsiveness",
      "Clinically studied dosage",
    ],
  },
  {
    key: "magnesium",
    tab: "Magnesium",
    img: IMG.magnesium,
    meta: "MINERAL · 200mg",
    name: <>Magnesium <em>Glycinate</em></>,
    description:
      "The most bioavailable form of magnesium, supporting muscle relaxation and a balanced stress response.",
    benefits: [
      "Promotes calm and relaxation",
      "Supports better sleep quality",
      "Reduces stress-related tension",
    ],
  },
  {
    key: "taurine",
    tab: "Taurine",
    img: IMG.taurine,
    meta: "AMINO ACID · 500mg",
    name: <><em>Taurine</em></>,
    description:
      "Supports cellular energy production and balanced hormone response, promoting natural mood elevation.",
    benefits: [
      "Boosts cellular energy",
      "Supports mood balance",
      "Enhances natural responsiveness",
    ],
  },
  {
    key: "b6",
    tab: "Vitamin B6",
    img: IMG.b6,
    meta: "VITAMIN · 25mg",
    name: <>Vitamin <em>B6</em></>,
    description:
      "Essential for neurotransmitter production, supporting serotonin and dopamine balance for natural mood elevation.",
    benefits: [
      "Supports serotonin production",
      "Promotes hormone balance",
      "Enhances mood naturally",
    ],
  },
];

const HIM: Ingredient[] = [
  {
    key: "tongkat",
    tab: "Tongkat Ali",
    img: IMG.tongkat,
    meta: "ROOT EXTRACT · 400mg",
    name: <>Tongkat <em>Ali</em></>,
    description:
      "Traditional Southeast Asian root extract, clinically studied for supporting natural testosterone levels and stamina.",
    benefits: [
      "Supports natural testosterone",
      "Enhances physical stamina",
      "Promotes confidence",
    ],
  },
  {
    key: "maca",
    tab: "Maca Root",
    img: IMG.maca,
    meta: "ROOT POWDER · 1,500mg",
    name: <>Maca <em>Root</em></>,
    description:
      "Peruvian superfood with centuries of use for supporting energy, endurance, and natural drive.",
    benefits: [
      "Boosts sustained energy",
      "Supports natural drive",
      "Enhances endurance",
    ],
  },
  {
    key: "ginseng",
    tab: "Panax Ginseng",
    img: IMG.ginseng,
    meta: "ROOT EXTRACT · 200mg",
    name: <>Panax <em>Ginseng</em></>,
    description:
      "Premium Korean ginseng known for supporting mental clarity, focus, and physical performance.",
    benefits: [
      "Sharpens mental focus",
      "Supports physical performance",
      "Enhances natural confidence",
    ],
  },
];

export function IngredientsShowcase() {
  const { variant } = useShopState();
  const [side, setSide] = useState<"her" | "him">(variant === "him" ? "him" : "her");

  useEffect(() => {
    if (variant === "her") setSide("her");
    else if (variant === "him") setSide("him");
  }, [variant]);

  const list = side === "her" ? HER : HIM;
  const [activeKey, setActiveKey] = useState(list[0].key);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setActiveKey(list[0].key);
  }, [side]);

  const active = list.find((i) => i.key === activeKey) ?? list[0];

  const handleTab = (key: string) => {
    if (key === activeKey) return;
    setFade(false);
    setTimeout(() => {
      setActiveKey(key);
      setFade(true);
    }, 200);
  };

  return (
    <section className="ingredients-section">
      <style>{`
        .ingredients-section {
          padding: 80px 24px;
          background: linear-gradient(180deg, #0F0808 0%, #160808 50%, #0F0808 100%);
        }
        .ingredients-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; letter-spacing: 3px;
          color: #C9A06D; text-transform: uppercase;
          text-align: center; margin: 0 0 12px;
        }
        .ingredients-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 42px; color: #F2EAE0;
          text-align: center; font-weight: 400;
          margin: 0 0 12px; line-height: 1.1;
        }
        .ingredients-title em { font-style: italic; color: #B8955A; }
        .ingredients-sub {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic; font-size: 16px;
          color: rgba(184, 149, 90, 0.85);
          text-align: center; margin: 0 auto 32px; max-width: 540px;
        }
        .ingredients-side-toggle {
          display: flex; justify-content: center; gap: 6px;
          margin: 0 auto 24px; max-width: 280px;
          padding: 4px; background: rgba(13,6,6,0.6);
          border: 0.5px solid rgba(184,149,90,0.25);
          border-radius: 999px;
        }
        .ingredients-side-toggle button {
          flex: 1; padding: 8px 14px; border-radius: 999px;
          background: transparent; border: none; cursor: pointer;
          font-family: 'Montserrat', sans-serif; font-size: 10px;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(242,234,224,0.7); transition: all 250ms ease;
        }
        .ingredients-side-toggle button.active {
          background: linear-gradient(135deg, #DC2627, #C61F20);
          color: #F2EAE0;
        }
        .ingredients-tabs {
          display: flex; justify-content: center; gap: 8px;
          margin: 0 auto 48px; flex-wrap: wrap; max-width: 720px;
        }
        .ingredient-tab {
          padding: 10px 20px;
          background: rgba(13, 6, 6, 0.5);
          border: 0.5px solid rgba(184, 149, 90, 0.3);
          border-radius: 999px;
          color: rgba(242, 234, 224, 0.7);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; letter-spacing: 1px; font-weight: 500;
          cursor: pointer; transition: all 250ms ease;
        }
        .ingredient-tab:hover {
          border-color: rgba(184, 149, 90, 0.5); color: #F2EAE0;
        }
        .ingredient-tab.active {
          background: linear-gradient(135deg, #DC2627, #C61F20);
          border: 0.5px solid #DC2627; color: #F2EAE0;
          box-shadow:
            0 1px 0 rgba(242, 234, 224, 0.2) inset,
            0 4px 12px rgba(220, 38, 39, 0.4);
        }
        .ingredients-content {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: center;
          max-width: 1080px; margin: 0 auto;
          transition: opacity 200ms ease;
        }
        .ingredient-image {
          aspect-ratio: 1 / 1; background: #1A0E0E;
          border: 0.5px solid rgba(184, 149, 90, 0.25);
          border-radius: 16px; padding: 60px;
          display: flex; align-items: center; justify-content: center;
          box-shadow:
            0 1px 0 rgba(242, 234, 224, 0.05) inset,
            0 16px 48px rgba(0, 0, 0, 0.4),
            0 0 64px rgba(184, 149, 90, 0.05);
        }
        .ingredient-image img {
          width: 100%; height: 100%; object-fit: contain;
        }
        .ingredient-text { display: flex; flex-direction: column; gap: 16px; }
        .ingredient-meta {
          display: flex; align-items: center; gap: 12px;
          color: #C9A06D; font-family: 'Montserrat', sans-serif;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
        }
        .ingredient-meta::before {
          content: ''; width: 24px; height: 0.5px; background: #B8955A;
        }
        .ingredient-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px; color: #F2EAE0; font-weight: 400;
          margin: 0; line-height: 1.1;
        }
        .ingredient-name em { font-style: italic; color: #DC2627; }
        .ingredient-description {
          font-size: 14px; color: rgba(242, 234, 224, 0.85);
          line-height: 1.6; margin: 0;
        }
        .ingredient-benefits {
          display: flex; flex-direction: column; gap: 10px; margin-top: 8px;
        }
        .ingredient-benefit {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: rgba(242, 234, 224, 0.85); line-height: 1.5;
        }
        .ingredient-benefit::before {
          content: '◆'; color: #C9A06D; font-size: 8px;
          margin-top: 6px; flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .ingredients-section { padding: 56px 16px; }
          .ingredients-title { font-size: 30px; }
          .ingredients-sub { font-size: 13px; margin-bottom: 24px; }
          .ingredient-tab { padding: 8px 14px; font-size: 10px; letter-spacing: 0.5px; }
          .ingredients-content { grid-template-columns: 1fr; gap: 24px; }
          .ingredient-image { padding: 32px; max-width: 280px; margin: 0 auto; }
          .ingredient-name { font-size: 26px; }
          .ingredient-description { font-size: 13px; }
          .ingredient-benefit { font-size: 12px; }
        }
      `}</style>

      <p className="ingredients-eyebrow">Crafted With Intention</p>
      <h2 className="ingredients-title">
        Backed by <em>nature.</em>
      </h2>
      <p className="ingredients-sub">
        Every ingredient chosen for purpose, dosed for results.
      </p>

      {variant === "couples" && (
        <div className="ingredients-side-toggle">
          <button
            className={side === "her" ? "active" : ""}
            onClick={() => setSide("her")}
            type="button"
          >
            For Her
          </button>
          <button
            className={side === "him" ? "active" : ""}
            onClick={() => setSide("him")}
            type="button"
          >
            For Him
          </button>
        </div>
      )}

      <div className="ingredients-tabs">
        {list.map((i) => (
          <button
            key={i.key}
            type="button"
            onClick={() => handleTab(i.key)}
            className={`ingredient-tab ${activeKey === i.key ? "active" : ""}`}
          >
            {i.tab}
          </button>
        ))}
      </div>

      <div className="ingredients-content" style={{ opacity: fade ? 1 : 0 }}>
        <div className="ingredient-image">
          <img src={active.img} alt={active.tab} loading="lazy" />
        </div>
        <div className="ingredient-text">
          <div className="ingredient-meta">{active.meta}</div>
          <h3 className="ingredient-name">{active.name}</h3>
          <p className="ingredient-description">{active.description}</p>
          <div className="ingredient-benefits">
            {active.benefits.map((b) => (
              <div key={b} className="ingredient-benefit">{b}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
