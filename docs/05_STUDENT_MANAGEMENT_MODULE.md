# 05_STUDENT_MANAGEMENT_MODULE.md

## Student Management Module

The heart of the SaaS. This module handles the lifecycle of a student within the transportation system.

---

## 1. Add Student Flow

1.  **Input Form:**
    *   Personal Details (Name, DOB, Gender, Class, Division).
    *   Family Mapping:
        *   *Search Existing Family:* By Mobile Number (Auto-fill address & parents).
        *   *Create New Family:* If number not found.
    *   Route Assignment: Select Route -> Select Stop (Auto-populates pickup/drop time).
    *   Fee Setup: Select Fee Plan (Monthly/Yearly/Custom).
2.  **Validation:** Check for duplicate Roll No in the same class.
3.  **Action:** Creates `Student` record and updates `Route` capacity count.
4.  **Notification:** Welcome WhatsApp message sent to Parent with Login credentials.

---

## 2. Edit/Delete Logic

### Edit
*   **Trigger:** Admin updates address or Route.
*   **Impact:** If Route changes, recalculate fees (if route-based pricing applies) and update Driver's list.

### Delete (Soft Delete)
*   **Logic:** We never truly delete data to preserve financial history.
*   **Action:** Set `status: 'archived'`.
*   **Impact:** Removes student from Active Route lists and Payment Due lists.

---

## 3. Academic Year Handling & Promotion

*   **Year Rollover:** A dedicated tool to promote students.
*   **Bulk Action:** "Promote Class 5 to Class 6".
*   **Logic:**
    *   Increment Class.
    *   Reset `fees.paid` and `fees.balance`.
    *   Archive graduated students (Class 10/12 -> Alumni).
    *   Retain family links.

---

## 4. Family & Group Linking

*   **Concept:** Siblings share the same `FamilyID`.
*   **Benefit:** Parents login once to see all children.
*   **Billing:** "Family Balance" view allows paying for all kids in one transaction.

---

## 5. Search & Filters (The "Finder")

*   **Global Search Bar:** Supports Name, Mobile, Student ID, or Vehicle Number.
*   **Filters:**
    *   By Route ("Show all students on Route 5")
    *   By Fee Status ("Show all Pending > ₹5000")
    *   By Class/Division.
    *   By Stop.

---

## 6. Archive Handling

*   **UseCase:** Student leaves school mid-year.
*   **Process:**
    1.  Admin marks as 'Left'.
    2.  Reason recorded (Transfer/Expulsion).
    3.  System prompts to clear pending dues.
    4.  Student moved to `archived` state (hidden by default in lists).

---

## 7. Edge Cases & Error Handling

*   **Route Full:** Prevent assignment if Route Capacity is reached (Admin override allowed with warning).
*   **Duplicate Mobile:** Alert if a new family uses an existing mobile number (suggest merging).
*   **Stop Not Found:** If a student's address is far from route stops, flag as "Custom Pickup" requiring Driver confirmation.

---

## 8. Data Integrity

*   **Constraint:** A student cannot exist without a Family link.
*   **Constraint:** A student cannot be in two routes simultaneously (unless Morning/Evening routes differ - *Advanced Feature*).
