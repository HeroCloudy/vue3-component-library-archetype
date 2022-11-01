<template>
  <{{componentPrefix}}-foo :msg="msg"></{{componentPrefix}}-foo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const msg = ref('hello custom component')
</script>

<style scoped lang="scss">
</style>
