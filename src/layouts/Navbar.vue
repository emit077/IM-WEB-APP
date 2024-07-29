<style lang="scss" scoped>
.btn-box {
  width: 40px;
  background-color: transparent;
  display: inline-block;
}

@media screen and (max-width: 1260px) {
  .btn-box {
    width: 30px;
    background-color: transparent;
    display: inline-block;
    margin-left: -20px;
  }
}

.page-title-text {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  //font-size: 19px;
  line-height: 26px;
  color: rgb(var(--primary_rgb));
}
</style>
<template>
  <v-app-bar app color="#eeeeee" :height="($vuetify.breakpoint.xs || $vuetify.breakpoint.sm) ? 40 : 72" elevate-on-scroll
 class="">
    <!--      scroll-target="#scrolling-techniques-7"  -->

    <div class="btn-box">
      <v-btn v-if="$route.meta.show_back_btn" color="primary" text depressed fab small @click="$router.go(-1)">
        <v-icon color="primary" :size="($vuetify.breakpoint.xs || $vuetify.breakpoint.sm) ? 20 : 30">mdi-chevron-left
        </v-icon>
        <!--        <v-icon color="primary" size="25">mdi-arrow-left</v-icon>-->
      </v-btn>
    </div>

    <v-toolbar-title class="page-title-text"
      :class="($vuetify.breakpoint.xs || $vuetify.breakpoint.sm) ? 'fs-14' : 'fs-18'">
      <span v-if="$route.meta.dynamic_title && $route.meta.dynamic_title[getUser.account_type]">
        {{ $route.meta.dynamic_title[getUser.account_type] }}
      </span>
      <span v-else> {{ $route.meta.title }} </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <small class="primary--text">For any query call us <b>{{ $lang[$project.NAME].CONTACT_NUMBER }}</b></small>
    <v-btn v-if="$store.state.is_mobile" icon @click="$store.state.drawer.drawer = !$store.state.drawer.drawer">
      <img src="../assets/others/menu.svg" alt="" width="28">
    </v-btn>
  </v-app-bar>
</template>