# 08_UI_UX_SYSTEM.md

## UI/UX Design System

Our design philosophy is **"Clarity over Complexity."** The interface must be usable by a non-technical bus operator or a grandparent.

---

## 1. Design Philosophy: "5-Year-Old Friendly"

*   **Big Buttons:** Touch targets > 48px.
*   **Less Text, More Icons:** Use visual cues for actions.
*   **One Action Per Screen:** Don't clutter forms. Wizard-style flows for complex tasks.
*   **Instant Feedback:** Every click provides visual confirmation (Ripple effect, checkmarks, toasts).

---

## 2. Color System (Semantic Meaning)

We adhere strictly to a semantic color code to reduce cognitive load.

| Color | Meaning | Usage |
| :--- | :--- | :--- |
| **Emerald Green** | Success / Good | `Paid`, `Boarded`, `On Time`, `Active` |
| **Rose Red** | Danger / Alert | `Pending`, `Absent`, `Late`, `Error`, `Delete` |
| **Amber Orange** | Warning / Parsial | `Partial Payment`, `Due Soon`, `Maintenance` |
| **Sky Blue** | Info / Action | `Edit`, `View Details`, `Links`, `Primary Buttons` |
| **Slate Grey** | Neutral / Inactive | `Archived`, `Placeholder text`, `Disabled` |

---

## 3. Typography System

*   **Font Family:** `Inter` or `Nunito` (Google Fonts) - Clean, rounded, highly legible.
*   **Hierarchy:**
    *   `h1`: Page Titles (24px, Bold)
    *   `h2`: Section Headers (20px, SemiBold)
    *   `h3`: Card Titles (18px, Medium)
    *   `p`: Body text (16px, Regular) - *Never smaller than 14px for accessibility.*

---

## 4. Navigation Strategy

*   **Desktop:** Sidebar Navigation (Collapsible). Text + Icons.
*   **Mobile:** Bottom Tab Bar (Driver/Parent App) for mostly used actions (Home, Scan, Profile).
*   **Icon Set:** `Lucide React` or `Heroicons` (Outline style for UI, Solid for active states).

---

## 5. Accessibility & Multilingual Support

*   **Language Toggle:** A prominent switch in the top bar (English / Hindi / Marathi).
*   **Implementation:** `i18next` library.
*   **Dynamic Labels:**
    *   EN: "Record Payment"
    *   HI: "भुगतान दर्ज करें"
*   **Dark Mode:** Auto-detect system preference. Crucial for Drivers using the app at night/early morning to reduce glare.

---

## 6. Feedback & Empty States

*   **Loading:** Skeleton screens (Shimmer effect) instead of spinners.
*   **Empty States:** Never show a blank whitespace.
    *   *Example:* No Students found? Show an illustration and a button "Add your first student".
*   **Error Patterns:**
    *   Form validation inline (Red border + text).
    *   Network error: "No Internet" banner (Orange) with "Retry" button.

---

## 7. Onboarding Tutorial

*   **Walkthrough:** First login shows a 3-step tour.
*   **Coach Marks:** Spotlight effect highlighting key buttons ("Click here to add a route").
