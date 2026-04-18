import React, { useState } from "react";
import { categoryColors, FONT } from "../constants.js";

const TABS = [
  { id: "benefits", label: "Benefits" },
  { id: "uses", label: "Uses" },
  { id: "features", label: "Key Features" },
  { id: "specs", label: "Specifications" },
];

export default function ProductDetail({ product, onBack, onAddToCart, isInCart }) {
  const [activeTab, setActiveTab] = useState("benefits");
  const [imgError, setImgError] = useState(false);
  const cat = categoryColors[product.category];
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const showEmoji = !product.image || imgError;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: FONT, animation: "pageEnter 0.38s cubic-bezier(0.22,1,0.36,1) both" }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${product.bg} 0%, ${product.color}14 60%, white 100%)`,
        padding: "clamp(24px, 5vw, 48px) 0 clamp(32px, 5vw, 56px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "260px", height: "260px",
          background: product.color + "10",
          borderRadius: "50%",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" }}>
          <button
            onClick={onBack}
            style={{
              background: "white", border: "1.5px solid #e5e5e5",
              borderRadius: "30px", padding: "8px 18px",
              fontSize: "13px", fontWeight: 600,
              fontFamily: FONT,
              cursor: "pointer", color: "#444",
              display: "flex", alignItems: "center", gap: "6px",
              marginBottom: "clamp(20px, 4vw, 40px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            ← Back to Shop
          </button>

          {/* Two-column layout: stacks on mobile */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(24px, 5vw, 56px)",
            flexWrap: "wrap",
          }}>
            {/* Product Image / Emoji */}
            <div style={{
              width: "clamp(260px, 40vw, 420px)",
              maxWidth: "100%",
              flexShrink: 0,
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 12px 48px rgba(0,0,0,0.13)",
              background: showEmoji
                ? `linear-gradient(135deg, ${product.bg} 0%, ${product.color}33 100%)`
                : product.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "4 / 3",
              position: "relative",
              animation: "slideUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s both",
            }}>
              {showEmoji ? (
                <span style={{
                  fontSize: "clamp(80px, 18vw, 140px)",
                  lineHeight: 1,
                  display: "block",
                  animation: "floatEmoji 3.5s ease-in-out infinite",
                  filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.10))",
                }}>
                  {product.emoji}
                </span>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
                    display: "block",
                  }}
                />
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: "min(280px, 100%)", animation: "slideUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}>
              <span style={{
                background: cat.light, color: cat.accent,
                fontSize: "11px", fontWeight: 700,
                letterSpacing: "1.5px", textTransform: "uppercase",
                padding: "4px 12px", borderRadius: "30px",
                fontFamily: FONT,
              }}>{cat.label} Powder</span>

              <h1 style={{
                margin: "14px 0 4px",
                fontSize: "clamp(24px, 5vw, 46px)",
                fontFamily: FONT,
                fontWeight: 800, color: "#1a1a1a", lineHeight: 1.1,
              }}>{product.name}</h1>

              <p style={{ margin: "0 0 16px", fontSize: "14px", color: product.color, fontWeight: 700 }}>
                {product.tagline}
              </p>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>
                  ₹{product.price}
                </span>
                <span style={{ fontSize: "16px", color: "#aaa", textDecoration: "line-through" }}>
                  ₹{product.originalPrice}
                </span>
                <span style={{
                  background: "#16A34A", color: "white",
                  fontSize: "12px", fontWeight: 700,
                  padding: "3px 9px", borderRadius: "8px",
                }}>{discount}% OFF</span>
              </div>

              <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#888" }}>
                Weight: <strong style={{ color: "#444" }}>{product.weight}</strong>
              </p>

              <p style={{ margin: "0 0 24px", fontSize: "14px", color: "#555", lineHeight: 1.75, maxWidth: "520px" }}>
                {product.description}
              </p>

              <button
                onClick={() => onAddToCart(product)}
                style={{
                  background: isInCart ? "#16A34A" : "#1a1a1a",
                  color: "white", border: "none",
                  borderRadius: "14px",
                  padding: "clamp(11px,2vw,14px) clamp(24px,4vw,36px)",
                  fontSize: "clamp(13px,2vw,15px)", fontWeight: 700,
                  fontFamily: FONT,
                  cursor: "pointer",
                  boxShadow: isInCart ? "0 4px 20px #16A34A55" : "0 4px 20px rgba(0,0,0,0.2)",
                  width: "100%",
                  maxWidth: "320px",
                }}
              >
                {isInCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: "8px", marginTop: "18px", flexWrap: "wrap" }}>
                {["100% Natural", "No Preservatives", "Export Grade"].map(badge => (
                  <span key={badge} style={{
                    fontSize: "11px", fontWeight: 600, color: "#16A34A",
                    background: "#DCFCE7", padding: "4px 10px", borderRadius: "20px",
                  }}>✓ {badge}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(24px,4vw,48px) clamp(16px,4vw,32px) 64px" }}>
        {/* Tab bar — scrollable on mobile */}
        <div style={{
          display: "flex",
          marginBottom: "28px",
          background: "white",
          borderRadius: "16px",
          padding: "5px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          gap: "4px",
          scrollbarWidth: "none",
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: "1 0 auto",
                padding: "10px 14px",
                border: "none", borderRadius: "12px",
                background: activeTab === tab.id ? product.color : "transparent",
                color: activeTab === tab.id ? "white" : "#666",
                fontSize: "13px", fontWeight: 700,
                cursor: "pointer", transition: "all 0.25s",
                fontFamily: FONT,
                whiteSpace: "nowrap",
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* Benefits */}
        {activeTab === "benefits" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px,100%), 1fr))", gap: "16px", animation: "tabFade 0.25s ease both" }}>
            {product.benefits.map((item, i) => (
              <div key={i} style={{
                background: "white", borderRadius: "16px", padding: "20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                borderLeft: `4px solid ${product.color}`,
              }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", marginBottom: "7px" }}>{item.title}</div>
                <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* Uses */}
        {activeTab === "uses" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px,100%), 1fr))", gap: "16px", animation: "tabFade 0.25s ease both" }}>
            {product.uses.map((item, i) => (
              <div key={i} style={{
                background: "white", borderRadius: "16px", padding: "20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                borderTop: `4px solid ${product.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "10px",
                    background: product.bg, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "14px", fontWeight: 700,
                    color: product.color, flexShrink: 0,
                  }}>{i + 1}</div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1a1a1a" }}>{item.title}</div>
                </div>
                <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* Key Features */}
        {activeTab === "features" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px,100%), 1fr))", gap: "16px", animation: "tabFade 0.25s ease both" }}>
            {product.keyFeatures.map((item, i) => (
              <div key={i} style={{
                background: product.bg, borderRadius: "16px", padding: "20px",
                border: `1.5px solid ${product.color}33`,
              }}>
                <div style={{ fontSize: "13.5px", fontWeight: 700, color: product.color, marginBottom: "8px" }}>✦ {item.title}</div>
                <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* Specifications */}
        {activeTab === "specs" && (
          <div style={{ background: "white", borderRadius: "20px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", overflow: "hidden", animation: "tabFade 0.25s ease both" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1.5px solid #f0f0f0" }}>
              <h2 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#1a1a1a" }}>Product Specifications</h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "300px" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "13px 24px", color: "#888", fontWeight: 600, fontSize: "13px", background: "#fafafa", width: "40%", whiteSpace: "nowrap" }}>Product Name</td>
                    <td style={{ padding: "13px 24px", color: "#1a1a1a", fontSize: "13px" }}>{product.name}</td>
                  </tr>
                  {product.specs.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                      <td style={{ padding: "13px 24px", color: "#888", fontWeight: 600, fontSize: "13px", background: "#fafafa", whiteSpace: "nowrap" }}>{row.label}</td>
                      <td style={{ padding: "13px 24px", color: "#1a1a1a", fontSize: "13px" }}>{row.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: "13px 24px", color: "#888", fontWeight: 600, fontSize: "13px", background: "#fafafa", whiteSpace: "nowrap" }}>Brand Name</td>
                    <td style={{ padding: "13px 24px", color: "#1a1a1a", fontSize: "13px" }}>XYZ Farms</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{
              margin: "20px 24px 24px",
              background: "#FFF9E6",
              border: "1.5px solid #F59E0B44",
              borderRadius: "12px",
              padding: "13px 16px",
              fontSize: "12.5px",
              color: "#92400E",
              lineHeight: 1.65,
            }}>
              <strong>CAUTION:</strong> This product is intended for external purposes unless stated otherwise.
              Keep out of reach of children. Avoid direct contact with eyes. Store in a cool, dry place away from direct sunlight.
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tabFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatEmoji {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-14px) rotate(-4deg); }
        }
      `}</style>
    </div>
  );
}
