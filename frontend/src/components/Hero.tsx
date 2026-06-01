import { useState, useEffect } from "react";
import { ShoppingBag, Truck, Star, Package, Heart, TrendingUp, ArrowRight, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const N = "#355872", ND = "#1e3a4f", NL = "#4a7494", CY = "#06b6d4";

const PRODUCTS = [
  { emoji: "🎧", name: "Headphones Pro",  price: "$129", tag: "Bestseller", tagColor: "#f97316" },
  { emoji: "⌚", name: "Smart Watch X",   price: "$249", tag: "New",        tagColor: "#10b981" },
  { emoji: "👟", name: "Air Sneakers",    price: "$89",  tag: "50% Off",    tagColor: "#ec4899" },
];

const STATS = [
  { getValue: (count:any) => `${(count / 1e6).toFixed(1)}M+`, label: "Products",  Icon: Package },
  { getValue: () => "10K+",                                label: "Sellers",   Icon: TrendingUp },
  { getValue: () => "4.9★",                               label: "Rating",    Icon: Star },
  { getValue: () => "5M+",                                label: "Shoppers",  Icon: Heart },
];

export default function Hero() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= 2000000) { clearInterval(interval); return 2000000; }
          return prev + 52000;
        });
      }, 16);
      return () => clearInterval(interval);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  return (
    <section id="home" style={{
      background: "linear-gradient(135deg, #f0f5f9 0%, #e4eef7 50%, #dceaf6 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      paddingTop: 80,
    }}>
      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, opacity: .16, backgroundImage: `linear-gradient(${N}22 1px,transparent 1px), linear-gradient(90deg,${N}22 1px,transparent 1px)`, backgroundSize: "50px 50px", pointerEvents: "none" }} />

      {/* Glow blobs */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${N}28, transparent 70%)`, filter: "blur(90px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, #06b6d440, transparent 70%)", filter: "blur(90px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px", width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* ── LEFT SIDE: Text ── */}
          <div style={{ animation: "fadeUp .8s ease forwards" }}>

            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${N}14`, border: `1.5px solid ${N}30`, borderRadius: 999, padding: "6px 16px", marginBottom: 24 }}>
              <Sparkles size={12} style={{ color: N }} />
              <span style={{ color: N, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em" }}>New Season — Up to 50% Off</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-2px", color: "#0f172a", marginBottom: 22 }}>
              Discover &amp;{" "}
              <span style={{ background: `linear-gradient(135deg, ${N}, ${CY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Shop</span>
              <br />the Future
            </h1>

            {/* Sub */}
            <p style={{ color: "#5a7186", fontSize: 18, lineHeight: 1.72, marginBottom: 34, maxWidth: 460 }}>
              Millions of products. Thousands of trusted sellers. One seamless experience built for how you actually shop today.
            </p>

            {/* Dual CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 14, border: "none",
                background: `linear-gradient(135deg, ${N}, ${NL})`,
                color: "white", fontWeight: 800, fontSize: 15,
                cursor: "pointer", boxShadow: `0 5px 22px ${N}45`,
                transition: "all .3s",
              }}
              onClick={() => navigate("/products")}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05) translateY(-1px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${N}58`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = `0 5px 22px ${N}45`; }}
              >
                <Zap size={17} /> Start Shopping
              </button>
              <button style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: 14,
                border: `2px solid ${N}`,
                background: "white", color: N, fontWeight: 700, fontSize: 15,
                cursor: "pointer", transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${N}0a`; e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                View Trending <ArrowRight size={16} />
              </button>
            </div>

            {/* Stats grid */}
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {STATS.map(s => (
                <div key={s.label}
                  style={{ textAlign: "center", padding: "13px 6px", borderRadius: 14, background: "rgba(255,255,255,.78)", backdropFilter: "blur(10px)", border: "1.5px solid rgba(255,255,255,.9)", boxShadow: "0 2px 12px rgba(0,0,0,.05)", transition: "all .22s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 22px ${N}1a`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.05)"; }}
                >
                  <s.Icon size={15} style={{ color: N, margin: "0 auto 4px", display: "block" }} />
                  <div style={{ fontWeight: 900, fontSize: 17, color: "#0f172a" }}>{s.getValue(count)}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE: Visual Panel ── */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", animation: "fadeUp .9s .18s ease both" }}>

            {/* Main card */}
            <div style={{ width: 330, height: 450, borderRadius: 40, overflow: "hidden", background: `linear-gradient(160deg, ${N}2a, ${N}92)`, boxShadow: `0 32px 72px ${N}48`, position: "relative", border: `2px solid ${N}38` }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${N}25 1px, transparent 1px)`, backgroundSize: "22px 22px", opacity: .8 }} />
              <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 26 }}>
                {/* Logo circle */}
                <div style={{ width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,.96)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 56px rgba(0,0,0,.22)" }}>
                  <ShoppingBag size={62} style={{ color: N }} strokeWidth={1.2} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "white", fontWeight: 900, fontSize: 20 }}>Your Store</div>
                  <div style={{ color: "rgba(255,255,255,.55)", fontSize: 13, marginTop: 3 }}>Everything in one place</div>
                </div>
                {/* Product cards with hover */}
                {PRODUCTS.map((p, i) => (
                  <div key={i}
                    style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.14)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 12, padding: "10px 14px", width: "100%", transition: "all .25s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.24)"; e.currentTarget.style.transform = "translateX(5px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.14)"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <span style={{ fontSize: 18 }}>{p.emoji}</span>
                    <span style={{ color: "white", fontSize: 13, fontWeight: 600, flex: 1 }}>{p.name}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, background: p.tagColor, color: "white", padding: "2px 7px", borderRadius: 6, marginRight: 4, whiteSpace: "nowrap" }}>{p.tag}</span>
                    <span style={{ color: "#fbbf24", fontSize: 14, fontWeight: 800 }}>{p.price}</span>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to top, ${ND}, transparent)` }} />
            </div>

            {/* Floating — FREE SHIPPING badge */}
            <div style={{ position: "absolute", top: -14, right: -14, background: "white", borderRadius: 18, padding: "12px 16px", boxShadow: "0 10px 40px rgba(0,0,0,.14)", border: "1.5px solid #f0f5f9", display: "flex", alignItems: "center", gap: 10, animation: "floatBadge 3s ease-in-out infinite" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${N}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Truck size={18} style={{ color: N }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 12, color: "#0f172a" }}>FREE SHIPPING</div>
                <div style={{ fontSize: 10, color: "#94a3b8" }}>On orders $50+</div>
              </div>
            </div>

            {/* Floating — Rating */}
            <div style={{ position: "absolute", bottom: -14, left: -14, background: "white", borderRadius: 18, padding: "12px 16px", boxShadow: "0 10px 40px rgba(0,0,0,.14)", border: "1.5px solid #f0f5f9", display: "flex", alignItems: "center", gap: 10, animation: "floatBadge 3s 1.6s ease-in-out infinite" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Star size={18} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 12, color: "#0f172a" }}>4.9 / 5.0</div>
                <div style={{ fontSize: 10, color: "#94a3b8" }}>5M+ reviews</div>
              </div>
            </div>

            {/* Floating — Deal pill */}
            <div style={{ position: "absolute", top: "44%", right: -32, background: "linear-gradient(135deg, #f97316, #fbbf24)", color: "white", borderRadius: 16, padding: "10px 16px", boxShadow: "0 8px 26px rgba(249,115,22,.45)", transform: "rotate(3deg)", animation: "floatBadge 4s .5s ease-in-out infinite" }}>
              <div style={{ fontWeight: 900, fontSize: 20, lineHeight: 1 }}>50%</div>
              <div style={{ fontSize: 10, fontWeight: 700, opacity: .88, marginTop: 2 }}>OFF TODAY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
