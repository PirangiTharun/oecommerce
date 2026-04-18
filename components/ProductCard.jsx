import React, { useState } from "react";
import { categoryColors, FONT } from "../constants.js";

export default function ProductCard({ product, onView, onAddToCart, isInCart }) {
  const [hover, setHover] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cat = categoryColors[product.category];
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const showEmoji = !product.image || imgError;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: hover ? "0 20px 60px rgba(0,0,0,0.13)" : "0 4px 20px rgba(0,0,0,0.06)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        border: "1.5px solid",
        borderColor: hover ? product.color + "55" : "#f0f0f0",
        fontFamily: FONT,
      }}
    >
      {/* Image / Emoji area */}
      <div
        onClick={() => onView(product)}
        style={{
          position: "relative",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          background: showEmoji
            ? `linear-gradient(135deg, ${product.bg} 0%, ${product.color}33 100%)`
            : product.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showEmoji ? (
          <span style={{
            fontSize: "80px",
            lineHeight: 1,
            display: "block",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.10))",
            transform: hover ? "scale(1.12) rotate(-5deg)" : "scale(1) rotate(0deg)",
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            animation: "floatEmoji 3.5s ease-in-out infinite",
          }}>
            {product.emoji}
          </span>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              transform: hover ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.45s ease",
              display: "block",
              position: "absolute",
              inset: 0,
            }}
          />
        )}

        {/* Category badge */}
        <span style={{
          position: "absolute",
          bottom: "10px",
          left: "12px",
          background: cat.light,
          color: cat.accent,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          padding: "3px 10px",
          borderRadius: "30px",
          fontFamily: FONT,
        }}>{cat.label}</span>

        {/* Discount badge */}
        <span style={{
          position: "absolute",
          top: "10px",
          right: "12px",
          background: "#16A34A",
          color: "white",
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 8px",
          borderRadius: "8px",
          fontFamily: FONT,
        }}>{discount}% OFF</span>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <h3
          onClick={() => onView(product)}
          style={{
            margin: 0,
            fontSize: "15px",
            fontFamily: FONT,
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.3,
          }}>{product.name}</h3>
        <p style={{
          margin: 0,
          fontSize: "12px",
          color: product.color,
          fontFamily: FONT,
          fontWeight: 600,
        }}>{product.tagline}</p>
        <p style={{
          margin: 0,
          fontSize: "12.5px",
          color: "#666",
          fontFamily: FONT,
          lineHeight: 1.55,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{product.description}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px", gap: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <span style={{ fontSize: "18px", fontWeight: 800, fontFamily: FONT, color: "#1a1a1a", lineHeight: 1 }}>
              ₹{product.price}
            </span>
            <span style={{ fontSize: "11px", color: "#aaa", fontFamily: FONT, textDecoration: "line-through" }}>
              ₹{product.originalPrice} / {product.weight}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            style={{
              background: isInCart ? "#16A34A" : "#1a1a1a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "9px 14px",
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: FONT,
              cursor: "pointer",
              transition: "all 0.25s",
              whiteSpace: "nowrap",
            }}
          >
            {isInCart ? "✓ Added" : "+ Cart"}
          </button>
        </div>
      </div>
      <style>{`@keyframes floatEmoji { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-4deg)} }`}</style>
    </div>
  );
}
