# 03_DATABASE_SCHEMA.md

## MongoDB Schema Design

This document outlines the core collections, field definitions, and relationships for the SaaS platform.

---

### 1. `users` (Admins & Staff)
Authentication and role management.
*   `_id`: ObjectId
*   `name`: String
*   `email`: String (Unique, sparse)
*   `password`: String (Hashed)
*   `role`: Enum ['superadmin', 'admin', 'staff']
*   `permissions`: String[] (Granular capability flags)
*   `createdAt`: Date

### 2. `drivers`
Bus drivers and attendants.
*   `_id`: ObjectId
*   `name`: String
*   `mobileNumber`: String (Unique, indexed)
*   `licenseNumber`: String
*   `vehicleNumber`: String (Bus registration)
*   `routeId`: ObjectId (Ref: routes) -> Active route assignment
*   `isActive`: Boolean
*   `upiId`: String (For salary/expense handling)
*   `photoUrl`: String

### 3. `families`
Grouping siblings for consolidated billing and communication.
*   `_id`: ObjectId
*   `fatherName`: String
*   `motherName`: String
*   `primaryMobile`: String (Unique index - Login ID)
*   `secondaryMobile`: String
*   `address`: String
*   `whatsappConsent`: Boolean

### 4. `students`
The core entity.
*   `_id`: ObjectId
*   `firstName`: String
*   `lastName`: String
*   `familyId`: ObjectId (Ref: families)
*   `rollId`: String (School Roll No)
*   `class`: String
*   `division`: String
*   `academicYear`: String (e.g., "2025-2026")
*   `routeId`: ObjectId (Ref: routes)
*   `pickupPoint`: String
*   `dropPoint`: String
*   `fees`: {
      `monthlyAmount`: Number,
      `yearlyTotal`: Number,
      `balance`: Number,
      `lastPaymentDate`: Date
    }
*   `status`: Enum ['active', 'archived', 'suspended']
*   `profilePicUrl`: String

### 5. `routes`
Bus routes and paths.
*   `_id`: ObjectId
*   `name`: String (e.g., "Route 5 - Market Yard")
*   `driverId`: ObjectId (Ref: drivers)
*   `vehicleNumber`: String
*   `stops`: [
      {
         `stopName`: String,
         `lat`: Number,
         `lng`: Number,
         `arrivalTime`: String
      }
    ]
*   `capacity`: Number

### 6. `payments`
Transaction ledger.
*   `_id`: ObjectId
*   `studentId`: ObjectId (Ref: students)
*   `familyId`: ObjectId (Ref: families)
*   `amount`: Number
*   `date`: Date
*   `method`: Enum ['cash', 'upi', 'neft', 'cheque']
*   `transactionId`: String (Optional)
*   `status`: Enum ['completed', 'failed', 'pending']
*   `monthPaidFor`: String (e.g., "June 2025")
*   `receiptUrl`: String (PDF link)

### 7. `receipts` (Meta-data for generated PDFs)
*   `_id`: ObjectId
*   `paymentId`: ObjectId
*   `receiptNumber`: String (Sequential: "INV-2025-001")
*   `generatedAt`: Date
*   `sentTo`: String (Mobile Number)

### 8. `trips` (Daily Logs)
Live tracking data.
*   `_id`: ObjectId
*   `routeId`: ObjectId
*   `driverId`: ObjectId
*   `date`: Date
*   `startTime`: Date
*   `endTime`: Date
*   `events`: [
      {
         `type`: 'pickup' | 'drop',
         `studentId`: ObjectId,
         `timestamp`: Date,
         `location`: { lat, lng }
      }
    ]

### 9. `reminders`
Automated system queues.
*   `_id`: ObjectId
*   `type`: Enum ['fee_due', 'bus_delay', 'custom']
*   `targetAudience`: Object (Filter criteria)
*   `scheduledFor`: Date
*   `status`: Enum ['pending', 'sent', 'failed']

### 10. `academicYears`
System configuration for year transitions.
*   `_id`: ObjectId
*   `name`: String (e.g., "2025-2026")
*   `startDate`: Date
*   `endDate`: Date
*   `isActive`: Boolean

---

## Indexing Strategy

*   `db.students.createIndex({ familyId: 1 })` - Fast family lookup.
*   `db.students.createIndex({ routeId: 1 })` - Route lists.
*   `db.students.createIndex({ "fees.balance": 1 })` - Finding defaulters.
*   `db.payments.createIndex({ date: -1 })` - Recent transaction history.
*   `db.trips.createIndex({ date: 1, routeId: 1 })` - Daily reports.

---

## Data Validation

*   **Phone Numbers:** Must be 10 digits (Region: IND).
*   **Currency:** Positive integers/floats only.
*   **Unique Constraints:** `drivers.mobileNumber`, `families.primaryMobile`, `students.rollId` (scoped to Year).
