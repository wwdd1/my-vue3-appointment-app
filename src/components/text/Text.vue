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
const formatters = {
  fullname,
  date,
  datetime,
  phone
} as Record<string, (input: string) => string>

const formatted = computed(() => {
  const input = String(text)
  let output = input
  if (formatter) {
    output = formatters[formatter as string](input)
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
