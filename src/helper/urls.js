export default {
  /* Url configuration for all env*/
  IM: {
    PRODUCTION: "https://api.indianmentors.in/api",
    STAGING: "https://dev.api.indianmentors.in/api",
    // LOCAL: "http://localhost:8000/api",
    LOCAL: "http://13.234.152.205/api",
  },

  LOGIN: "/users/login/",
  ADMIN_LOGIN: "/users/admin-login/",
  SIGNUP: "/users/signup/",
  FORGOT_PASSWORD: "/users/forget-password/",
  RESEND_OTP: "/users/resend-otp/",
  VERIFY_OTP: "/users/verify-otp/",
  RESET_PASSWORD: "/users/reset-password/",
  TOGGLE_ACCOUNT_STATUS: "/users/toggle-account-status/",

  /* Over view*/
  ADMIN_OVERVIEW: "/stats/overview/",

  /* master api */
  TIME_SLOT_LIST: "/master/time-slot-list/",
  GRADE_LIST: "/master/grade-list/",
  CLASS_LIST: "/master/class-list/",
  CITY_LIST: "/master/city-list/",
  CITY: "/master/city/",
  TICKET_CATEGORY: "/master/ticket_category/",

  MATCH_PIN_CODE: "/master/match/pin-code/",
  LIST_PIN_CODE: "/master/list/pin-code/",
  TOGGLE_SERVICEABLE_PIN_CODE: "/master/toggle/serviceable-pin-code/",

  /* subscription plan */
  ADD_SUBSCRIPTION_PLAN: "/subscription/add/plan/",
  LIST_SUBSCRIPTION_PLAN: "/subscription/list/plan/",
  SUBSCRIPTION_PLAN_DETAIL: "/subscription/get/plan-details/",
  DELETE_SUBSCRIPTION_PLAN: "/subscription/delete/plan/",
  ACTIVATE_SUBSCRIPTION_MANUAL: "/subscription/activate-subscription-manual/",
  SUBSCRIPTION_PREVIEW: "/subscription/subscription-preview/",
  /* invoice */
  GET_INVOICE: "/subscription/get-invoice/?std_subscription_plan_id=",
  GET_SUBSCRIPTION_PAYMNET_INVOICE:
    "/subscription/get-subscription-payment-invoice/?payment_table_id=",
  GET_REGISTRATION_PAYMNET_INVOICE:
    "/payments/get-registration-payment-invoice/?payment_table_id=",

  SUBSCRIPTION_HISTORY: "/subscription/subscription-history/",
  STUDENT_SUBSCRIPTION_DETAILS: "/subscription/student-subscription-details/",
  SUBSCRIPTION_PAYMENT: "/subscription/init-payment/",
  INIT_REGISTRATION_PAYMENT: "/payments/init-registration-payment/",
  REGISTRATION_PAYMENT_LIST: "/payments/registration-payment-list/",
  REGISTRATION_PAYMENT_REPORT: "/payments/registration-payment-report/",
  SUBSCRIPTION_PAYMENT_REPORT: "/payments/subscription-payment-report/",
  COLLECT_REGISTRATION_FEE_OFFLINE:
    "/payments/collect-registration-fee-offline/",

  SUBSCRIPTION_PAYMENT_LIST: "/payments/subscription-payment-list/",
  GET_INSTALLMENTS: "/payments/list/installments/",
  PAY_INSTALLMENT: "/payments/pay-installment/",

  /*student api*/
  GET_STUDENT_DETAILS: "/student/get/details/",
  EDIT_DETAIL: "/student/add/basic-details/",
  STUDENT_LIST: "/student/list/",
  STUDENT_EXPORT: "/student/export/",

  STUDENT_SCHEDULE_COUNSELLING: "/student/schedule-counselling/",
  STUDENT_COUNSELLING_DETAILS: "/student/counselling-details/",
  STUDENT_COUNSELLING_LIST: "/student/counselling-list/",
  STUDENT_COUNSELLING_RESULT: "/student/counselling-result/",

  /*Tutor api*/
  GET_TUTOR_DETAILS: "/tutor/get/details/",
  GET_TUTOR_LIST: "/tutor/list/",
  TUTOR_EXPORT: "/tutor/export/",
  ADD_TUTOR_DATA: "/tutor/add/tutor-data/",
  TUTOR_ADD_PROFESSIONAL_DATA: "/tutor/add/professional-data/",
  TUTOR_AUTOCOMPLETE: "/tutor/autocomplete/",
  SCHEDULE_INTERVIEW: "/tutor/schedule-interview/",
  INTERVIEW_RESULT: "/tutor/interview-result/",
  INTERVIEW_DETAILS: "/tutor/interview-details/",
  START_AGREEMENT: "/tutor/start-agreement/",
  UPLOAD_DOCUMENT: "/tutor/upload-document/",
  GET_TUTOR_DOCUMENTS: "/tutor/get-document/",
  PROFILE_SETTINGS: "/tutor/settings/",

  INTERVIEW_LIST: "/tutor/interview-list/",

  /* Batch*/
  BATCH_LIST: "/batch/list/",
  BATCH_CREATE: "/batch/create/",
  BATCH_DETAILS: "/batch/details/",

  SESSION_LIST: "/batch/session-list/",
  SESSION_DETAILS: "/batch/session-details/",
  SESSION_START: "/batch/start-session/",
  DEMO_LIST: "/batch/demo-list/",
  SCHEDULE_DEMO: "/batch/schedule-demo/",
  DEMO_DETAILS: "/batch/demo-details/",
  DEMO_CHANGE_STATUS: "/batch/demo-status-change/",
  SET_INTERESTED_TUTORS: "/batch/set-interested-tutors/",
  GET_INTERESTED_TUTORS: "/batch/get-interested-tutors/",

  EXTEND_SESSION: "/batch/extend-session/",
  APPROVE_SESSION: "/batch/approve-session/",
  ASSIGN_HOMEWORK: "/batch/assign-homework/",
  CHANGE_HOMEWORK_STATUS: "/batch/change-homework-status/",

  START_UNIT_TEST: "/batch/start-unit-test/",
  UNIT_TEST_LIST: "/batch/unit-test-list/",

  /* Lead  api*/
  LEAD_LIST: "/leads/list/",
  LEAD_ACTION: "/leads/action/",
  COMMENT_LIST: "/leads/list/comment/",
  COMMENT_ADD: "/leads/add/comment/",

  LIST_WALLET: "/payouts/list/wallet/",
  MY_WALLET: "/payouts/my-wallet/",
  ADD_BANK_DETAILS: "/payouts/add/bank-details/",
  CREATE_PAYOUT: "/payouts/create/payout/",
  UPDATE_WALLET_AMOUNT: "/payouts/update/wallet-amount/",

  LIST_WITHDRAWAL_REQUEST: "/payouts/list/withdrawal-request/",
  RAISE_WITHDRAWAL_REQUEST: "/payouts/raise/withdrawal-request/",
  PROCESS_WITHDRAWAL_REQUEST: "/payouts/process/withdrawal-request/",

  BDA_AUTO_COMPLETE: "/bda/auto_complete/",
  BDA_ADD: "/bda/add/",
  BDA_DETAILS: "/bda/details/",
  BDA_LIST: "/bda/list/",

  RAISE_TICKET: "/support/raise/ticket/",
  LIST_TICKET: "/support/list/ticket/",
  CLOSE_TICKET: "/support/close/ticket/",
  DETAILS_TICKET: "/support/details/ticket/",
  ADD_COMMENT: "/support/add/comment/",
};
