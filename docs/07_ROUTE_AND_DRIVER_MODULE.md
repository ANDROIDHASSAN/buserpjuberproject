# 07_ROUTE_AND_DRIVER_MODULE.md

## Route & Driver Management

Managing the logistics, assets, and human resources of the transport operation.

---

## 1. Route Creation & Optimization

*   **Route Entity:**
    *   Name (e.g., "R1 - North Zone")
    *   Start Point / End Point.
    *   Stops Ordering.
*   **Student Mapping:**
    *   Visual or list-based assignment.
    *   "Drag and Drop" students into routes.
*   **Capacity Handling:**
    *   Bus Capacity: e.g., 40 Seats.
    *   Current Load: Real-time count of assigned students.
    *   Warning System: Alert if `Assigned > Capacity`.

---

## 2. Driver Onboarding

*   **Profile:**
    *   Photo (Webcam capture).
    *   License Scans (Upload).
    *   Phone Number (Login ID).
*   **UPI ID Handling:**
    *   Store Driver's UPI QR code / VPA.
    *   Use Case: Admin can pay Fuel Allowance or Salary directly to this ID.

---

## 3. The Driver App (PWA)

A simplified interface for the conductor/driver.

### Features:
1.  **Today's Trip:**
    *   "Start Trip" button.
    *   List of Stops in order.
    *   List of Students per stop.
2.  **Attendance:**
    *   Tap student name to toggle: `Boarded` (Green) / `Absent` (Red) / `Pending` (Grey).
    *   Auto-trigger WhatsApp to parent upon 'Boarded'/'Dropped'.
3.  **Navigation:**
    *   "Navigate to Next Stop" button (Opens Google Maps).

---

## 4. Transfer & Substitution

*   **Driver Transfer:**
    *   Scenario: Regular driver is sick.
    *   Action: Admin assigns "Substitute Driver" to "Route 5" for "Today".
    *   Effect: Driver App for Substitute shows Route 5 data immediately.
*   **Student Route Transfer:**
    *   Scenario: Student moved house.
    *   Action: Reassign Route ID.
    *   Effect: Fee updates (if applicable), Driver lists update.

---

## 5. Route Dashboard (Admin View)

*   **Live Map:** (Future integration with Hardware GPS).
*   **Status List:**
    *   Route 1: 🟢 On Time
    *   Route 2: 🟡 Delayed
    *   Route 3: 🔴 Not Started
*   **Utilization:** "Route 1 is 40% empty" -> Suggest merging with Route 2.

---

## 6. Reports

*   **Fuel Logs:** Driver inputs odometer + fuel cost.
*   **Attendance Reports:** "Which students are frequently absent?"
*   **Punctuality:** Driver start/end time analytics.

---

## 7. Driver-Specific Reminders

*   **License Expiry:** System alerts Admin 30 days before driver license expires.
*   **Maintenance:** Alert based on KMs driven (e.g., "Oil Change due").
