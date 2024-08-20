<style lang="scss" media="screen" scoped>
.navbar-custome-style {
  border-radius: 0px !important;
  padding: 5px;
}

.drawer-text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600 !important;
  font-size: 13px !important;
  line-height: 15px;
}

.drawer_list .v-list-item--link::before {
  background-color: rgb(var(--primary_rgb)) !important;
}

.drawer_list .v-list-item--active .drawer-text {
  color: rgb(var(--primary_rgb)) !important;
  font-weight: bold !important;
}
a.v-list-item {
  border-left: 7px solid transparent;
  border-radius: 10px;
  font-weight: bold !important;
}
a.v-list-item--active {
  border-left: 7px solid rgb(var(--primary_rgb));
}
</style>

<template>
  <v-card>
    <v-navigation-drawer
      v-model="$store.state.drawer.drawer"
      app
      class="elevation-0 navbar-custome-style"
      color="surface"
      width="220"
      height="99.9%"
    >
      <template v-slot:prepend>
        <!-- user profile  -->
        <div class="d-flex py-3 px-2" style="align-items: center">
          <v-avatar size="40" color="primary" class="white--text" title="Indian Mentors">
            <img src="@/assets/im-logo/im-logo-icon.svg" alt="" />
          </v-avatar>
          <div class="pl-2">
            <p
              class="ma-0 fs-16 primary--text overflow-hidden"
              style="
                line-height: 110%;
                width: 150px;
                white-space: nowrap;
                text-overflow: ellipsis;
              "
            >
              {{ $store.state.user.name }}
            </p>
            <small class="ma-0">{{ $store.state.user.account_type }}</small>
          </div>
        </div>
        <!--  -->
        <!--   logo   -->
        <!-- <div class="text-center">
          <img
            class="my-2 text-center"
            src="@/assets/im-logo/logo-white.svg"
            width="170px"
            v-if="$project.NAME == 'IM'"
          />
        </div> -->
        <!--   logo end    -->
      </template>
      <v-divider></v-divider>
      <div class="py-2">
        <v-list class="pa-0 drawer_list" dense nav>
          <div v-for="(item, i) in getDrawerItems" :key="i">
            <v-list-item
              v-if="item.access_by.includes(getUser.account_type)"
              :to="item.url"
              class="py-0"
              link
              @click="setActiveTab(item)"
            >
              <v-list-item-content>
                <v-list-item-title class="drawer-text pl-0">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </div>
      <!--    logout btn    -->
      <template v-slot:append>
        <div class="pa-1 text-center">
          <v-divider />
          <v-btn :ripple="false" small color="primary" @click="logout" class="mt-2">
            <span>{{ $lang.LOGOUT }}</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      loading: false,
      mini: false,
      city_list: [],
      city: null,
    };
  },
  computed: mapGetters({
    getDrawerItems: "drawer/getDrawerItems",
    getManageTab: "drawer/getManageTab",
  }),
  created() {
    this.$store.state.drawer.drawer = !this.$store.state.is_mobile;
    this.$store.dispatch("drawer/setActiveTab", localStorage.getItem("active-tab"));
    this.getCityList();
    if (this.$store.state.city) this.city = this.$store.state.city;
  },
  methods: {
    setActiveTab(item) {
      this.$store.dispatch("drawer/setActiveTab", item.url.name);
    },
    logout() {
      localStorage.removeItem("active-tab");
      // localStorage.removeItem("token");
      localStorage.clear();
      if (
        [this.$keys.ACCOUNT_STUDENT, this.$keys.ACCOUNT_TEACHER].includes(
          this.getUser.account_type
        )
      )
        this.$router.push({ name: "login" });
      else this.$router.push({ name: "admin_login" });
    },
    /* city auto complete */
    getCityList() {
      const self = this;
      let params = {};
      const successHandler = (response) => {
        this.city_list = response.data.city_list;
        if (!this.city) {
          this.city = this.city_list[0].id;
          this.updateCity();
        }
      };
      const finallyHandler = () => {
        self.city_loading = false;
      };
      self.request_GET(
        self,
        self.$urls.CITY,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    updateCity() {
      localStorage.setItem("city", JSON.stringify(this.city));
      location.reload();
    },
  },
};
</script>
