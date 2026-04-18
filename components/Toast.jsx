import React from "react";
import { FONT } from "../constants.js";

export default function Toast({ msg }) {
  return (
    <div style={{
      position: "fixed", bottom: "28px", left: "50%",
      transform: "translateX(-50%)",
      background: "#1a1a1a", color: "white",
      padding: "12px 24px", borderRadius: "30px",
      fontSize: "14px", fontWeight: 600,
      fontFamily: FONT,
      boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      zIndex: 9999,
      animation: "toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      ✓ {msg}
      <style>{`@keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`}</style>
    </div>
  );
}
