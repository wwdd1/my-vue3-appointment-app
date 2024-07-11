<script setup lang="ts">
import { computed } from 'vue'
import { type Props, type Emits, EMIT_TYPE_CLICK } from './PaginationBase'
import { VISIBLE_PAGINATION_ITEMS } from '@/lib/constants.js'
import Button from '@/components/button/Button.vue'

const props = defineProps<Props>()
const emit = defineEmits<Emits<number>>()

const minPage = 1
const pageNumOffset = Math.floor(VISIBLE_PAGINATION_ITEMS / 2)

const maxPage = computed(() => {
  const { totalCount, pageSize } = props
  return Math.ceil(totalCount / pageSize)
})

const pageNumbers = computed(() => {
  const { page } = props
  let left = Math.max(minPage, page - pageNumOffset)
  let right = Math.min(maxPage.value, page + pageNumOffset)
  return Array(right - left + 1).fill(0).map((_, i) => left + i)
})

function onClickPage(page: number) {
  emit(EMIT_TYPE_CLICK, page)
}

function onClickPrev() {
  emit(EMIT_TYPE_CLICK, Math.max(minPage, props.page - 1))
}

function onClickNext() {
  emit(EMIT_TYPE_CLICK, Math.min(maxPage.value, props.page + 1))
}
</script>

<template>
  <ul class="flex">
    <Button label="<" @click="onClickPrev()"></Button>
    <li v-for="pageNum in pageNumbers" :key="pageNum">
      <Button
        :label="String(pageNum)"
        :class="{ 'bg-red': pageNum == page }"
        @click="onClickPage(pageNum)"
      ></Button>
    </li>
    <Button label=">" @click="onClickNext()"></Button>
  </ul>
</template>
