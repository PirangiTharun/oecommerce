# Statement of Work (SoW)
## Phyto Health Organics — E-Commerce Platform

**Project:** Phyto Health Organics Online Shop  
**Type:** Full-Stack E-Commerce Web Application  
**Prepared:** April 2026  
**Delivery Timeline:** 45 days from the date of agreement signing  

---

## 1. Project Overview

Phyto Health Organics is a premium organic powders brand based in Hyderabad, India. This SoW defines the scope of work to build a complete, production-ready e-commerce platform on top of the existing React/Vite prototype, covering a **User-facing Storefront** and a **Admin Dashboard**.

### Current State (Already Built)
| Feature | Status |
|---|---|
| Product listing with category filters & search | ✅ Done |
| Product detail page | ✅ Done |
| Cart — add / update qty / remove | ✅ Done |
| Cart sidebar with toast notifications | ✅ Done |
| Basic routing (React Router DOM) | ✅ Done |

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router DOM |
| Backend | Java Spring Boot REST API |
| Server | AWS EC2 |
| Database | AWS RDS (PostgreSQL) |
| File Storage | AWS S3 (product images, report exports) |
| Auth | JWT-based authentication |
| Payments | Cashfree (INR support, UPI, cards, net banking) |
| Transactional Email | AWS SES (order confirmation emails to users) |
| Admin Alerts | Slack Incoming Webhook (new-order notifications to admin channel) |
| Hosting | AWS EC2 (Nginx — serves React build + reverse proxies Spring Boot API) |
| DNS | Hostinger (domain: phytohealthorganics.com) → AWS EC2 |
| Analytics | PostHog or custom analytics on RDS |

> **Note:** Backend API will be hosted on an AWS EC2 instance with PostgreSQL on AWS RDS. Frontend remains on the existing React/Vite stack.

---

## 3. Scope of Work

### 3.1 User Dashboard (Storefront)

#### Module 1 — Authentication
- Sign up / Sign in via **Google OAuth** and **Email + Password**
- Email verification flow
- Forgot password / reset password
- Persist auth session across page reloads
- Protected routes (cart, orders, profile require login)

#### Module 2 — Product Listing (Enhancement)
- **Existing:** Category filters, keyword search ✅
- Price range filter (slider)
- Sort by: Price Low–High, High–Low, Newest, Best Rated
- Paginated or infinite-scroll product grid

#### Module 3 — Product Detail Page (Enhancement)
- **Existing:** Product detail view ✅
- Customer **reviews section** — display average rating, star breakdown, review list
- Submit a review (authenticated users only) — star rating + text + optional photo
- Related / recommended products section

#### Module 4 — Cart & Pincode Check (Enhancement)
- **Existing:** Add / subtract / remove items ✅
- Pincode input field → estimated delivery date lookup (via static table or postal API)
- Cart persistence (localStorage for guests, PostgreSQL (RDS) for logged-in users)

#### Module 5 — Checkout & Payment
- Order summary page before payment
- Shipping address form (auto-fill from saved profile)
- Integration with **Cashfree** payment gateway
- **On success:** clear cart, generate order record, redirect to order confirmation page
- **On failure:** persist cart, show retry option with failure reason
- **Guest Checkout** — allow checkout without account; prompt to create account post-order with email pre-filled
- **Refunds via Cashfree:** when an order is cancelled (by user before shipment) or a return is approved (by admin), a refund is initiated programmatically via the Cashfree Refunds API from Spring Boot; refund amount and status are stored in the order record; user is notified by email once the refund is processed; refund timelines follow Cashfree's standard SLA (typically 5–7 business days)
- **Order Placed — User Email (via AWS SES):** transactional email sent to the user's registered/entered email containing order ID, itemised summary, total amount, and estimated delivery info
- **Order Placed — Admin Slack Alert (via Slack Incoming Webhook):** a message posted to the designated admin Slack channel with customer name, order ID, total amount, and item count; triggered server-side from Spring Boot so no webhook URL is exposed in the client bundle

#### Module 6 — Orders
- **Orders list page** — all past orders with status badges (Placed, Processing, Shipped, Delivered, Cancelled, Refund Initiated, Refunded)
- **Order detail page** — itemised breakdown, shipping address, payment method, tracking info placeholder
- **Order cancellation by user** — user can cancel an order only while it is in *Placed* or *Processing* status; once the order moves to *Shipped* the cancel option is hidden and a return must be raised instead; on cancellation the order status updates to *Cancelled*, a Cashfree refund is initiated automatically (for paid orders), and a cancellation confirmation email is sent to the user
- **Return request** — user can raise a return request on a *Delivered* order within a configurable window (e.g. 7 days); request captures reason and optional photo; admin reviews and approves/rejects via Module 14; on approval a Cashfree refund is triggered
- Reorder button (adds items back to cart)
- **(Optional) Invoice / Receipt PDF download** — a downloadable PDF invoice per order, generated server-side (Spring Boot), containing order ID, date, itemised list, GST breakdown, and delivery address; available from the order detail page

#### Module 7 — Profile Page
- View and edit: Full name, phone number, email (read-only if Google login)
- Manage saved delivery addresses (add / edit / delete, set default)
- Change password (email login only)
- Account deletion option

#### Module 8 — Static Pages
- **About Us** — brand story, farm origin (Hyderabad), certifications, team
- **Contact Us** — contact form (name, email, message) → email notification to admin
- **Feedback** — structured feedback form with rating and category tags

#### Module 9 — Home Page Enhancements
- **Reviews Carousel** — curated best reviews displayed as a carousel/slider on the home page
- Featured / bestseller product section
- SEO meta tags (title, description, OG tags) per page

---

### 3.2 Admin Dashboard

**Access:** `/admin` route — protected, role-based (admin role stored in RDS, enforced via JWT middleware)

#### Module 10 — Product Management
- **Add product** — form with all fields (name, category, price, original price, weight, description, key features, uses, benefits, specs, images)
- **Edit product** — pre-filled form with same fields
- **Delete product** — soft delete with confirmation dialog
- **Preview** — live preview panel showing the exact product detail page layout before saving
- **Stock management** — each product has a stock quantity field in the database; admin can update stock levels from the product edit form; stock decrements automatically when an order is placed and restores if the order is cancelled or return is approved; storefront shows an **Out of Stock** badge and disables the Add to Cart button when stock reaches 0; a **Low Stock** warning badge (configurable threshold, default ≤ 10 units) is shown on product cards in the admin dashboard

#### Module 11 — Discount & Promotions
- Create / edit / delete discount rules
- Discount types:
  - **Category-wide** — apply % or flat discount to an entire category
  - **Multi-select** — select multiple individual products and apply one discount
  - **Individual product** — per-product price override or percentage
- Set validity dates (start / end) for time-limited offers
- Active discount badge shown on product cards in storefront

#### Module 12 — Analytics
- Dashboard overview cards: Total revenue, Total orders, Active users, Conversion rate
- Revenue chart (daily / weekly / monthly toggle)
- Top-selling products table
- User acquisition sources (Google, Direct, Referral)
- Cart abandonment rate
- Powered by PostHog or custom queries on RDS

#### Module 13 — Report Generation
- Generate and download reports as **CSV / PDF**:
  - Sales report (by date range)
  - Product performance report
  - Customer list report
  - Order status report
- Scheduled report emails (optional / phase 2)

#### Module 14 — Order Management (Admin)
- **Recent Orders panel** on the admin dashboard home — latest 10 orders with customer name, order ID, total, and status badge
- **All orders table** — paginated, filterable by status (Placed, Processing, Shipped, Delivered, Cancelled) and date range, searchable by customer name / order ID
- **Order detail view** — full breakdown: customer info, delivery address, itemised cart, payment method, and current status
- **Status update** — admin can advance or cancel an order status; each change is recorded in the Audit Log (Module 15)
- **Return request management** — admin can view pending return requests, approve or reject them with a reason, and trigger refund via Cashfree on approval

#### Module 15 — Audit Logs
- Immutable log of all admin actions with timestamp, actor email, and action detail
- Actions logged: product created/updated/deleted, discount created/updated/deleted, order status changed, user role changed
- Searchable and filterable log table (by date, actor, action type)
- Export audit log as CSV

---

## 4. Out of Scope (Unless Agreed Separately)

- Mobile app (iOS / Android)
- Multi-vendor / marketplace features
- Inventory / warehouse management system
- ERP / accounting software integration
- Physical POS integration
- Multilingual / i18n support
- Subscriptions or recurring orders
- Loyalty / rewards points system
- Automated email marketing campaigns
- Scheduled report emails (deferred to Phase 2)

---

## 5. Deliverables

| # | Deliverable |
|---|---|
| 1 | Deployed production at **phytohealthorganics.com** (AWS EC2 via Nginx) |
| 2 | Source code repository (GitHub) with README |
| 3 | AWS EC2 + RDS setup, environment configuration, and S3 bucket for file storage |
| 4 | Cashfree integration with test & live key configuration guide |
| 5 | Admin account setup and onboarding guide |
| 6 | Basic CI/CD pipeline (GitHub Actions → auto deploy on merge to main) |

---

## 6. Assumptions

1. Client will provide Cashfree account credentials and complete KYC.
2. Client will provide brand assets: logo (SVG), brand colours, and any photography.
3. Product data migration from the current static `products.js` file to PostgreSQL (RDS) is in scope.
4. Pincode-to-delivery-date mapping will initially use a static lookup table provided by the client.
5. The platform targets Indian customers (INR currency, Indian phone numbers, Indian pincodes).
6. Legal pages (Privacy Policy, Terms & Conditions, Refund Policy) content will be provided by the client; development will only handle the page layout.
7. Admin users will be manually provisioned (no self-serve admin signup).

---

## ❓ Open Questions (Require Client Decision)

| # | Question | Options |
|---|----------|---------|
| 1 | **Cash on Delivery (COD)** — Should COD be offered as a payment option? Cashfree supports COD natively. COD orders increase reach (especially for first-time buyers in India) but introduce non-payment risk and require manual cash reconciliation on delivery. | **Yes — include COD** / **No — online payments only** |

---

## 7. Phases & High-Level Milestone Order

```
Phase 1 — Foundation
  └─ Backend setup (EC2 + RDS), Spring Boot REST API, Auth (JWT), protected routes, product data migration

Phase 2 — Core Commerce
  └─ Reviews, Pincode check, Checkout, Cashfree payment, Guest checkout

Phase 3 — User Account
  └─ Orders page, Order detail, Profile page

Phase 4 — Admin Dashboard
  └─ Product CRUD + preview, Discount engine, Order Management (recent orders panel, status updates)

Phase 5 — Analytics & Operations
  └─ Analytics, Report generation, Audit logs

Phase 6 — Polish & Launch
  └─ Home page enhancements (carousel, featured), Static pages, SEO, CI/CD, UAT
```

---

## 8. Acceptance Criteria

- All listed features functional and tested across Chrome, Firefox, and Safari (desktop + mobile responsive)
- Cashfree test-mode end-to-end checkout verified
- Admin routes inaccessible to non-admin authenticated users
- Lighthouse performance score ≥ 80 on mobile for product listing page
- No critical security issues (JWT secrets secured, RDS not publicly exposed, no API keys in client bundle)

---

*This SoW is subject to change upon mutual agreement. Any additions to scope will be handled via a Change Request.*
