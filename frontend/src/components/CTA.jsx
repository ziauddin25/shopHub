import { useState } from "react";
import { ArrowRight, Check, Shield, Zap, Star, RefreshCw, Mail } from "lucide-react";

const N = "#355872", ND = "#1e3a4f", NL = "#4a7494";

const TRUST_BADGES = [
  { Icon: Shield,    label: "SSL Secured"     },
  { Icon: Zap,       label: "Instant Access"  },
  { Icon: Star,      label: "5M+ Shoppers"    },
  { Icon: RefreshCw, label: "Cancel Anytime"  },
];

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section id="cta" style={{ position: "relative", padding: "110px 0", overflow: "hidden" }}>

      {/* ── Colorful gradient background ── */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${ND} 0%, ${N} 38%, #1a6b8a 68%, #0e7490 100%)` }} />

      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: .06, backgroundImage: "linear-gradient(white 1px,transparent 1px), linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      {/* Glow blob — top right cyan */}
      <div style={{ position: "absolute", top: -140, right: -100, width: 580, height: 580, borderRadius: "50%", background: "radial-gradient(circle, #06b6d445, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Glow blob — bottom left orange */}
      <div style={{ position: "absolute", bottom: -100, left: -80, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, #f9731638, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Glowing orb center */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,255,255,.04), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>

        {/* Pulse badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.12)", border: "1.5px solid rgba(255,255,255,.22)", borderRadius: 999, padding: "6px 16px", marginBottom: 26 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: "rgba(255,255,255,.9)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em" }}>Limited-Time Offer</span>
        </div>

        {/* Headline */}
        <h2 style={{ fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 900, color: "white", lineHeight: 1.08, marginBottom: 18, letterSpacing: "-1.5px" }}>
          Get{" "}
          <span style={{ background: "linear-gradient(90deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 20px rgba(249,115,22,.4))" }}>
            20% Off
          </span>
          {" "}Your First Order
        </h2>

        {/* Sub */}
        <p style={{ color: "rgba(255,255,255,.72)", fontSize: 18, lineHeight: 1.72, maxWidth: 540, margin: "0 auto 38px" }}>
          Join 5 million happy shoppers. Sign up today and unlock exclusive deals, early access to sales and personalised recommendations.
        </p>

        {/* Email capture */}
        {!submitted ? (
          <div className="cta-form" style={{ display: "flex", gap: 12, maxWidth: 480, margin: "0 auto 18px", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Mail size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.45)", pointerEvents: "none" }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder="Enter your email..."
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  width: "100%",
                  paddingLeft: 44, paddingRight: 16, paddingTop: 14, paddingBottom: 14,
                  background: focused ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.13)",
                  border: `1.5px solid ${focused ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.25)"}`,
                  color: "white",
                  borderRadius: 14,
                  fontSize: 15,
                  outline: "none",
                  transition: "all .25s",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "14px 24px", borderRadius: 14, border: "none",
                background: "linear-gradient(135deg, #f97316, #fbbf24)",
                color: "white", fontWeight: 800, fontSize: 15,
                cursor: "pointer", whiteSpace: "nowrap",
                boxShadow: "0 6px 22px rgba(249,115,22,.45)",
                transition: "all .3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(249,115,22,.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(249,115,22,.45)"; }}
            >
              Claim 20% Off <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.14)", border: "1.5px solid rgba(255,255,255,.28)", borderRadius: 16, padding: "16px 26px", marginBottom: 18 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Check size={16} color="white" strokeWidth={2.5} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "white", fontWeight: 800, fontSize: 16 }}>You're in! 🎉</div>
              <div style={{ color: "rgba(255,255,255,.65)", fontSize: 13 }}>Check your inbox for your discount code</div>
            </div>
          </div>
        )}

        <p style={{ color: "rgba(255,255,255,.35)", fontSize: 12, marginBottom: 40 }}>
          No spam, ever. Unsubscribe anytime. Valid for new accounts only.
        </p>

        {/* Trust badges */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 28, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,.12)" }}>
          {TRUST_BADGES.map(({ Icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,.55)", fontSize: 13, fontWeight: 500 }}>
              <Icon size={15} style={{ color: "rgba(255,255,255,.4)" }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
