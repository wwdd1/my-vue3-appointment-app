<script setup lang="ts" generic="T extends WithId">
import { computed, ref, watch } from 'vue'
import List from './List.vue'
import Pagination from '@/components/pagination/Pagination.vue';
import { type Props, type Emits, type WithId } from './ListBase'

const { initialPage, pageSize, dataSource } = defineProps<Props<T> & {
  initialPage: number
  pageSize: number
}>()
defineEmits<Emits<MouseEvent>>()

const page = ref(initialPage)
const totalCount = ref<number>(0)
const currentPageDataSource = ref<Promise<T[]>>(Promise.resolve([]))

const currentSliceRange = computed<[number, number]>(() => {
  const start = (page.value - 1) * pageSize
  const end = start + pageSize
  return [start, end]
})

watch(
  () => page.value,
  () => {
    const [start, end] = currentSliceRange.value
    currentPageDataSource.value = dataSource.then((data) => {
      if (!totalCount.value) {
        totalCount.value = data.length
      }
      return data.slice(start, end)
    })
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <List
      :data-source="currentPageDataSource"
      v-slot="{ item }"
    >
      <slot :item="item"></slot>
    </List>
    <div class="flex justify-end mx-6 my-4">
      <Pagination
        :page="page"
        :total-count="totalCount"
        :page-size="pageSize"
        @click="page = $event"
      ></Pagination>
    </div>
  </div>
</template>
