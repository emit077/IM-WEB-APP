<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,400;1,600&display=swap');

.auth-basic {
  background-color: #32345F !important;
}
/* font style */
.auth-title {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
  color: #32345F;
}

@media screen and (max-width: 1260px) {
  .auth-title {
    font-size: 26px;
    line-height: 30px;
  }
}


.btn_text {
  font-family: Open Sans;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #FFFFFF;
}

.page-link {
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #03014C;
  cursor: pointer;
}

.eye-icon {
  color: #03014C !important;
  opacity: 0.5;
}
</style>

<template>
  <div>
    <router-view/>
    <!--    snake bar components -->
    <Snakebar></Snakebar>
  </div>
</template>

<script>

export default {
  name: 'Auth',
  components: {
    Snakebar: () => import('@/components/shared/Snakebar'),
  },
  data: () => ({}),
  methods: {}
};
</script>
