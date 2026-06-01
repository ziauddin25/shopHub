import { useState, useEffect } from "react";
import { ShoppingBag, Search, ShoppingCart, Menu, X, ArrowRight } from "lucide-react";

const N = "#355872", ND = "#1e3a4f", NL = "#4a7494";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Shop",     href: "#features" },
  { label: "Features", href: "#features" },
  { label: "FAQ",      href: "#faq" },
  { label: "Contact",  href: "#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: scrolled ? `${N}f2` : N,
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      boxShadow: scrolled ? `0 4px 30px ${N}60` : "none",
      transition: "all .4s ease",
    }}>

      {/* ── Top Bar ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <div style={{ position: "relative" }}>
            {/* <div style={{ width: 40, height: 40, borderRadius: 12, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,.22)" }}>
              <ShoppingBag size={20} style={{ color: N }} strokeWidth={2.5} />
            </div> */}
            <div style={{ width: 35, height: 35}}>
              <img src="/img/logoShop.png" alt="logo" style={{width: '100%', height: 'auto', objectFit: 'cover'}} />
            </div>
            <span style={{ position: "absolute", top: -3, right: -3, width: 10, height: 10, background: "#f97316", borderRadius: "50%", border: "2px solid white", display: "block" }} />
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 900, fontSize: 18, lineHeight: 1, letterSpacing: "-0.5px" }}>ShopHub</div>
            <div style={{ color: "rgba(255,255,255,.45)", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".18em", marginTop: 2 }}>Marketplace</div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{ position: "relative", color: "rgba(255,255,255,.78)", textDecoration: "none", fontSize: 14, fontWeight: 500, padding: "8px 14px", borderRadius: 9, transition: "all .22s", overflow: "hidden" }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "white";
                e.currentTarget.style.background = "rgba(255,255,255,.12)";
                const u = e.currentTarget.querySelector(".uline");
                if (u) u.style.width = "70%";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(255,255,255,.78)";
                e.currentTarget.style.background = "transparent";
                const u = e.currentTarget.querySelector(".uline");
                if (u) u.style.width = "0%";
              }}
            >
              {link.label}
              <span className="uline" style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", height: 2, width: "0%", background: "white", borderRadius: 999, transition: "width .3s ease", display: "block" }} />
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Search */}
          {/* <button style={{ padding: 8, background: "rgba(255,255,255,.1)", border: "none", borderRadius: 9, cursor: "pointer", color: "rgba(255,255,255,.75)", display: "flex", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.75)"; }}
          ><Search size={17} /></button> */}
           {showInput && (
            <input
              type="text"
              placeholder="Search products..."
              style={{
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,.3)",
                background: "rgba(255,255,255,.05)",
                color: "white",
                outline: "none",
                transition: "all .2s",
                width: 200,
              }}
            />
          )}
           <button
            style={{
              padding: 8,
              background: "rgba(255,255,255,.1)",
              border: "none",
              borderRadius: 9,
              cursor: "pointer",
              color: "rgba(255,255,255,.75)",
              display: "flex",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.2)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.1)";
              e.currentTarget.style.color = "rgba(255,255,255,.75)";
            }}
            onClick={() => setShowInput(!showInput)} // toggle input visibility
          >
            <Search size={17} />
          </button>

          {/* Cart */}
          <button style={{ position: "relative", padding: 8, background: "rgba(255,255,255,.1)", border: "none", borderRadius: 9, cursor: "pointer", color: "rgba(255,255,255,.75)", display: "flex", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.75)"; }}
          >
            <ShoppingCart size={17} />
            <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, background: "#f97316", borderRadius: "50%", border: "1.5px solid white" }} />
          </button>

          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.18)" }} />

          {/* Sign In */}
          <button style={{ background: "none", border: "none", color: "rgba(255,255,255,.82)", fontSize: 14, fontWeight: 500, padding: "8px 13px", borderRadius: 9, cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >Sign In</button>
          {/* CTA Button — white bg, navy text, rounded */}
          <button style={{
            background: "white", color: N, fontWeight: 800, fontSize: 14,
            padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,0,0,.15)", transition: "all .28s", whiteSpace: "nowrap",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#f0f5f9";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,.15)";
            }}
          >Get Started →</button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", padding: 9, background: "rgba(255,255,255,.12)", border: "none", borderRadius: 10, cursor: "pointer", color: "white", transition: "all .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.22)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.12)"}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <div style={{
        background: ND,
        maxHeight: mobileOpen ? "500px" : "0px",
        overflow: "hidden",
        transition: "max-height .44s cubic-bezier(.4,0,.2,1)",
        borderTop: mobileOpen ? "1px solid rgba(255,255,255,.08)" : "none",
      }}>
        <div style={{ padding: "12px 24px 24px" }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, color: "rgba(255,255,255,.82)", textDecoration: "none", fontSize: 15, fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,.06)", transition: "all .22s", marginBottom: 2 }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "white"; e.currentTarget.style.paddingLeft = "22px"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,.82)"; e.currentTarget.style.paddingLeft = "16px"; }}
            >
              <span>{link.label}</span>
              <ArrowRight size={15} style={{ opacity: .4 }} />
            </a>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button style={{ flex: 1, padding: 13, borderRadius: 12, border: "1.5px solid rgba(255,255,255,.2)", background: "none", color: "rgba(255,255,255,.85)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Sign In</button>
            <button style={{ flex: 1, padding: 13, borderRadius: 12, border: "none", background: "white", color: N, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Get Started</button>
          </div>
        </div>
      </div>

    </nav>
  );
}
