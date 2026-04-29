import React from "react";

export default function Logo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Phyto Health Organics logo"
    >
      {/* Outer circle badge */}
      <circle cx="24" cy="24" r="23" fill="#DCFCE7" />
      <circle cx="24" cy="24" r="23" stroke="#16A34A" strokeWidth="1.5" fill="none" />

      {/* Mortar bowl */}
      <path d="M15 30 Q15 36 24 36 Q33 36 33 30 L31 27 L17 27 Z" fill="#16A34A" opacity="0.85" />
      {/* Mortar rim */}
      <rect x="14" y="25.5" width="20" height="3" rx="1.5" fill="#16A34A" />

      {/* Left leaf sprouting */}
      <path d="M22 26 C20 22 14 20 13 15 C16 14 21 17 22 23" fill="#4ADE80" stroke="#16A34A" strokeWidth="0.6" />
      {/* Centre leaf */}
      <path d="M23 24 C22 18 18 13 20 9 C24 10 26 16 24 23" fill="#16A34A" stroke="#166534" strokeWidth="0.6" />
      {/* Right leaf */}
      <path d="M25 24 C27 19 34 17 35 12 C32 11 26 15 25 23" fill="#4ADE80" stroke="#16A34A" strokeWidth="0.6" />

      {/* Stem */}
      <line x1="24" y1="26" x2="24" y2="22" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
