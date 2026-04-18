import React from "react";
import { FONT } from "../constants.js";

export default function CartIcon({ count, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", background: "none", border: "none", cursor: "pointer",
      padding: "8px", display: "flex", alignItems: "center", gap: "6px",
      color: "#1a1a1a", fontFamily: FONT,
      fontSize: "15px", fontWeight: 600, transition: "all 0.2s",
    }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {count > 0 && (
        <span style={{
          position: "absolute", top: "2px", right: "2px",
          background: "#16A34A", color: "white", borderRadius: "50%",
          width: "18px", height: "18px", fontSize: "11px", fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: FONT, lineHeight: 1,
        }}>{count}</span>
      )}
    </button>
  );
}
