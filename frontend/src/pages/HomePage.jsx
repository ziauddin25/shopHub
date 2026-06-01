// ─────────────────────────────────────────────
//  App.jsx — Root component
//  Imports all section components from separate files
// ─────────────────────────────────────────────
import Navbar       from "../components/Navbar";
import Hero         from "../components/Hero";
import FeaturesSection from "../components/Features";
import FAQSection   from "../components/FAQ";
import CTASection   from "../components/CTA";
import Footer       from "../components/Footer";
import { ProductsSection } from "./ProductsPage";
import CartPage from "./CartPage";

export default function App() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", width: '100%' }}>
      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: white;
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        input::placeholder { color: rgba(255,255,255,.38); }

        /* ── Keyframe Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px);   }
          50%      { transform: translateY(-11px);  }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%      { opacity: .55; transform: scale(1.15); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* ── Responsive Breakpoints ── */

        /* Tablet — features 2 cols */
        @media (max-width: 1024px) {
          .feat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          /* Hide desktop nav, show hamburger */
          .nav-links   { display: none !important; }
          .nav-actions { display: none !important; }
          .hamburger   { display: flex !important; }

          /* Hero: stack vertically */
          .hero-grid   { grid-template-columns: 1fr !important; }

          /* Stats: 2 cols on mobile */
          .stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }

          /* Features: 1 col on mobile */
          .feat-grid   { grid-template-columns: 1fr !important; }

          /* Footer: stack */
          .footer-grid { flex-direction: column !important; }

          /* CTA form: stack */
          .cta-form    { flex-direction: column !important; }
        }
      `}</style>

      {/* ── Section Components ── */}
      <Navbar />
      <Hero />
      <ProductsSection />
      <FeaturesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
