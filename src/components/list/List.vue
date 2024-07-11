<script setup lang="ts" generic="T extends WithId">
import { ref, watchEffect } from 'vue'
import { type Props, type Emits, type WithId } from './ListBase'

const { dataSource } = defineProps<Props<T>>()
defineEmits<Emits<MouseEvent>>()
const items = ref<T[]>([])

const isPending = ref(true)
const error = ref<Error | null>(null)

function fetch() {
  isPending.value = true
  dataSource
    .then((data) => {
      items.value = data
      error.value = null
    })
    .catch((err) => {
      console.error('[List]Cannot fetch data from datasource:')
      console.error(err)
      error.value = err
    })
    .finally(() => {
      isPending.value = false
    })
}

watchEffect(() => {
  fetch()
})
</script>

<template>
  <div v-if="isPending">Pending...</div>
  <div v-if="error">{{ error.message }}</div>
  <ul v-else>
    <li v-for="item in items" :key="item.id" class="mb-2">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>
