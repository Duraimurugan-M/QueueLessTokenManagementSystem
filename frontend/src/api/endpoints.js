// Centralized API endpoint definitions aligned with backend routes
// Base path: http://localhost:5000/api

export const AUTH_LOGIN = "/auth/login";
export const AUTH_REGISTER = "/auth/register";

// There is no explicit /auth/me in the backend, but you may want to
// extend the backend with one in future. For now this is left as a
// placeholder and not used.
export const AUTH_ME = "/auth/me";

// Patient
export const PATIENT_SLOTS = "/patient/slots";
export const PATIENT_BOOK_TOKEN = "/patient/book-token";
export const PATIENT_CANCEL_TOKEN = (tokenId) => `/patient/cancel-token/${tokenId}`;
export const PATIENT_VISIT_HISTORY = "/patient/visit-history";

// Token
export const TOKEN_BY_ID = (tokenId) => `/token/${tokenId}`;
export const TOKEN_MY_ALL = "/token/my/all";
export const TOKEN_PDF = (tokenId) => `/token/pdf/${tokenId}`;

// Doctor
export const DOCTOR_CREATE_SCHEDULE = "/doctor/schedule";
export const DOCTOR_GET_SCHEDULE = "/doctor/schedule";
export const DOCTOR_QUEUE = "/doctor/queue";
export const DOCTOR_COMPLETE_TOKEN = (tokenId) => `/doctor/complete-token/${tokenId}`;

// Prescriptions
export const PRESCRIPTION_CREATE = "/prescriptions";
export const PRESCRIPTION_DOWNLOAD_PDF = (id) => `/prescriptions/${id}/pdf`;

// MD
export const MD_CREATE_DEPARTMENT = "/md/department";
export const MD_DEPARTMENTS = "/md/departments";
export const MD_CREATE_DOCTOR = "/md/doctor";
export const MD_DOCTORS = "/md/doctors";

// Analytics
export const ANALYTICS_DOCTOR_TODAY = "/analytics/doctor/today";
export const ANALYTICS_MD_TODAY = "/analytics/md/today";

