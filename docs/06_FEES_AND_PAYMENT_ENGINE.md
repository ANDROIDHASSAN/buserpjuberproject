# 06_FEES_AND_PAYMENT_ENGINE.md

## Fees & Payment Engine

A robust financial system designed to plug revenue leakage and automate collections.

---

## 1. Fee Structure Logic

*   **Cycle:** June to April (Indian Academic Year).
*   **Configuration:**
    *   Global Default: e.g., ₹1500/month.
    *   Route-based: e.g., Long Route = ₹2000, Short = ₹1000.
    *   Student Specific: Override enabled for Scholarship/siblings.
*   **Opening Balance:** Ability to import "Pending Dues" from previous years.

---

## 2. Payment Status System

Visual indicators for every student:
*   🟢 **PAID:** Balance <= 0.
*   🟠 **PARTIAL:** Balance > 0 but < Monthly Fee.
*   🔴 **PENDING:** Balance >= Monthly Fee.
*   ⚫ **DEFAULTER:** Balance > 3 Months Fee.

---

## 3. The "Record Payment" Flow (Admin Side)

1.  **Select Student:** Search/Select.
2.  **Input Amount:** e.g., ₹5000.
3.  **Mode:** Cash / UPI / Cheque.
4.  **Date:** Defaults to today (Backdating allowed for super-admin).
5.  **Allocation:** System auto-allocates amount to oldest dues first (FIFO - First In First Out).
    *   *Example:* ₹5000 paid. June Pending (1000) + July (1000) + August (1000) + Advance (2000).
6.  **Action:**
    *   Update `student.fees.balance`.
    *   Create `Payment` record.
    *   Generate `Receipt`.
    *   **Trigger WhatsApp Receipt automatically.**

---

## 4. Family Bulk Payment

*   **Feature:** "Pay for All Siblings".
*   **Logic:**
    1.  Parent pays ₹10,000.
    2.  Admin selects "Family Payment".
    3.  System splits amount (User defined or Auto-split equally).
    4.  Generates one linked Receipt showing breakdown per child.

---

## 5. Receipt System

*   **Format:** ID: `REC-{YYYY}-{SEQ}`.
*   **Design:** Professional HTML->PDF template.
    *   School/Operator Logo.
    *   Student Details.
    *   Payment Breakdown.
    *   Remaining Balance (Crucial for psychology).
    *   Signature placeholder.
*   **Delivery:** WhatsApp (Primary), Email (Secondary), SMS (Link).

---

## 6. WhatsApp Integration Implemenation

*   **Provider:** Twilio / WATI / Interakt (Business API).
*   **Triggers:**
    *   `onPaymentSuccess`: "Dear Parent, received ₹X for [Name]. Bal: ₹Y. View Receipt: [Link]"
    *   `onReminder`: "Gentle Reminder: Fees for [Month] are due..."

---

## 7. Ledger & Screenshot Verification

*   **Scanning:** Admin can upload a screenshot of a UPI transaction.
*   **Verification:**
    *   System OCR (Future scope) or Manual verify.
    *   Once verified, it moves from "Unconfirmed" to "Ledger".

---

## 8. Automation

*   **Monthly Demand Generation:**
    *   On 1st of Month: Scheduled Job runs.
    *   Increases `fees.balance` by `monthlyRate` for all Active students.
*   **Auto-Reminders:**
    *   Frequency: 5th, 10th, 15th.
    *   Condition: If `status` != PAID.
    *   Channel: WhatsApp Template Message.

---

## 9. Yearly "Mark All Paid"

*   **Scenario:** School negotiated a lumpsum deal.
*   **Action:** Admin button "Settle Year".
*   **Logic:** Sets Balance = 0, creates a 'zero-value' or 'discount adjustment' record to balance the ledger.
