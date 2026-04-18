import React, { useState, useCallback } from "react";
import { Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";
import products from "./data/products.js";
import { categoryColors, FONT, FONT_BRAND } from "./constants.js";
import CartIcon from "./components/CartIcon.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Toast from "./components/Toast.jsx";

const CATEGORIES = ["All", "Vegetable", "Fruit", "Flower", "Superfood"];

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Shared cart state lives here and is passed down
function useCartState() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const handleRemoveFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const handleUpdateQty = useCallback((id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
    );
  }, []);

  return { cart, cartOpen, setCartOpen, toastMsg, handleAddToCart, handleRemoveFromCart, handleUpdateQty };
}

const navStyle = {
  position: "sticky", top: 0, zIndex: 100,
  background: "rgba(255,255,255,0.96)", backdropFilter: "blur(14px)",
  borderBottom: "1.5px solid #f0f0f0",
  padding: "0 clamp(16px, 4vw, 48px)",
  display: "flex", alignItems: "center", justifyContent: "space-between",
  height: "68px",
};

const brandStyle = {
  fontFamily: FONT_BRAND, fontSize: "22px", fontWeight: 800,
  letterSpacing: "-0.5px", color: "#1a1a1a",
};

function ShopPage({ cart, cartOpen, setCartOpen, toastMsg, handleAddToCart, handleRemoveFromCart, handleUpdateQty }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const isInCart = (id) => cart.some(i => i.id === id);

  const filtered = products.filter(p => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: FONT }}>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "26px" }}>🌿</span>
          <span style={brandStyle}>XYZ <span style={{ color: "#16A34A" }}>Farms</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#888", fontWeight: 500, fontFamily: FONT }}>
            Premium Natural Powders
          </span>
          <CartIcon count={cartCount} onClick={() => setCartOpen(true)} />
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 40%, #FEF9C3 100%)",
        padding: "72px clamp(16px, 4vw, 48px) 64px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "#16A34A15", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "250px", height: "250px", background: "#EAB30815", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{
            background: "#DCFCE7", color: "#16A34A",
            fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", padding: "5px 14px", borderRadius: "30px",
            display: "inline-block", marginBottom: "18px", fontFamily: FONT,
          }}>100% Organic · Chemical-Free · Export Grade</span>
          <h1 style={{
            margin: "0 0 16px",
            fontSize: "clamp(34px, 6vw, 64px)",
            fontFamily: FONT_BRAND, fontWeight: 900, color: "#1a1a1a",
            lineHeight: 1.07, letterSpacing: "-1px",
          }}>
            Nature's Finest,<br />
            <span style={{ color: "#16A34A" }}>Powdered Perfectly</span>
          </h1>
          <p style={{ margin: "0 auto 32px", maxWidth: "560px", fontSize: "17px", color: "#555", lineHeight: 1.75, fontWeight: 400, fontFamily: FONT }}>
            Premium organic powders from Gauribidanur — preserving the natural colour, flavour, and nutritional value of every ingredient.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            {["🌿 Vegetable", "🍊 Fruit", "🌸 Flower", "🌊 Superfood"].map(tag => (
              <span key={tag} style={{
                background: "white", borderRadius: "30px", padding: "8px 18px",
                fontSize: "13px", fontWeight: 600, color: "#444",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)", fontFamily: FONT,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FILTERS + SEARCH */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "32px clamp(16px, 4vw, 32px) 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "16px",
      }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: "9px 20px", borderRadius: "30px",
              border: "1.5px solid",
              borderColor: filter === cat ? "#1a1a1a" : "#e0e0e0",
              background: filter === cat ? "#1a1a1a" : "white",
              color: filter === cat ? "white" : "#555",
              fontSize: "13.5px", fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s", fontFamily: FONT,
            }}>{cat}</button>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <input
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "10px 16px 10px 40px",
              border: "1.5px solid #e0e0e0", borderRadius: "30px",
              fontSize: "13.5px", outline: "none", width: "220px",
              fontFamily: FONT, background: "white", color: "#333",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "#16A34A"}
            onBlur={e => e.target.style.borderColor = "#e0e0e0"}
          />
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", opacity: 0.5 }}>🔍</span>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px clamp(16px, 4vw, 32px) 64px" }}>
        <p style={{ color: "#888", fontSize: "13px", marginBottom: "20px", fontWeight: 500, fontFamily: FONT }}>
          Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          {filter !== "All" ? ` in ${filter}` : ""}
          {search ? ` for "${search}"` : ""}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={(p) => { navigate(`/product/${toSlug(p.name)}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onAddToCart={handleAddToCart}
              isInCart={isInCart(product.id)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌱</div>
            <p style={{ fontSize: "16px", fontWeight: 500, fontFamily: FONT }}>No products found. Try a different search.</p>
          </div>
        )}
      </div>

      <footer style={{ background: "#1a1a1a", color: "#aaa", padding: "40px clamp(16px, 4vw, 48px)", textAlign: "center" }}>
        <div style={{ fontFamily: FONT_BRAND, fontSize: "20px", color: "white", fontWeight: 700, marginBottom: "8px" }}>
          🌿 XYZ <span style={{ color: "#4ADE80" }}>Farms</span>
        </div>
        <p style={{ margin: "0 0 4px", fontSize: "13px", fontFamily: FONT }}>Premium Natural Powders · Gauribidanur, Karnataka, India</p>
        <p style={{ margin: 0, fontSize: "13px", fontFamily: FONT }}>📞 +91 XXXXX XXXXX · ✉ info@xyzfarms.com</p>
      </footer>

      {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onRemove={handleRemoveFromCart} onUpdateQty={handleUpdateQty} />}
      {toastMsg && <Toast msg={toastMsg} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}

function ProductPage({ cart, cartOpen, setCartOpen, toastMsg, handleAddToCart, handleRemoveFromCart, handleUpdateQty }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => toSlug(p.name) === slug);
  if (!product) return <Navigate to="/" replace />;

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const isInCart = cart.some(i => i.id === product.id);

  return (
    <>
      <nav style={{ ...navStyle, height: "64px" }}>
        <span style={brandStyle}>XYZ <span style={{ color: "#16A34A" }}>Farms</span></span>
        <CartIcon count={cartCount} onClick={() => setCartOpen(true)} />
      </nav>
      <ProductDetail
        product={product}
        onBack={() => navigate(-1)}
        onAddToCart={handleAddToCart}
        isInCart={isInCart}
      />
      {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onRemove={handleRemoveFromCart} onUpdateQty={handleUpdateQty} />}
      {toastMsg && <Toast msg={toastMsg} />}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </>
  );
}

export default function App() {
  const cartState = useCartState();

  return (
    <Routes>
      <Route path="/" element={<ShopPage {...cartState} />} />
      <Route path="/product/:slug" element={<ProductPage {...cartState} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

