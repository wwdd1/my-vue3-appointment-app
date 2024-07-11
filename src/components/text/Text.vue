<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { type Props, type Emits } from './TextBase'
import { date, datetime, fullname, phone } from '@/lib/utils/string-formatters'
import { ellipsis } from '@/lib/utils/string'

const { formatter, ellipsisMaxCharLength } = defineProps<Props>()
defineEmits<Emits<MouseEvent>>()
const slots = useSlots()
const [defaultSlot] = slots.default ? slots.default() : []

if (defaultSlot.type.toString() !== 'Symbol(v-txt)') {
  throw new Error('[Text] children must be a text node')
}
const { children: text } = defaultSlot

const formatted = computed(() => {
  const input = String(text)
  let output = input
  if (formatter === 'fullname') {
    output = fullname(input)
  }
  if (formatter === 'date') {
    output = date(input)
  }
  if (formatter === 'datetime') {
    output = datetime(input)
  }
  if (formatter === 'phone') {
    output = phone(input)
  }
  if (ellipsisMaxCharLength && ellipsisMaxCharLength > 0) {
    output = ellipsis(output, ellipsisMaxCharLength)
  }
  return output
})
</script>

<template>
  <span>
    {{ formatted }}
  </span>
</template>
