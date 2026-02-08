📋 QUICK VERIFICATION GUIDE
===========================

This guide helps you verify that all changes are working correctly.

1. LOGIN ENDPOINT - Mobile & Email Support
   =========================================
   
   Test Case 1a: Login with mobile
   POST /api/auth/login
   Body: {
     "mobile": "9876543210",
     "password": "testpass123"
   }
   Expected: 200 OK with token
   
   Test Case 1b: Login with email (NEW)
   POST /api/auth/login
   Body: {
     "email": "doctor@example.com",
     "password": "testpass123"
   }
   Expected: 200 OK with token
   
   Test Case 1c: Missing credentials
   POST /api/auth/login
   Body: { }
   Expected: 400 "Mobile or email is required"

2. SCHEDULE DATE CONVERSION
   ========================
   
   Test Case 2a: Create schedule with date
   POST /api/doctor/schedule
   Headers: Authorization: Bearer <token>
   Body: {
     "date": "2025-02-15",
     "startTime": "09:00",
     "endTime": "17:00",
     "slotDuration": 30,
     "maxTokens": 5
   }
   Expected: 201 Created, schedule stored with Date type
   
   Test Case 2b: Get schedule with date range query
   GET /api/doctor/schedule?date=2025-02-15
   Expected: 200 OK, schedule for that date
   
   Verify: Check MongoDB - Schedule.date should be Date type, not String

3. VISIT HISTORY - N+1 QUERY FIX
   =============================
   
   Test Case 3a: Get visit history
   GET /api/patient/visits
   Headers: Authorization: Bearer <token>
   Expected: 200 OK with visits array
   
   Verify: 
   - Only 2 database queries: 1 for tokens + 1 for all prescriptions
   - NOT multiple queries per token
   - Console logs should show batch fetch, not repeated queries

4. ERROR HANDLING
   ===============
   
   Test Case 4a: Book slot with missing fields
   POST /api/patient/book-token
   Headers: Authorization: Bearer <token>
   Body: {
     "scheduleId": "123"
     // missing slotId, name, age
   }
   Expected: 400 "Schedule, slot, name, and age are required"
   
   Test Case 4b: Duplicate prescription creation
   POST /api/prescription
   Headers: Authorization: Bearer <token>
   Body: {
     "tokenId": "123",
     "medicines": [...]
     // Create twice
   }
   Expected First: 201 Created
   Expected Second: 409 "Prescription already exists for this token"
   
   Test Case 4c: Invalid date format
   GET /api/patient/slots?doctorId=123&date=invalid-date
   Expected: 400 "Invalid date format"

5. ANALYTICS - DUPLICATE CODE REMOVAL
   ===================================
   
   Test Case 5a: Doctor analytics using new helper
   GET /api/doctor/analytics
   Headers: Authorization: Bearer <token>
   Expected: 200 OK with: {
     "totalPatients": number,
     "completedCount": number,
     "cancelledCount": number,
     "pendingCount": number,
     "tokenDetails": [...]
   }
   
   Test Case 5b: MD analytics with detailed breakdown
   GET /api/md/analytics
   Headers: Authorization: Bearer <token>
   Expected: 200 OK with: {
     "totalPatients": number,
     "completedCount": number,
     "cancelledCount": number,
     "pendingCount": number,
     "tokenDetails": [...],
     "departmentStats": {...},
     "doctorStats": {...}
   }
   
   Verify: Both use same calculateTokenStats helper (check imports in controllers)

6. VALIDATION MIDDLEWARE (Optional Integration)
   ============================================
   
   Test Case 6a: Patient registration validation
   POST /api/auth/register
   Body: {
     "name": "John",
     "mobile": "123",  // too short
     "password": "123",  // too short
     "age": 25
   }
   Expected: 400 with specific validation errors
   
   Verify: validationMiddleware.js exists in src/ with 4 functions

7. HTTP STATUS CODES
   ==================
   
   Verify status codes across all endpoints:
   ✓ 400: Validation failures (missing fields, invalid formats)
   ✓ 401: Unauthorized (missing auth or invalid token)
   ✓ 404: Not found (resource doesn't exist)
   ✓ 409: Conflict (duplicates, already cancelled, etc)
   ✓ 500: Server errors (only with generic message)
   ✓ 201: Created (new resources)
   ✓ 200: Success (read/update operations)

8. ERROR MESSAGE FORMAT
   ====================
   
   Test Case 8a: All errors should have consistent format
   Expected Response Format:
   {
     "message": "Human-readable error description"
   }
   
   NOT acceptable:
   - Internal stack traces
   - Database query details
   - File paths
   - System information

9. AUTHORIZATION CHECKS
   =====================
   
   Test Case 9a: Access without token
   GET /api/doctor/analytics
   Expected: 401 "Unauthorized" or "token missing"
   
   Test Case 9b: Access with invalid token
   GET /api/doctor/analytics
   Headers: Authorization: Bearer invalid-token
   Expected: 401 "Unauthorized"

10. BACKWARD COMPATIBILITY
    =======================
    
    Verify:
    ☐ Old mobile-only login still works
    ☐ Frontend date strings "YYYY-MM-DD" still work (converted to Date)
    ☐ All existing API endpoints respond with same data structure
    ☐ No required new fields in request bodies
    ☐ All response formats identical to before

MONGODB QUERY VERIFICATION
============================

To verify N+1 fix is working:
1. Add this to patientController.js temporarily for logging:
   console.log("DB Query Count:", visitIds.length + 1, "queries");

2. Before fix: N+1 queries (1 + number of visits)
3. After fix: 2 queries always (1 for tokens + 1 for prescriptions)

To verify date type change:
1. Open MongoDB Compass
2. Navigate to your database
3. Find Schedule collection
4. Check one document - date field should show as "Date" type
5. Example: ISODate("2025-02-15T00:00:00.000Z")

QUICK TEST SCRIPT (Optional)
=============================

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9876543210","password":"testpass123"}'

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@example.com","password":"testpass123"}'

curl -X GET "http://localhost:5000/api/patient/slots?doctorId=123&date=2025-02-15" \
  -H "Authorization: Bearer YOUR_TOKEN"

FINAL CHECKLIST
================

Before marking as complete:
☐ All 6 improvements are in the code
☐ No compilation/syntax errors
☐ Test at least 3 critical endpoints
☐ Verify error handling works (try invalid inputs)
☐ Check MongoDB for date type change
☐ Confirm backward compatibility with old requests
☐ Review console logs for performance improvements
☐ Push changes to GitHub repository

Status: Ready for testing ✅
