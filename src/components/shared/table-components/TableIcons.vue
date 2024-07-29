<style lang="scss" scoped></style>

<template>
    <div v-if="type == $keys.PAYMENT_MODE">
        <span v-if="data.mode == $keys.MODE_CASH" :title="data.mode">
            <img src="../../../assets/others/cash.png" alt="" width="30">
        </span>
        <span v-else-if="data.mode == $keys.MODE_PAYMENT_GATEWAY" :title="data.mode">
            <img src="../../../assets/others/pg.png" alt="" width="30">
        </span>
        <span v-else>{{ data.mode }}</span>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: true
        }
    },
}
</script>