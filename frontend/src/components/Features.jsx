import { Zap, Shield, Gift, RefreshCw, Globe, Headphones, Award } from "lucide-react";

const N = "#355872", CY = "#06b6d4";

const FEATURES = [
  {
    Icon: Zap,
    emoji: "⚡",
    title: "Lightning Delivery",
    desc: "Same-day and next-day delivery in 50+ cities. Real-time tracking every step of the way.",
    color: "#f97316",
    lightBg: "#fff7ed",
    glow: "rgba(249,115,22,.15)",
  },
  {
    Icon: Shield,
    emoji: "🛡️",
    title: "Secure Payments",
    desc: "Military-grade AES-256 encryption. PCI DSS Level 1 certified. 100% money-back guarantee.",
    color: "#10b981",
    lightBg: "#ecfdf5",
    glow: "rgba(16,185,129,.15)",
  },
  {
    Icon: Gift,
    emoji: "🎁",
    title: "Exclusive Deals",
    desc: "Early access to flash sales, exclusive discounts and weekly curated collections for members.",
    color: "#ec4899",
    lightBg: "#fdf2f8",
    glow: "rgba(236,72,153,.15)",
  },
  {
    Icon: RefreshCw,
    emoji: "🔄",
    title: "Easy Returns",
    desc: "30-day hassle-free returns, no questions asked. Free doorstep pickup arranged for you.",
    color: "#8b5cf6",
    lightBg: "#f5f3ff",
    glow: "rgba(139,92,246,.15)",
  },
  {
    Icon: Globe,
    emoji: "🌍",
    title: "Global Catalog",
    desc: "2 million+ products from 10,000+ trusted sellers across 120 countries, all in one place.",
    color: "#0ea5e9",
    lightBg: "#f0f9ff",
    glow: "rgba(14,165,233,.15)",
  },
  {
    Icon: Headphones,
    emoji: "💬",
    title: "24/7 Support",
    desc: "Live chat, email and phone support around the clock. Average response time under 2 minutes.",
    color: N,
    lightBg: "#eff6ff",
    glow: "rgba(53,88,114,.15)",
  },
];

function FeatureCard({ feat }) {
  return (
    <div
      style={{
        borderRadius: 26,
        padding: "28px 24px",
        background: feat.lightBg,
        border: "2px solid transparent",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all .36s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = `0 20px 56px ${feat.glow}, 0 4px 16px rgba(0,0,0,.06)`;
        e.currentTarget.style.borderColor = `${feat.color}44`;
        e.currentTarget.querySelector(".bottom-line").style.width = "100%";
        e.currentTarget.querySelector(".feat-icon").style.transform = "scale(1.1) rotate(-4deg)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.querySelector(".bottom-line").style.width = "0%";
        e.currentTarget.querySelector(".feat-icon").style.transform = "scale(1) rotate(0deg)";
      }}
    >
      {/* Emoji accent (background watermark) */}
      <div style={{ position: "absolute", top: 16, right: 16, fontSize: 32, opacity: .12, userSelect: "none" }}>{feat.emoji}</div>

      {/* Icon */}
      <div
        className="feat-icon"
        style={{
          width: 56, height: 56, borderRadius: 16,
          background: feat.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
          boxShadow: `0 8px 24px ${feat.glow}`,
          transition: "transform .36s ease",
        }}
      >
        <feat.Icon size={26} color="white" strokeWidth={2} />
      </div>

      <h3 style={{ fontWeight: 800, fontSize: 17, color: "#1e293b", marginBottom: 10 }}>{feat.title}</h3>
      <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.72, margin: 0 }}>{feat.desc}</p>

      {/* Animated bottom line on hover */}
      <div
        className="bottom-line"
        style={{
          position: "absolute", bottom: 0, left: 0,
          height: 3, width: "0%",
          background: `linear-gradient(90deg, ${feat.color}, ${feat.color}88)`,
          borderRadius: 999,
          transition: "width .5s ease",
        }}
      />
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" style={{ background: "white", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* Subtle dot texture */}
      <div style={{ position: "absolute", inset: 0, opacity: .022, backgroundImage: `radial-gradient(${N} 1.5px, transparent 1.5px)`, backgroundSize: "28px 28px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 58 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${N}0f`, border: `1.5px solid ${N}28`, borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
            <Award size={12} style={{ color: N }} />
            <span style={{ color: N, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em" }}>Why Choose Us</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, marginBottom: 16, letterSpacing: "-1px" }}>
            Everything You Need,{" "}
            <span style={{ background: `linear-gradient(135deg, ${N}, ${CY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Nothing You Don't
            </span>
          </h2>
          <p style={{ color: "#64748b", fontSize: 18, maxWidth: 500, margin: "0 auto", lineHeight: 1.65 }}>
            Built for modern shoppers who demand speed, security, and a seamless experience.
          </p>
        </div>

        {/* 6-card grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {FEATURES.map((feat, i) => (
            <FeatureCard key={i} feat={feat} />
          ))}
        </div>
      </div>
    </section>
  );
}
