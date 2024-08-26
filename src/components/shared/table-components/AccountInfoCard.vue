<style lang="scss" scoped>
.empty-text {
  font-size: 16px;
  line-height: 15px;
  letter-spacing: 0.015em;
  color: #64646470;
}

.gender-female {
  color: #dc63d0 !important;
  background: #f9d2f4 !important;
}

.gender-male {
  color: #2d9cdb !important;
  background: #2d9cdb47 !important;
}

.gender-other {
  color: #5a44c4 !important;
  background: #2f20dd3d !important;
}

.gender-avatar {
  color: #000;
  background-color: lightgray;
}
</style>

<template>
  <div>
    <div class="d-flex">
      <div>
        <v-avatar
          :class="'gender-' + account_details.gender.toLowerCase()"
          class="gender-avatar font-weight-bold large-screen"
          size="30"
          :title="account_details.gender"
        >
          <h3>{{ account_details.gender[0] || "--" }}</h3>
        </v-avatar>
      </div>
      <div class="justify-center ml-2">
        <p v-if="account_details.name" class="font-weight-medium mb-1">
          {{ account_details.name }}
        </p>
        <p v-if="account_details.mobile">{{ account_details.mobile }}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    account_details: {
      type: Object,
      required: true,
    },
  },
};
</script>
