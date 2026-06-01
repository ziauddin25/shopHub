import { ShoppingBag, Twitter, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const N = "#355872", NL = "#4a7494";

const FOOTER_LINKS = {
  Shop: [
    "New Arrivals", "Best Sellers", "Sale Items", "Top Brands", "All Categories",
  ],
  Support: [
    "Help Center", "Track Order", "Returns & Refunds", "Contact Us", "Live Chat",
  ],
  Company: [
    "About Us", "Careers", "Press Room", "Blog", "Affiliate Program",
  ],
  Legal: [
    "Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR",
  ],
};

const SOCIAL_ICONS = [
  { Icon: Twitter,   label: "Twitter"   },
  { Icon: Facebook,  label: "Facebook"  },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin,  label: "LinkedIn"  },
  { Icon: Youtube,   label: "YouTube"   },
];

const PAYMENT_METHODS = ["💳 Visa", "Mastercard", "PayPal", "🍎 Pay", "G Pay"];

function FooterLinkCol({ title, links }) {
  return (
    <div style={{ flex: "1 1 120px", minWidth: 110 }}>
      <h4 style={{ color: "white", fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 16 }}>
        {title}
      </h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
        {links.map(link => (
          <li key={link}>
            <a href="#"
              style={{ color: "#64748b", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "all .18s" }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "white";
                e.currentTarget.querySelector(".link-dot").style.width = "8px";
                e.currentTarget.style.paddingLeft = "2px";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.querySelector(".link-dot").style.width = "0px";
                e.currentTarget.style.paddingLeft = "0px";
              }}
            >
              <span className="link-dot" style={{ display: "inline-block", width: 0, height: 2, background: NL, borderRadius: 999, transition: "width .2s", flexShrink: 0 }} />
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#0a0f1a", color: "white", paddingTop: 64, paddingBottom: 28 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Main 5-column layout ── */}
        <div className="footer-grid" style={{ display: "flex", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>

          {/* Column 1 — Brand (wider) */}
          <div style={{ flex: "0 0 260px", minWidth: 220 }}>
            {/* Logo */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              {/* <div style={{ width: 40, height: 40, borderRadius: 12, background: N, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 14px ${N}55` }}>
                <ShoppingBag size={20} color="white" strokeWidth={2.5} />
              </div> */}
              <div style={{ width: 35, height: 35}}>
                <img src="/img/logoShop.png" alt="logo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 900, fontSize: 18, lineHeight: 1 }}>ShopHub</div>
                <div style={{ color: "#475569", fontSize: 9, textTransform: "uppercase", letterSpacing: ".18em", fontWeight: 600, marginTop: 3 }}>Marketplace</div>
              </div>
            </div>

            {/* Desc */}
            <p style={{ color: "#64748b", fontSize: 13.5, lineHeight: 1.75, marginBottom: 20 }}>
              The future of retail is here. Millions of products, lightning-fast delivery, and a shopping experience built entirely around you.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
              {SOCIAL_ICONS.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  style={{ width: 34, height: 34, borderRadius: 9, background: "#1a2236", border: "1.5px solid #242f45", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", textDecoration: "none", transition: "all .22s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = N; e.currentTarget.style.borderColor = N; e.currentTarget.style.color = "white"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#1a2236"; e.currentTarget.style.borderColor = "#242f45"; e.currentTarget.style.color = "#64748b"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {/* Mini subscribe */}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                placeholder="Your email..."
                style={{ flex: 1, background: "#1a2236", border: "1.5px solid #242f45", color: "white", borderRadius: 9, padding: "9px 12px", fontSize: 12, outline: "none", transition: "border-color .2s" }}
                onFocus={e => e.target.style.borderColor = N}
                onBlur={e => e.target.style.borderColor = "#242f45"}
              />
              <button
                style={{ padding: "9px 14px", borderRadius: 9, border: "none", background: N, color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0, transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = NL}
                onMouseLeave={e => e.currentTarget.style.background = N}
              >Subscribe</button>
            </div>
          </div>

          {/* Columns 2–5 — Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <FooterLinkCol key={title} title={title} links={links} />
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: "1px solid #1a2236", paddingTop: 22, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <p style={{ color: "#475569", fontSize: 12 }}>
            © 2025 ShopHub. All rights reserved. Made with ♥ for great shopping.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "#475569", fontSize: 11, marginRight: 4 }}>We accept:</span>
            {PAYMENT_METHODS.map(method => (
              <div key={method}
                style={{ background: "#1a2236", border: "1px solid #242f45", borderRadius: 7, padding: "4px 10px", color: "#94a3b8", fontSize: 11, fontWeight: 600, transition: "all .2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = N; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#242f45"; e.currentTarget.style.color = "#94a3b8"; }}
              >
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
