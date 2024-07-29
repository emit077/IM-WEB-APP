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
  color: #ffffff;
}

.drawer_list .v-list-item--link::before {
  background-color: rgb(var(--primary_rgb)) !important;
}

.drawer_list .v-list-item--active .drawer-text {
  color:rgb(var(--primary_rgb)) !important;
  font-weight: bold !important;
}

a.v-list-item--active {
  background: yellow !important;
  // margin: 0px 5px;
  border-radius: 10px;
  font-weight: bold !important;
}
</style>

<template>
  <v-card>
    <v-navigation-drawer
      v-model="$store.state.drawer.drawer"
      app
      class="elevation-0 navbar-custome-style"
      color="primary"
      width="210"
      height="99.9%"
    >
      <template v-slot:prepend>
        <!--   logo   -->
        <div class="text-center">
          <img
            class="my-2 text-center"
            src="@/assets/im-logo/logo-white.svg"
            width="170px"
            v-if="$project.NAME == 'IM'"
          />
          <img
            class="my-2 text-center"
            src="@/assets/logo/logo.svg"
            width="130px"
            v-else
          />
        </div>
        <!--   logo end    -->
      </template>
      <hr />
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
          <v-btn :ripple="false" text color="theme_yellow" @click="logout">
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
