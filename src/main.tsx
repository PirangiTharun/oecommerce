import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import "./styles.css";

// Always scroll to top on every navigation, prevent browser scroll restoration
window.history.scrollRestoration = "manual";
router.subscribe("onResolved", () => {
  window.scrollTo(0, 0);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
