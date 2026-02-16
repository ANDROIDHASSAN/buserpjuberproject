# 02_SYSTEM_ARCHITECTURE.md

## 1. High-Level Architecture

Our architecture is designed for **high availability, horizontal scalability, and offline tolerance**. We follow a **Micro-Service inspired Monolith** approach initially to keep development velocity high while maintaining modular boundaries for future splitting.

### Diagrammatic Overview (Conceptual)
`[Client Apps (PWA/Web)]` <--> `[Load Balancer (Render)]` <--> `[API Server (Node/Express)]` <--> `[Database (MongoDB Atlas)]`
                                      ^
                                      |
                                  `[Services: Auth, Notification, Payment]`

---

## 2. Frontend Architecture (PWA)

*   **Framework:** React 18+ with TypeScript.
*   **State Management:** Zustand (for lightweight, atomic global state) + React Query (TanStack Query) for server state caching and optimistic updates.
*   **PWA Logic:** Service Workers for offline capabilities (crucial for Driver app).
*   **UI Library:** Tailwind CSS + Radix UI (headless primitives) for a custom, accessible design system.
*   **Build Tool:** Vite for fast HMR and optimized production builds.
*   **Router:** React Router v6.

### Mobile-First Strategy
The "Driver App" and "Parent App" views are optimized for mobile viewports using CSS Grid/Flexbox and touch-friendly targets (44px+).

---

## 3. Backend Architecture (Node.js + Express)

*   **Runtime:** Node.js (Latest LTS).
*   **Framework:** Express.js with a structured MVC+Service pattern.
*   **Structure:**
    *   `controllers/`: Request handling and validation.
    *   `services/`: Business logic (reusable, independent of HTTP layer).
    *   `models/`: Mongoose schemas.
    *   `utils/`: Helper functions (PDF generation, Formatting).
    *   `middlewares/`: Auth check, Error handling, Logging.
    *   `jobs/`: Cron jobs for reminders and reports.
*   **Validation:** Zod (runtime schema validation for inputs).

---

## 4. Database Design Philosophy (MongoDB)

*   **NoSQL Flexibility:** Utilizing MongoDB's document model to handle varying student data and logs without rigid migrations.
*   **Schema Design:**
    *   **Embedding vs Referencing:**
        *   *Embed* frequently accessed, low-cardinality data (e.g., student emergency contacts).
        *   *Reference* high-cardinality links (e.g., Students -> Routes, Payments -> Students).
*   **Indexing:** Heavy indexing on `studentId`, `routeId`, `mobileNumber`, and `date` fields for fast query performance.

---

## 5. Security Architecture

*   **Authentication:** JWT (JSON Web Tokens) with short expiry + Refresh Tokens (HttpOnly cookies).
*   **Encryption:** `bcrypt` for password hashing.
*   **Data Transport:** TLS 1.2+ for all data in transit.
*   **Input Sanitization:** Protection against NoSQL Injection and XSS headers via Helmet.
*   **Rate Limiting:** IP-based rate limiting on API endpoints (login, OTP) to prevent abuse.

---

## 6. Access Control (RBAC)

We implement a strict Role-Based Access Control system.
*   **Middleware:** `authorize(['admin', 'driver'])` ensures only permitted roles reach specific endpoints.
*   **Context:** `req.user` payload determines data scoping (e.g., A driver only sees *their* route).

---

## 7. API Design Standards

*   **RESTful Principles:** Standard HTTP methods (GET, POST, PUT, DELETE).
*   **Response Format:**
    ```json
    {
      "success": true,
      "data": { ... },
      "message": "Operation successful",
      "timestamp": "ISO-8601"
    }
    ```
*   **Versioning:** `/api/v1/...` to support future non-breaking changes.
*   **Pagination:** Cursor-based or Offset-based pagination for large lists (Students, Logs).

---

## 8. Deployment Strategy (Render)

*   **CI/CD:** Auto-deploy from GitHub main branch.
*   **Environment:** Dockerized container (optional) or Native Node environment on Render.
*   **Database:** MongoDB Atlas (M0/M10 cluster) connected via VPC peering if possible, or standard secure connection string.
*   **Static Assets:** Served via CDN or Nginx layer (handled by Render).

---

## 9. Scalability Plan

*   **Vertical Scaling:** Upgrade Render instance RAM/CPU as user base grows.
*   **Horizontal Scaling:** Introduce a Load Balancer and spin up multiple Node instances (Stateless API allows this).
*   **Database:** Sharding MongoDB collections (e.g., Logs) when exceeding 1TB data.
*   **Caching:** Redis implementation for session storage and frequently accessed read-data (e.g., Route details).
