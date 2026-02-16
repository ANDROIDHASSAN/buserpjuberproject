# 10_DEPLOYMENT_AND_PRODUCTION_GUIDE.md

## Deployment & DevOps Guide

Standards for deploying, securing, and maintaining the production environment on Render.

---

## 1. Environment Variables (.env)

Securely managed in Render Dashboard.

```bash
# Server Configuration
PORT=4000
NODE_ENV=production
CLIENT_URL=https://app.schoolbus.com

# Database
MONGODB_URI=mongodb+srv://... (Connection String)

# Security
JWT_SECRET=complex_random_string_min_32_chars
JWT_REFRESH_SECRET=another_complex_string

# External Services
WHATSAPP_API_KEY=key_from_provider
WHATSAPP_PHONE_NUMBER_ID=id_from_meta
AWS_ACCESS_KEY_ID=... (For S3 Image uploads)
AWS_SECRET_ACCESS_KEY=...
```

---

## 2. Render Deployment Steps

### Backend (Node Service)
1.  **Type:** Web Service.
2.  **Repo:** Connect GitHub.
3.  **Build Command:** `npm install && npm run build` (if TS) or `npm install`.
4.  **Start Command:** `node dist/index.js` or `npm start`.
5.  **Health Check Path:** `/health`.

### Frontend (Static Site)
1.  **Type:** Static Site.
2.  **Build Command:** `npm install && npm run build`.
3.  **Publish Directory:** `dist`.
4.  **Rewrite Rules:** Source `/*` -> Destination `/index.html` (For SPA Routing).

---

## 3. Production Optimizations

*   **Compression:** Enable Gzip/Brotli on Express (`app.use(compression())`).
*   **Database Connection:** Use Connection Pooling in Mongoose.
    ```javascript
    mongoose.connect(URI, { maxPoolSize: 10 });
    ```
*   **Logging:** Use `Winston` or `Morgan`. Log to file/stream, not just console.
    *   Error Logs -> Alert Admin.

---

## 4. Backup Strategy (MongoDB Atlas)

*   **Automated Backups:** Enable Cloud Provider Snapshots (Daily).
*   **Retention:** 7 Days daily, 4 Weeks weekly.
*   **Point-in-Time Recovery:** Enabled for critical errors.

---

## 5. Cron Jobs & Scheduler

Render "Cron Jobs" or internal `node-cron`:
1.  `0 0 1 * *`: **Fee Demand Gen** (1st of Month).
2.  `0 9 5 * *`: **Reminder 1** (5th of Month).
3.  `0 0 * * 0`: **Weekly DB Cleanup/Analyze**.

---

## 6. Monitoring & Alerts

*   **Uptime:** UptimeRobot targeting `/health` endpoint.
*   **Performance:** MongoDB Atlas Metrics (CPU/Connection usage).
*   **Error Tracking:** Sentry.io integration in both Frontend and Backend for real-time crash reporting.

---

## 7. Future Scalability Checks

*   **When to Scale:**
    *   API Response time > 300ms consistently.
    *   RAM usage > 80%.
*   **Action:** Increase Render Plan type or spawn more instances behind Load Balancer.
