import Vue from "vue";
import VueRouter from "vue-router";
import project from "@/helper/project-config";
import keys from "@/helper/keys";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/admin/login",
    name: "admin_login",
    meta: { requiresAuth: false, title: "Login", show_back_btn: false },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/pages/auth/TeamLogin.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { requiresAuth: false, title: "Login", show_back_btn: false },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/pages/auth/UserLogin.vue"),
  },
  {
    path: "/interested-tutor/",
    name: "interested_tutor",
    meta: {
      requiresAuth: false,
      title: "Record interest",
      show_back_btn: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "login" */ "@/pages/batch/RecordTutorInterest.vue"
      ),
  },
  {
    path: "/student/registration/",
    name: "student_registration",
    meta: { requiresAuth: false, title: "Login", show_back_btn: false },
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "@/pages/auth/RegistrationPage"
      ),
  },
  {
    path: "/tutor/registration/",
    name: "tutor_egistration",
    meta: { requiresAuth: false, title: "Login", show_back_btn: false },
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "@/pages/auth/RegistrationPage"
      ),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { requiresAuth: true, title: "Dashboard", show_back_btn: true },
    component: () => import(/* webpackChunkName: "login" */ "@/layouts/Base"),
    children: [
      {
        path: "/overview",
        name: "overview",
        meta: { requiresAuth: true, title: "Overview", show_back_btn: false },
        component: () =>
          import(
            /* webpackChunkName: "overview" */ "@/pages/overview/AdminOverview"
          ),
      },
      {
        path: "/subscription",
        name: "subscription_list",
        meta: {
          requiresAuth: true,
          title: "Subscription Plan",
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/SubscriptionList"
          ),
      },
      {
        path: "/subscription/new-plan",
        name: "add_subscription_plan",
        meta: {
          requiresAuth: true,
          title: "Add Subscription plan",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/CreateSubscriptionPlan"
          ),
      },
      {
        path: "/subscription/edit-plan/:id",
        name: "edit_subscription_plan",
        meta: {
          requiresAuth: true,
          title: "Edit Subscription Plan",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/CreateSubscriptionPlan"
          ),
      },
      {
        path: "/subscription-plans",
        name: "subscription_plans",
        meta: {
          requiresAuth: true,
          title: "Subscription Plans",
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/SubscriptionPlans"
          ),
      },
      {
        path: "/subscription-summary/:id",
        name: "subscription_summary",
        meta: {
          requiresAuth: true,
          title: "Subscription Summary",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/student-subscriptions/SubscriptionSummary"
          ),
      },
      {
        path: "/subscription-history",
        name: "subscription_history",
        meta: {
          requiresAuth: true,
          title: "Subscription History",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/SubscriptionHistory"
          ),
      },
      {
        path: "/student-subscription-history",
        name: "student_subscription_history",
        meta: {
          requiresAuth: true,
          title: "Subscription History",
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/SubscriptionHistory"
          ),
      },
      {
        path: "/student-subscription-history/details/:std_subscription_id",
        name: "student_subscription_details",
        meta: {
          requiresAuth: true,
          title: "Subscription Details",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/student-subscriptions/StudentSubscriptionDetails"
          ),
      },
      {
        path: "/add-subscription/",
        name: "add_subscription",
        meta: {
          requiresAuth: true,
          title: "Add Subscription",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "subscription" */ "@/pages/subscription/student-subscriptions/AddStudentSubscriptions"
          ),
      },

      //students
      {
        path: "/students",
        name: "student_list",
        meta: { requiresAuth: true, title: "Students", show_back_btn: false },
        component: () =>
          import(
            /* webpackChunkName: "students" */ "@/pages/students/StudentList"
          ),
      },
      {
        path: "/students/profile",
        name: "student_profile",
        meta: { requiresAuth: true, title: "My Profile", show_back_btn: false },
        component: () =>
          import(
            /* webpackChunkName: "students" */ "@/pages/students/StudentProfile"
          ),
      },
      {
        path: "/students/edit",
        name: "edit_student_profile",
        meta: {
          requiresAuth: true,
          title: "Edit Profile",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "students" */ "@/pages/students/EditStudentProfile"
          ),
      },
      {
        path: "/students/add",
        name: "add_student",
        meta: { requiresAuth: true, title: "Add Student", show_back_btn: true },
        component: () =>
          import(
            /* webpackChunkName: "students" */ "@/pages/students/EditStudentProfile"
          ),
      },
      {
        path: "/counselling/",
        name: "counselling_list",
        meta: {
          requiresAuth: true,
          title: "Counsellings",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "students" */ "@/pages/counselling/CounsellingList"
          ),
      },

      //tutor

      {
        path: "/tutor-home",
        name: "tutor_home",
        meta: { requiresAuth: true, title: "Home", show_back_btn: false },
        component: () =>
          import(/* webpackChunkName: "tutor" */ "@/pages/teacher/Home"),
      },
      {
        path: "/tutor",
        name: "tutor_list",
        meta: { requiresAuth: true, title: "Tutor List", show_back_btn: false },
        component: () =>
          import(/* webpackChunkName: "tutor" */ "@/pages/teacher/TutorList"),
      },
      {
        path: "/tutor/tutor-profile",
        name: "tutor_profile",
        meta: {
          requiresAuth: true,
          title: "Tutor Profile",
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "tutor" */ "@/pages/teacher/TutorProfile"
          ),
      },
      {
        path: "/tutor/profile/edit/",
        name: "edit_tutor_profile",
        meta: {
          requiresAuth: true,
          title: "Edit Tutors Profile",
          show_back_btn: true,
        },
        component: () =>
          import(/* webpackChunkName: "tutor" */ "@/pages/teacher/EditProfile"),
      },
      //business-developer
      {
        path: "/bda-developer",
        name: "bda_profile",
        meta: {
          requiresAuth: true,
          title: "Manager Profile",
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "bda" */ "@/pages/business-developer/BDAProfile"
          ),
      },
      {
        path: "/business-developer",
        name: "bda_list",
        meta: { requiresAuth: true, title: "Managers", show_back_btn: false },
        component: () =>
          import(
            /* webpackChunkName: "bda" */ "@/pages/business-developer/BusinessDeveloperList"
          ),
      },
      {
        path: "/business-developer/add",
        name: "add_bda",
        meta: {
          requiresAuth: true,
          title: "Add Executive",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "bda" */ "@/pages/business-developer/AddBusinessDeveloper"
          ),
      },
      {
        path: "/business-developer/edit/:bda_table_id",
        name: "edit_bda",
        meta: {
          requiresAuth: true,
          title: "Edit Executive",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "bda" */ "@/pages/business-developer/AddBusinessDeveloper"
          ),
      },
      //batch_list
      {
        path: "batch",
        name: "batch_list",
        meta: {
          requiresAuth: true,
          title: "Batch",
          dynamic_title: { Student: "My Tutors", Teacher: "My Students" },
          show_back_btn: false,
        },
        component: () =>
          import(/* webpackChunkName: "payments" */ "@/pages/batch/BatchList"),
      },
      {
        path: "/batch/new",
        name: "batch_new",
        meta: { requiresAuth: true, title: "New Batch", show_back_btn: true },
        component: () =>
          import(
            /* webpackChunkName: "payments" */ "@/pages/batch/CreateBatch"
          ),
      },
      {
        path: "/batch/edit/:batch_table_id",
        name: "batch_edit",
        meta: { requiresAuth: true, title: "New Batch", show_back_btn: true },
        component: () =>
          import(
            /* webpackChunkName: "payments" */ "@/pages/batch/CreateBatch"
          ),
      },
      {
        path: "/batch/details/:batch_table_id",
        name: "batch_details",
        meta: {
          requiresAuth: true,
          title: "Batch Details",
          dynamic_title: {
            Student: "Tutor Details",
            Teacher: "Student Details",
          },
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "payments" */ "@/pages/batch/BatchDetails"
          ),
      },
      //Session
      {
        path: "/sessions/",
        name: "session_list",
        meta: {
          requiresAuth: true,
          title: "Sessions",
          dynamic_title: { Student: "My Classes", Teacher: "My Classes" },
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "payments" */ "@/pages/sessions/SessionList"
          ),
      },
      {
        path: "/sessions/details/:session_table_id",
        name: "sessions_details",
        meta: {
          requiresAuth: true,
          title: "Sessions Details",
          dynamic_title: { Student: "Class Details", Teacher: "Class Details" },
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "payments" */ "@/pages/sessions/SessionDetails"
          ),
      },
      {
        path: "/sessions/start/",
        name: "sessions_start",
        meta: {
          requiresAuth: true,
          title: "New Sessions",
          dynamic_title: { Student: "New Class", Teacher: "New Class" },
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "session" */ "@/pages/sessions/CreateSession"
          ),
      },
      //payments
      {
        path: "/payments",
        name: "payment_list",
        meta: { requiresAuth: true, title: "Payments", show_back_btn: false },
        component: () =>
          import(
            /* webpackChunkName: "payments" */ "@/pages/payments/PaymentList"
          ),
      },
      //payouts
      {
        path: "/payouts",
        name: "payouts",
        meta: { requiresAuth: true, title: "Payouts", show_back_btn: false },
        component: () =>
          import(
            /* webpackChunkName: "payouts" */ "@/pages/payouts/PayoutTabs"
          ),
      },
      {
        path: "/payouts/tutor-wallet/:tutor_table_id",
        name: "tutors-wallet",
        meta: {
          requiresAuth: true,
          title: "Tutors Wallet",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "payouts" */ "@/pages/payouts/TutorsWallet"
          ),
      },
      //support/ticket
      {
        path: "/support/new-ticket",
        name: "raise_ticket",
        meta: { requiresAuth: true, title: "New Ticket", show_back_btn: true },
        component: () =>
          import(
            /* webpackChunkName: "support" */ "@/pages/support/CreateTicket"
          ),
      },
      {
        path: "/support",
        name: "support_ticket",
        meta: {
          requiresAuth: true,
          title: "Support Ticket",
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "support" */ "@/pages/support/SupportTicketList"
          ),
      },
      {
        path: "/support/ticket-details/:ticket_table_id",
        name: "support_ticket_details",
        meta: {
          requiresAuth: true,
          title: "Ticket Details",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "support" */ "@/pages/support/SupportTicketDetails"
          ),
      },
      //leads
      {
        path: "/Leads",
        name: "lead_list",
        meta: { requiresAuth: true, title: "Leads", show_back_btn: false },
        component: () =>
          import(/* webpackChunkName: "support" */ "@/pages/leads/LeadList"),
      },
      // demo
      {
        path: "/demo/",
        name: "demo_list",
        meta: { requiresAuth: true, title: "Demo", show_back_btn: false },
        component: () =>
          import(
            /* webpackChunkName: "DemoList" */ "../../pages/demo/DemoList"
          ),
      },
      {
        path: "/demo/schedule/",
        name: "schedule_demo_class",
        meta: {
          requiresAuth: true,
          title: "Schedule Demo",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "ScheduleDemoClass" */ "../../pages/demo/ScheduleDemoClass"
          ),
      },
      {
        path: "/demo/edit/:demo_table_id",
        name: "edit_demo",
        meta: {
          requiresAuth: true,
          title: "Re-Schedule Demo",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../../pages/demo/ScheduleDemoClass"
          ),
      },
      {
        path: "/demo/details/:demo_table_id",
        name: "demo_details",
        meta: {
          requiresAuth: true,
          title: "Demo Details",
          show_back_btn: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "DemoDetails" */ "../../pages/demo/DemoDetails.vue"
          ),
      },
      {
        path: "/interviews/",
        name: "interview_list",
        meta: {
          requiresAuth: true,
          title: "Interviews",
          show_back_btn: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "InterviewList" */ "../../pages/interviews/InterviewList.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/* redirecting to home page if access token is not provided*/
router.beforeEach((to, from, next) => {
  document.title =
    (project.NAME == keys.IM ? "Indian Mentors | " : "Tutors Factory | ") +
    (to.meta.title || "");

  let access_token = localStorage.getItem("token");
  let account_type = localStorage.getItem("account_type");

  /* navigation  logic in case of session already active */
  if (["admin_login", "login"].includes(to.name) && access_token) {
    switch (account_type) {
      case keys.ACCOUNT_STUDENT:
        next({ name: "student_profile" });
        break;
      case keys.ACCOUNT_TEACHER:
        next({ name: "tutor_profile" });
        break;
      case keys.ACCOUNT_ACADEMIC_COUNSELLOR:
      case keys.ACCOUNT_ADMISSION_COORDINATOR:
      case keys.ACCOUNT_ADMISSION_COUNSELLOR:
        next({ name: "bda_profile" });
        break;
      case keys.ACCOUNT_SUPER_ADMIN:
      case keys.ACCOUNT_ADMIN:
        next({ name: "overview" });
        break;
    }
  }
  /* Navigation logic end */
  if (to.meta.requiresAuth == true && !access_token) {
    next({
      name: "login",
    });
  } else if (to.meta.requiresAuth == false && access_token) {
    next();
    // next({
    //     name: 'customers'
    // })
  } else next();
});

export default router;
