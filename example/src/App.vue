<template>
  <el-button>Demo 1</el-button>
  <yyg-foo :msg="msg"></yyg-foo>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('hello world')
</script>

<style scoped>
</style>
