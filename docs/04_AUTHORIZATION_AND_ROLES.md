# 04_AUTHORIZATION_AND_ROLES.md

## Role-Based Access Control (RBAC) System

This system uses a tiered permission model to ensure security and operational integrity.

---

## 1. Roles & Personas

### 👑 Super Admin (The Owner)
*   **Access:** Full Root Access.
*   **Capabilities:**
    *   Create/Delete Admins.
    *   System Configuration (Year rollover, Global settings).
    *   Access to all financial ledgers.
    *   Hard Delete data.

### 🛡️ Admin (School/Operator Staff)
*   **Access:** Operational Management.
*   **Capabilities:**
    *   Manage Students & Drivers.
    *   Record Payments.
    *   View Reports.
    *   Send Reminders.
    *   *Restriction:* Cannot delete audit logs or change system-wide configs.

### 🚌 Driver / Attendant
*   **Access:** Mobile App (PWA) Restricted View.
*   **Capabilities:**
    *   View *assigned* Route.
    *   Start/Stop Trip.
    *   Mark Pickup/Drop (Attendance).
    *   View Emergency Contacts for bus students.
    *   *Restriction:* No access to financial data or other routes.

### 👨‍👩‍👧 Parent / Student
*   **Access:** Parent Portal / App.
*   **Capabilities:**
    *   View own Child's Real-time Location.
    *   View Fee History & Status.
    *   Download Receipts.
    *   Edit Personal Contact Info.

---

## 2. Multi-Admin Logic

To support the requirement of "3 fixed logins" or similar multi-user setups:
*   **Shared vs Individual:** We recommend individual accounts for audit trails, but the system supports a 'Shared Admin' role if strictly requested.
*   **Concurrency:** Multiple admins can log in simultaneously.
*   **Audit Logging:** Every action (e.g., "Marked Payment") is tagged with `performedBy: userId`.

---

## 3. JWT Flow & Session Handling

### Authentication Flow
1.  **Login:** User sends credentials (Mobile/Password or OTP).
2.  **Verification:** Server validates & generates two tokens:
    *   `AccessToken` (Short-lived, 15 mins) - Sent in JSON Response.
    *   `RefreshToken` (Long-lived, 7 days) - Sent in `HttpOnly` Cookie.
3.  **Client Storage:** AccessToken stored in memory (Zustand store), NOT LocalStorage (to prevent XSS).
4.  **Request mechanism:** `Authorization: Bearer <token>` header attached to API calls via Axios interceptors.

### Session Expiry & Rotation
*   **Silent Refresh:** When AccessToken expires, the frontend quietly hits `/refresh-token` using the Cookie.
*   **Logout:** Clears the Cookie and blacklists the RefreshToken in Redis (or DB).
*   **Force Logout:** Changing password invalidates all existing tokens for that user.

---

## 4. Role Matrix Table

| Feature | Super Admin | Admin | Driver | Parent |
| :--- | :---: | :---: | :---: | :---: |
| **Create Student** | ✅ | ✅ | ❌ | ❌ |
| **Delete Student** | ✅ | ❌ | ❌ | ❌ |
| **Record Fee** | ✅ | ✅ | ❌ | ❌ |
| **View All Routes** | ✅ | ✅ | ❌ | ❌ |
| **Start Trip** | ✅ | ✅ | ✅ | ❌ |
| **Track Bus** | ✅ | ✅ | ❌ | ✅ |
| **System Settings**| ✅ | ❌ | ❌ | ❌ |

---

## 5. Security Middlewares

```javascript
// Middleware Example
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

// Usage
router.delete('/student/:id', authorize(['superadmin']), deleteStudent);
```
