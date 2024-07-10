<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { Props, InputValueType, Emits, SelectOptionValueType } from './InputBase'

export type OptionItemType = SelectOptionValueType

const { dataSource } = defineProps<
  Props<SelectOptionValueType> & {
    dataSource: Promise<SelectOptionValueType[]>
  }
>()
const model = defineModel({
  set(value) {
    return items.value.find((item) => String(item.id) === String(value))
  },
  get(value) {
    if (typeof value === 'object' && 'id' in (value as SelectOptionValueType)) {
      return (value as SelectOptionValueType).id
    }
    return value
  }
})
const emit = defineEmits<Emits<InputValueType>>()
const items = ref<SelectOptionValueType[]>([])

onBeforeMount(() => {
  if (dataSource) {
    dataSource
      .then((data) => {
        items.value = data
      })
      .catch((err) => {
        console.error('Cannot fetch data from datasource:')
        console.error(err)
      })
  }
})
</script>

<template>
  <select v-model="model">
    <option disabled :value="undefined" :selected="!!placeholder">{{ placeholder }}</option>
    <option v-for="item in items" :key="item.id" :value="item.id">
      {{ item.label }}
    </option>
  </select>
</template>
