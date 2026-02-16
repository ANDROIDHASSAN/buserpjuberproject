# 09_REPORTING_AND_ANALYTICS.md

## Reporting & Analytics Engine

Data-driven insights to help stakeholders manage finances and efficiency.

---

## 1. Collection Reports (Financial)

### Daily Collection
*   **View:** Table of all payments received Today.
*   **Metrics:** Total Cash, Total UPI, Total Cheque.
*   **Action:** "Tally & Close Day" button.

### Monthly/Yearly Collection
*   **Visualization:** Bar Chart (Revenue vs Month).
*   **Breakdown:** By Route (most profitable routes) / By Standard.

### Pending Dues (The Recovery List)
*   **Critical Report:** List of all defaulters sorted by `Amount Desc`.
*   **Actions:** "Bulk WhatsApp Reminder" button from this view.

---

## 2. Operational Reports

### Route-Wise Revenue
*   Metric: `Total Fees from Route` vs `Driver Salary + Fuel`.
*   Insight: Profitability per bus.

### Driver Performance
*   Metrics:
    *   Attendance adherence.
    *   Punctuality score.
    *   Student/Parent complaints logged.

---

## 3. Export Logic

*   **PDF Exports:**
    *   Clean, branded PDFs for official reporting to School Principals.
    *   Uses `jspdf` or server-side Puppeteer generation.
*   **CSV/Excel Exports:**
    *   Raw data dump for accountants.
    *   Columns: Date, ReceiptNo, StudentName, Amount, Mode, UserID.

---

## 4. Data Visualization Plan

*   **Library:** `Recharts` or `Chart.js`.
*   **Dashboard Widgets:**
    1.  **Revenue Donut:** collected vs Pending.
    2.  **Attendance Graph:** Line chart of daily student presence.
    3.  **Stats Cards:** "Total Students", "Active Buses", "Today's Collection".

---

## 5. Summary Emails

*   **Weekly Recap:** Auto-email to Admin every Sunday.
    *   "You collected ₹50,000 this week."
    *   "10 New students added."
    *   "3 Buses required maintenance."
