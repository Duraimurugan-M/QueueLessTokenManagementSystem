🧪 QUEUELESS - COMPLETE API VERIFICATION GUIDE
==============================================

This guide will verify ALL backend APIs in the correct sequence after the optimization changes.

⚠️ IMPORTANT: Make sure backend is running on http://localhost:5000
Use Postman or Thunder Client for testing

═══════════════════════════════════════════════════════════════════════════════

PHASE 1: SETUP - Create Department & Doctor
═════════════════════════════════════════════

📍 STEP 1: Create Department (ENT)
═════════════════════════════════════

Endpoint: POST http://localhost:5000/api/md/department
Headers: Content-Type: application/json

JSON Data:
```json
{
  "name": "ENT"
}
```

Expected Response (201 Created):
```json
{
  "message": "Department created successfully",
  "department": {
    "_id": "123abc...",
    "name": "ENT",
    "createdAt": "2026-02-11T..."
  }
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 201
  ☐ Department _id received (save this for next steps!)
  ☐ Name matches: "ENT"

💾 SAVE THIS: departmentId = "..." (from _id)

Error Cases to Test:
  • Empty name: {} → Should return 400 "Department name is required"
  • Duplicate name: Send same again → Should return 409 "Department already exists"

───────────────────────────────────────────────────────────────────────────────

📍 STEP 2: Create Doctor for ENT Department
════════════════════════════════════════════════

Endpoint: POST http://localhost:5000/api/md/doctor
Headers: Content-Type: application/json

JSON Data:
```json
{
  "name": "Dr. Rajeesh Kumar",
  "mobile": "9876543210",
  "password": "Doctor@123",
  "departmentId": "PASTE_DEPARTMENT_ID_HERE",
  "specialization": "ENT Specialist"
}
```

Expected Response (201 Created):
```json
{
  "message": "Doctor created successfully",
  "doctor": {
    "_id": "doctor123...",
    "user": "user456...",
    "department": "dept789...",
    "specialization": "ENT Specialist"
  }
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 201
  ☐ Doctor _id received
  ☐ User _id received (this is the doctor's user account)
  ☐ Department matches ENT

💾 SAVE THESE:
  doctorId = "..." (from doctor._id)
  doctorUserId = "..." (from doctor.user)

Error Cases to Test:
  • Missing fields: {} → Should return 400
  • Invalid department: "invalid_id" → Should return 404 "Department not found"
  • Duplicate mobile: → Should return 409 "Mobile already registered"

───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════

PHASE 2: AUTHENTICATION - Patient & Doctor Login
══════════════════════════════════════════════════

📍 STEP 3: Patient Signup (Register)
═══════════════════════════════════════

Endpoint: POST http://localhost:5000/api/auth/register
Headers: Content-Type: application/json

JSON Data:
```json
{
  "name": "Ramesh Sharma",
  "mobile": "9988776655",
  "password": "Patient@123",
  "age": 35
}
```

Expected Response (201 Created):
```json
{
  "message": "Patient registered successfully",
  "userId": "patient123..."
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 201
  ☐ User ID received
  ☐ Age validation working (mandatory for patient)

💾 SAVE THIS:
  patientUserId = "..." (from userId)

Error Cases to Test:
  • Missing age: {} → Should return 400 "Age is required and must be between 1-150"
  • Invalid age: age: 0 or 200 → Should return 400
  • Duplicate mobile: → Should return 409 "Mobile number already registered"

───────────────────────────────────────────────────────────────────────────────

📍 STEP 4: Patient Login (with Mobile) ✨ NEW FEATURE
═══════════════════════════════════════════════════════

Endpoint: POST http://localhost:5000/api/auth/login
Headers: Content-Type: application/json

JSON Data:
```json
{
  "mobile": "9988776655",
  "password": "Patient@123"
}
```

Expected Response (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "PATIENT"
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ JWT token received
  ☐ Role: "PATIENT"
  ☐ Token is not empty and starts with "eyJ..."

💾 SAVE THIS:
  patientToken = "..." (from token - use for all patient API calls)

Error Cases to Test:
  • Wrong password: → Should return 401 "Invalid credentials"
  • Non-existent mobile: → Should return 401 "Invalid credentials"

───────────────────────────────────────────────────────────────────────────────

📍 STEP 5: Doctor Login (with Email) ✨ NEW FEATURE
════════════════════════════════════════════════════

Endpoint: POST http://localhost:5000/api/auth/login
Headers: Content-Type: application/json

Note: Doctor doesn't have email in our case, so login with mobile instead

JSON Data:
```json
{
  "mobile": "9876543210",
  "password": "Doctor@123"
}
```

Expected Response (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "DOCTOR"
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ JWT token received
  ☐ Role: "DOCTOR"

💾 SAVE THIS:
  doctorToken = "..." (from token - use for all doctor API calls)

───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════

PHASE 3: SCHEDULING - Create Doctor Schedule ✨ DATE TYPE CHANGE
═════════════════════════════════════════════════════════════════

📍 STEP 6: Create Schedule for Doctor
═══════════════════════════════════════

Endpoint: POST http://localhost:5000/api/doctor/schedule
Headers: 
  - Content-Type: application/json
  - Authorization: Bearer PASTE_DOCTOR_TOKEN_HERE

JSON Data:
```json
{
  "date": "2026-02-12",
  "startTime": "09:00",
  "endTime": "17:00",
  "breakStart": "13:00",
  "breakEnd": "14:00",
  "slotDuration": 30,
  "maxTokens": 8
}
```

Expected Response (201 Created):
```json
{
  "message": "Schedule created successfully",
  "schedule": {
    "_id": "schedule123...",
    "doctor": "doctor_id...",
    "date": "2026-02-12T00:00:00.000Z",
    "startTime": "09:00",
    "endTime": "17:00",
    "slots": [
      {
        "_id": "slot1...",
        "start": "09:00",
        "end": "09:30",
        "status": "AVAILABLE",
        "tokenNumber": 1
      },
      ...more slots...
    ]
  }
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 201
  ☐ Schedule _id received
  ☐ Date field is ISODate format (NOT string!) ← NEW FEATURE
  ☐ Slots array created (should be 16 slots: 8 hours with 30-min breaks)
  ☐ Each slot has: start, end, status: "AVAILABLE", tokenNumber

💾 SAVE THIS:
  scheduleId = "..." (from schedule._id)

Error Cases to Test:
  • Unauthorized (no token): → Should return 401 "Unauthorized"
  • Missing date: {} → Should return 400 "All schedule fields are required"
  • Duplicate schedule same day: → Should return 409 "Schedule already exists"

───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════

PHASE 4: PATIENT - View Slots & Book Token
═════════════════════════════════════════════

📍 STEP 7: Get Available Slots
════════════════════════════════

Endpoint: GET http://localhost:5000/api/patient/slots?doctorId=DOCTOR_ID&date=2026-02-12
Headers:
  - Authorization: Bearer PASTE_PATIENT_TOKEN_HERE

Note: doctorId is the doctor's _id from the Doctor model, not the user ID

Expected Response (200 OK):
```json
[
  {
    "_id": "slot1...",
    "start": "09:00",
    "end": "09:30",
    "status": "AVAILABLE",
    "tokenNumber": 1
  },
  {
    "_id": "slot2...",
    "start": "09:30",
    "end": "10:00",
    "status": "AVAILABLE",
    "tokenNumber": 2
  },
  ...more available slots...
]
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ Array of slots returned
  ☐ All slots have status: "AVAILABLE"
  ☐ Each slot has tokenNumber (sequential)

💾 SAVE THIS:
  slotId = "..." (from first available slot's _id)

Error Cases to Test:
  • Invalid date format: date=invalid → Should return 400 "Invalid date format"
  • Missing parameters: → Should return 400 "Doctor ID and date are required"
  • No schedule for date: → Should return 404 "No schedule found"

───────────────────────────────────────────────────────────────────────────────

📍 STEP 8: Book Token (Patient Books Appointment)
═══════════════════════════════════════════════════

Endpoint: POST http://localhost:5000/api/patient/book-token
Headers:
  - Content-Type: application/json
  - Authorization: Bearer PASTE_PATIENT_TOKEN_HERE

JSON Data:
```json
{
  "scheduleId": "PASTE_SCHEDULE_ID_HERE",
  "slotId": "PASTE_SLOT_ID_HERE",
  "name": "Ramesh Sharma",
  "age": 35,
  "dob": "1990-05-15",
  "reason": "Regular checkup"
}
```

Expected Response (201 Created):
```json
{
  "message": "Token booked successfully",
  "token": {
    "_id": "token123...",
    "schedule": "schedule_id...",
    "doctor": "doctor_id...",
    "patient": "patient_user_id...",
    "tokenNumber": 1,
    "slotTime": "09:00 - 09:30",
    "status": "BOOKED",
    "patientDetails": {
      "name": "Ramesh Sharma",
      "age": 35,
      "dob": "1990-05-15",
      "reason": "Regular checkup"
    },
    "createdAt": "2026-02-11T..."
  }
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 201
  ☐ Token _id received
  ☐ Status: "BOOKED"
  ☐ Token number matches slot
  ☐ SlotTime formatted correctly
  ☐ Patient details saved

💾 SAVE THIS:
  tokenId = "..." (from token._id)

Error Cases to Test:
  • Missing fields: {} → Should return 400 "Schedule, slot, name, and age are required"
  • Unauthorized: no token → Should return 401
  • Slot already booked: book same slot twice → Should return 409 "Slot is no longer available"

───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════

PHASE 5: DOCTOR - View Queue & Update Token Status
═════════════════════════════════════════════════════

📍 STEP 9: Get Doctor's Queue (Today's Appointments)
══════════════════════════════════════════════════════

Endpoint: GET http://localhost:5000/api/doctor/queue
Headers:
  - Authorization: Bearer PASTE_DOCTOR_TOKEN_HERE

Expected Response (200 OK):
```json
[
  {
    "_id": "token123...",
    "tokenNumber": 1,
    "slotTime": "09:00 - 09:30",
    "status": "BOOKED",
    "schedule": "schedule_id...",
    "doctor": "doctor_id...",
    "patient": {
      "_id": "patient_id...",
      "name": "Ramesh Sharma",
      "mobile": "9988776655"
    },
    "patientDetails": {
      "name": "Ramesh Sharma",
      "age": 35,
      "reason": "Regular checkup"
    },
    "createdAt": "2026-02-11T..."
  }
]
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ Array of tokens returned
  ☐ Token status: "BOOKED"
  ☐ Patient details populated
  ☐ Sorted by tokenNumber

Error Cases to Test:
  • Unauthorized: no token → Should return 401
  • Invalid doctor: → Should return 404 "Doctor profile not found"

───────────────────────────────────────────────────────────────────────────────

📍 STEP 10: Update Token Status (Mark as COMPLETED)
═════════════════════════════════════════════════════

Endpoint: PUT http://localhost:5000/api/doctor/token/PASTE_TOKEN_ID_HERE/status
Headers:
  - Content-Type: application/json
  - Authorization: Bearer PASTE_DOCTOR_TOKEN_HERE

JSON Data:
```json
{
  "status": "COMPLETED"
}
```

Expected Response (200 OK):
```json
{
  "message": "Token updated successfully",
  "token": {
    "_id": "token123...",
    "status": "COMPLETED",
    "tokenNumber": 1,
    ...other fields...
  }
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ Token status changed to: "COMPLETED"
  ☐ Slot status also updated in Schedule

Error Cases to Test:
  • Invalid status: status: "INVALID" → Should return 400 "Invalid status"
  • Non-existent token: → Should return 404 "Token not found"
  • Unauthorized: → Should return 401

───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════

PHASE 6: PRESCRIPTION - Doctor Creates Prescription
═════════════════════════════════════════════════════

📍 STEP 11: Create Prescription
═════════════════════════════════

Endpoint: POST http://localhost:5000/api/prescription
Headers:
  - Content-Type: application/json
  - Authorization: Bearer PASTE_DOCTOR_TOKEN_HERE

JSON Data:
```json
{
  "tokenId": "PASTE_TOKEN_ID_HERE",
  "diagnosisNotes": "Common cold with mild fever. Advised rest and fluids.",
  "medicines": [
    {
      "name": "Crocin 650mg",
      "timing": "Twice daily",
      "foodInstruction": "Take with food",
      "sideEffects": "May cause drowsiness in some patients"
    },
    {
      "name": "Azithromycin 500mg",
      "timing": "Once daily",
      "foodInstruction": "Take on empty stomach",
      "sideEffects": "Nausea, abdominal pain"
    }
  ]
}
```

Expected Response (201 Created):
```json
{
  "message": "Prescription created successfully",
  "prescription": {
    "_id": "prescription123...",
    "patient": "patient_user_id...",
    "doctor": "doctor_id...",
    "token": "token_id...",
    "diagnosisNotes": "Common cold with mild fever...",
    "medicines": [
      {
        "name": "Crocin 650mg",
        "timing": "Twice daily",
        "foodInstruction": "Take with food",
        "sideEffects": "May cause drowsiness in some patients"
      },
      ...more medicines...
    ],
    "createdAt": "2026-02-11T..."
  }
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 201
  ☐ Prescription _id received
  ☐ All medicines saved with sideEffects
  ☐ Diagnosis notes saved
  ☐ Token and Doctor linked correctly

💾 SAVE THIS:
  prescriptionId = "..." (from prescription._id)

Error Cases to Test:
  • Missing medicines: {} → Should return 400 "At least one medicine is required"
  • Medicine without sideEffects: → Should return 400 "Each medicine must have... sideEffects"
  • Token not COMPLETED: → Should return 400 "Prescription allowed only after consultation is completed"
  • Duplicate prescription for same token: → Should return 409 "Prescription already exists"

───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════

PHASE 7: PATIENT DASHBOARD - View History & Download Prescription
════════════════════════════════════════════════════════════════════

📍 STEP 12: Get Visit History (Patient Dashboard) ✨ N+1 QUERY FIX
═════════════════════════════════════════════════════════════════

Endpoint: GET http://localhost:5000/api/patient/visits
Headers:
  - Authorization: Bearer PASTE_PATIENT_TOKEN_HERE

Expected Response (200 OK):
```json
{
  "message": "Patient visit history fetched successfully",
  "visits": [
    {
      "visitId": "token123...",
      "tokenNumber": 1,
      "slotTime": "09:00 - 09:30",
      "status": "COMPLETED",
      "date": "2026-02-11T09:00:00.000Z",
      "doctor": "Dr. Rajeesh Kumar",
      "department": "ENT",
      "prescriptionId": "prescription123..."
    }
  ]
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ Visits array returned
  ☐ Each visit has: tokenNumber, slotTime, status, doctor name, department
  ☐ prescriptionId included (or null if no prescription)
  ☐ PERFORMANCE: Should be 2 queries max (Token fetch + Prescription batch fetch) ← N+1 FIX VERIFIED

💡 HOW TO VERIFY N+1 FIX:
   Enable MongoDB query logging and check:
   - Query 1: Find tokens for patient
   - Query 2: Find prescriptions for all token IDs
   - Should NOT have multiple prescription queries!

Error Cases to Test:
  • Unauthorized: no token → Should return 401
  • No visits: → Should return with empty visits array

───────────────────────────────────────────────────────────────────────────────

📍 STEP 13: Download Prescription PDF
═══════════════════════════════════════

Endpoint: GET http://localhost:5000/api/prescription/PASTE_PRESCRIPTION_ID_HERE/pdf
Headers:
  - Authorization: Bearer PASTE_PATIENT_TOKEN_HERE (or doctor token)

Expected Response (200 OK):
```
Binary PDF file
Content-Type: application/pdf
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ Content-Type: application/pdf
  ☐ PDF downloads successfully
  ☐ PDF contains: Doctor name, patient info, medicines, side effects

Error Cases to Test:
  • Non-existent prescription: invalid_id → Should return 404 "Prescription not found"
  • Unauthorized: → Should return 401

───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════

PHASE 8: ANALYTICS - Doctor & MD Dashboard ✨ DEDUPED CODE
═════════════════════════════════════════════════════════════

📍 STEP 14: Get Doctor Analytics
═════════════════════════════════

Endpoint: GET http://localhost:5000/api/analytics/doctor/today
Headers:
  - Authorization: Bearer PASTE_DOCTOR_TOKEN_HERE

Expected Response (200 OK):
```json
{
  "message": "Doctor analytics fetched successfully",
  "data": {
    "totalPatients": 1,
    "completedCount": 1,
    "cancelledCount": 0,
    "pendingCount": 0,
    "tokenDetails": [
      {
        "_id": "token123...",
        "tokenNumber": 1,
        "slotTime": "09:00 - 09:30",
        "status": "COMPLETED",
        "doctor": "Dr. Rajeesh Kumar",
        "department": "ENT",
        "createdAt": "2026-02-11T..."
      }
    ]
  }
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ Analytics calculated for rolling 24-hour window
  ☐ Count matches actual tokens
  ☐ Uses NEW analyticsHelper.calculateTokenStats() ← DEDUPED CODE VERIFIED

Error Cases to Test:
  • Unauthorized: → Should return 401
  • Invalid doctor: → Should return 404

───────────────────────────────────────────────────────────────────────────────

📍 STEP 15: Get MD Analytics Dashboard
═══════════════════════════════════════

Endpoint: GET http://localhost:5000/api/analytics/md/today
Headers:
  - Authorization: Bearer MD_TOKEN (if you have one, or use admin token)

Note: MD doesn't have a login currently, so this may require manual token or MD creation

Expected Response (200 OK):
```json
{
  "message": "Today's analytics fetched successfully",
  "data": {
    "totalPatients": 1,
    "completedCount": 1,
    "cancelledCount": 0,
    "pendingCount": 0,
    "tokenDetails": [
      {
        "_id": "token123...",
        "tokenNumber": 1,
        "slotTime": "09:00 - 09:30",
        "status": "COMPLETED",
        "doctor": "Dr. Rajeesh Kumar",
        "department": "ENT",
        "createdAt": "2026-02-11T..."
      }
    ],
    "departmentStats": {
      "ENT": 1
    },
    "doctorStats": {
      "Dr. Rajeesh Kumar": 1
    }
  }
}
```

✅ VERIFICATION CHECKLIST:
  ☐ Status Code: 200
  ☐ Includes: totalPatients, completedCount, cancelledCount, pendingCount
  ☐ Includes: departmentStats (breakdown by department)
  ☐ Includes: doctorStats (breakdown by doctor)
  ☐ Uses NEW analyticsHelper utilities ← DEDUPED CODE VERIFIED

───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════

SUMMARY OF CHANGES VERIFICATION
═════════════════════════════════

✅ Change 1: Login Mobile | Email Support
   ✓ Step 4: Patient login with mobile works
   ✓ Can also login with email (if user has email)

✅ Change 2: N+1 Query Problem Fixed
   ✓ Step 12: Visit history uses batch fetch
   ✓ Check MongoDB logs: Should see only 2 queries

✅ Change 3: Input Validation Middleware
   ✓ All error cases test validation
   ✓ 400 status for validation failures

✅ Change 4: Schedule Date Type Changed
   ✓ Step 6: Schedule date is ISODate format (not string)
   ✓ Check MongoDB: Schedule.date should be Date type

✅ Change 5: Comprehensive Error Handling
   ✓ All steps include error case testing
   ✓ Consistent error format across all endpoints

✅ Change 6: Analytics Code Deduplication
   ✓ Step 14: Doctor analytics uses analyticsHelper
   ✓ Step 15: MD analytics uses analytics helper

═══════════════════════════════════════════════════════════════════════════════

⚠️ IMPORTANT NOTES:

1. Authorization:
   - Patient: Use patientToken in Authorization header
   - Doctor: Use doctorToken in Authorization header
   - Format: Authorization: Bearer <token>

2. Dates:
   - Always use YYYY-MM-DD format (2026-02-12)
   - System auto-converts to Date object

3. IDs:
   - Save all _id values from responses
   - Use them in subsequent API calls
   - Some endpoints need different IDs (doctor._id vs doctor.user)

4. Order Matters:
   - Cannot book token without schedule
   - Cannot create prescription without completed token
   - Cannot see analytics without tokens

5. Performance Testing:
   - Check MongoDB logs for query count
   - Visit history should be 2 queries max
   - Verify performance improvement for N+1 fix

═══════════════════════════════════════════════════════════════════════════════

Test Complete! All APIs verified from start to finish.
