export const namespaced = true;

import keys from "@/helper/keys";

export const state = {
  drawer: false,
  primary_drawer: true,
  items: [
    {
      title: "Overview",
      url: { name: "overview" },
      icon: "mdi-view-dashboard",
      // src_active: require('@/assets/images/customer-active.svg'),
      is_active_tab: false,
      access_by: [keys.ACCOUNT_ADMIN, keys.ACCOUNT_SUPER_ADMIN],
    },
    {
      title: "Profile",
      url: { name: "student_profile" },
      // src_active: require('@/assets/images/customer-active.svg'),
      is_active_tab: false,
      access_by: [keys.ACCOUNT_STUDENT],
    },
    {
      title: "Profile",
      url: { name: "tutor_profile" },
      is_active_tab: false,
      access_by: [keys.ACCOUNT_TEACHER],
    },
    {
      title: "Profile",
      url: { name: "bda_profile" },
      is_active_tab: false,
      access_by: [
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
        keys.ACCOUNT_ADMISSION_COORDINATOR,
      ],
    },
    {
      title: "Subscription",
      url: { name: "subscription_plans" },
      is_active_tab: false,
      access_by: [keys.ACCOUNT_STUDENT],
    },
    {
      title: "Subscription Plans",
      url: { name: "subscription_list" },
      is_active_tab: false,
      access_by: [keys.SUPER_ADMIN, keys.ADMIN],
    },
    {
      title: "Subscription History",
      url: { name: "student_subscription_history" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
      ],
    },
    {
      title: "Students",
      url: { name: "student_list" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
      ],
    },
    {
      title: "Tutors",
      url: { name: "tutor_list" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
      ],
    },
    {
      title: "Interviews",
      url: { name: "interview_list" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
      ],
    },
    {
      title: "Manager",
      url: { name: "bda_list" },
      is_active_tab: false,
      access_by: [keys.SUPER_ADMIN, keys.ADMIN],
    },
    // batch
    {
      title: "Batch",
      url: { name: "batch_list" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
      ],
    },
    {
      title: "My Students",
      url: { name: "batch_list" },
      is_active_tab: false,
      access_by: [keys.ACCOUNT_TEACHER],
    },
    {
      title: "My Tutors",
      url: { name: "batch_list" },
      is_active_tab: false,
      access_by: [keys.ACCOUNT_STUDENT],
    },
    // session
    {
      title: "Sessions",
      url: { name: "session_list" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
      ],
    },
    {
      title: "My Classes",
      url: { name: "session_list" },
      is_active_tab: false,
      access_by: [keys.ACCOUNT_STUDENT, keys.ACCOUNT_TEACHER],
    },
    // payment
    {
      title: "Payments",
      url: { name: "payment_list" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_STUDENT,
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
      ],
    },
    {
      title: "Leads",
      url: { name: "lead_list" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
        keys.ACCOUNT_ADMISSION_COORDINATOR,
      ],
    },
    {
      title: "Demo",
      url: { name: "demo_list" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_TEACHER,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
        keys.ACCOUNT_ADMISSION_COORDINATOR,
      ],
    },
    {
      title: "Payouts",
      url: { name: "payouts" },
      is_active_tab: false,
      access_by: [keys.SUPER_ADMIN, keys.ADMIN],
    },
    {
      title: "My Wallet",
      // url: { name: "my-wallet" },
      url: { name: "payouts" },
      is_active_tab: false,
      access_by: [keys.ACCOUNT_TEACHER],
    },
    {
      title: "Support",
      url: { name: "support_ticket" },
      is_active_tab: false,
      access_by: [
        keys.SUPER_ADMIN,
        keys.ADMIN,
        keys.ACCOUNT_TEACHER,
        keys.ACCOUNT_ADMISSION_COUNSELLOR,
        keys.ACCOUNT_STUDENT,
        keys.ACCOUNT_ACADEMIC_COUNSELLOR,
        keys.ACCOUNT_ADMISSION_COORDINATOR,
      ],
    },
    // {
    //     title: "Sales",
    //     url: {name: 'student_list'},
    //     // src: require('@/assets/images/customer.svg'),
    //     // src_active: require('@/assets/images/customer-active.svg'),
    //     is_active_tab: false,
    //     access_by: [keys.SUPER_ADMIN, keys.ADMIN],
    // },
    // {
    //     title: "Revenue",
    //     url: {name: 'student_list'},
    //     // src: require('@/assets/images/customer.svg'),
    //     // src_active: require('@/assets/images/customer-active.svg'),
    //     is_active_tab: false,
    //     access_by: [keys.SUPER_ADMIN, keys.ADMIN],
    // },
    // {
    //     title: "Expences",
    //     url: {name: 'student_list'},
    //     // src: require('@/assets/images/customer.svg'),
    //     // src_active: require('@/assets/images/customer-active.svg'),
    //     is_active_tab: false,
    //     access_by: [keys.SUPER_ADMIN, keys.ADMIN],
    // },
  ],
};

export const mutations = {
  SET_ACTIVE_TAB(state, index) {
    localStorage.setItem("active-tab", index);

    for (let i = 0; i < state.items.length; i++) {
      state.items[i].is_active_tab = false;
    }
  },
  SET_PRIMARY_DRAWER(state, value) {
    state.primary_drawer = value;
  },
};

export const actions = {
  setActiveTab({ commit }, index) {
    commit("SET_ACTIVE_TAB", index);
  },
  setPrimaryDrawer({ commit }, value) {
    commit("SET_PRIMARY_DRAWER", value);
  },
};
export const getters = {
  getDrawerItems: (state) => {
    return state.items;
  },
  getManageTab: (state) => {
    return state.items[9];
  },
};
