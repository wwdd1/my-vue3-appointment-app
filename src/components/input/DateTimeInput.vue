<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Props, InputValueType, Emits } from './InputBase'

defineProps<Props<InputValueType>>()
const model = defineModel()
const emit = defineEmits<Emits<InputValueType>>()
</script>

<template>
  <VueDatePicker v-model="model" style="width: auto; display: inline-block"></VueDatePicker>
</template>
