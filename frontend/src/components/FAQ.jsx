import { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const N = "#355872", CY = "#06b6d4";
const ORANGE = "#f97316";

const FAQS = [
  {
    question: "How does shipping and delivery work?",
    answer: "We offer Standard (3–5 days), Express (1–2 days), and Same-Day delivery in select cities. All orders over $50 qualify for free shipping with real-time tracking from dispatch to your door.",
  },
  {
    question: "What is your return policy?",
    answer: "We have a 30-day no-hassle return policy. Just initiate a return from your account dashboard and we'll arrange free doorstep pickup. Refunds are processed in 3–5 business days to your original payment method.",
  },
  {
    question: "Is my payment information safe?",
    answer: "Absolutely. We use AES-256 encryption and are PCI DSS Level 1 certified — the highest standard in card security. We never store raw card numbers on our servers; every transaction is fully tokenised.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We deliver to 120+ countries worldwide. International shipping takes 7–21 business days depending on your destination and the service tier you select at checkout.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships you'll receive a tracking number by email. You can also track any order in real-time directly from the 'My Orders' section of your account — no extra app needed.",
  },
];

/* ── Accordion Item (shadcn/ui-style) ── */
function AccordionItem({ faq, index, activeIndex, setActiveIndex }) {
  const isOpen = activeIndex === index;
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      style={{
        borderRadius: 20,
        background: "white",
        overflow: "hidden",
        marginBottom: 12,
        border: `2px solid ${isOpen ? ORANGE : "#e8edf2"}`,
        boxShadow: isOpen ? `0 8px 32px rgba(249,115,22,.14), 0 2px 8px rgba(0,0,0,.04)` : "0 1px 4px rgba(0,0,0,.04)",
        transition: "border-color .3s, box-shadow .3s",
      }}
    >
      {/* Trigger */}
      <button
        onClick={() => setActiveIndex(isOpen ? null : index)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        aria-expanded={isOpen}
      >
        {/* Number badge */}
        <span style={{
          width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 800,
          background: isOpen ? ORANGE : "#f1f5f9",
          color: isOpen ? "white" : "#94a3b8",
          transition: "all .3s",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span style={{
          flex: 1, fontWeight: 700, fontSize: 15,
          color: isOpen ? "#0f172a" : "#334155",
          transition: "color .2s",
        }}>
          {faq.question}
        </span>

        {/* Chevron */}
        <ChevronDown
          size={20}
          style={{
            flexShrink: 0,
            color: isOpen ? ORANGE : "#94a3b8",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .36s, color .3s",
          }}
        />
      </button>

      {/* Content — smooth height */}
      <div style={{
        maxHeight: isOpen ? contentHeight + "px" : "0px",
        overflow: "hidden",
        transition: "max-height .42s cubic-bezier(.4,0,.2,1)",
      }}>
        <div ref={contentRef} style={{ padding: "0 24px 22px 68px" }}>
          <div style={{ height: 1, background: "#f1f5f9", marginBottom: 14 }} />
          <p style={{ color: "#64748b", fontSize: 14.5, lineHeight: 1.78, margin: 0 }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ Section ── */
export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0); // first item open

  return (
    <section id="faq" style={{ background: "#f8fafc", padding: "100px 0", position: "relative", overflow: "hidden" }}>

      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, opacity: .025, backgroundImage: `linear-gradient(${N} 1px,transparent 1px), linear-gradient(90deg,${N} 1px,transparent 1px)`, backgroundSize: "44px 44px", pointerEvents: "none" }} />

      {/* Right glow */}
      <div style={{ position: "absolute", right: -100, top: "50%", transform: "translateY(-50%)", width: 440, height: 440, borderRadius: "50%", background: `radial-gradient(circle, ${ORANGE}18, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${N}0f`, border: `1.5px solid ${N}28`, borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
            <HelpCircle size={12} style={{ color: N }} />
            <span style={{ color: N, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em" }}>FAQs</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, marginBottom: 16, letterSpacing: "-1px" }}>
            Got{" "}
            <span style={{ background: `linear-gradient(135deg, ${N}, ${CY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Questions?
            </span>
          </h2>
          <p style={{ color: "#64748b", fontSize: 18, lineHeight: 1.65 }}>
            We have clear, honest answers to everything you might wonder about.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              index={i}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>

        {/* Support note */}
        <div style={{ marginTop: 36, padding: "22px 28px", borderRadius: 20, border: "2px dashed #d1dae3", background: "white", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: 14.5, margin: 0 }}>
            Still have questions?{" "}
            <a href="#cta" style={{ color: N, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
              Talk to our support team
            </a>
            {" "}— we respond in under 2 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
