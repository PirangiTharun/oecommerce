import React from "react";
import { FONT } from "../constants.js";

export default function CartSidebar({ cart, onClose, onRemove, onUpdateQty }) {
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", justifyContent: "flex-end",
    }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }} />
      <div style={{
        position: "relative", width: "min(420px, 95vw)",
        background: "white", height: "100vh",
        boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
        display: "flex", flexDirection: "column",
        animation: "slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{ padding: "28px 28px 20px", borderBottom: "1.5px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontFamily: FONT, fontSize: "20px", fontWeight: 800 }}>
            Your Cart <span style={{ fontSize: "14px", color: "#888", fontWeight: 500 }}>({cart.length} items)</span>
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#666", padding: "4px" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
              <p style={{ fontFamily: FONT, fontSize: "15px" }}>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{
                display: "flex", gap: "14px", padding: "16px 0",
                borderBottom: "1px solid #f5f5f5", alignItems: "center",
              }}>
                {/* Product thumbnail */}
                <div style={{
                  width: "56px", height: "56px", borderRadius: "12px",
                  overflow: "hidden", background: item.bg, flexShrink: 0,
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, fontFamily: FONT, marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                  <div style={{ fontSize: "13px", color: "#888", fontFamily: FONT }}>{item.weight} · ₹{item.price}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                    <button onClick={() => onUpdateQty(item.id, -1)} style={{ width: "26px", height: "26px", borderRadius: "8px", border: "1.5px solid #e5e5e5", background: "white", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#555" }}>−</button>
                    <span style={{ fontSize: "14px", fontWeight: 700, fontFamily: FONT, minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} style={{ width: "26px", height: "26px", borderRadius: "8px", border: "1.5px solid #e5e5e5", background: "white", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#555" }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "16px", fontWeight: 800, fontFamily: FONT, color: "#1a1a1a" }}>₹{item.price * item.qty}</div>
                  <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: "12px", marginTop: "6px", fontFamily: FONT, fontWeight: 600 }}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: "20px 28px 32px", borderTop: "1.5px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px" }}>
              <span style={{ fontSize: "15px", color: "#666", fontFamily: FONT }}>Total</span>
              <span style={{ fontSize: "22px", fontWeight: 800, fontFamily: FONT }}>₹{total}</span>
            </div>
            <button style={{
              width: "100%", background: "#1a1a1a", color: "white",
              border: "none", borderRadius: "14px", padding: "16px",
              fontSize: "15px", fontWeight: 700,
              fontFamily: FONT,
              cursor: "pointer", transition: "all 0.25s",
              letterSpacing: "0.4px",
            }}
              onMouseOver={e => e.currentTarget.style.background = "#333"}
              onMouseOut={e => e.currentTarget.style.background = "#1a1a1a"}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}
