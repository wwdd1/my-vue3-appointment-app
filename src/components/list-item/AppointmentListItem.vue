<script setup lang="ts">
import { computed } from 'vue'
import { type Props, type Emits } from './ListItemBase'
import { type Appointment } from '@/lib/dtos'
import Text from '@/components/text/Text.vue'
import Orientation from '@/components/orientation/Orientation.vue'
import { resolveStatus, resolveTimeLeft } from '@/lib/utils/appointment'
import { STATUS } from '@/lib/constants'

const { fields } = defineProps<Props & Appointment>()

const fullname = computed(() => {
  const firstnames = fields.contact_name
  const lastnames = fields.contact_surname
  return firstnames
    .map((name, i) => `${name} ${lastnames[i]}`)
    .join(', ')
    .trim()
})

const statusText = computed(() => {
  return resolveStatus(fields)
})

defineEmits<Emits<Appointment>>()
</script>

<template>
  <div class="p-4 border-1 border rounded m-2">
    <Orientation orientation="horizontal">
      <Orientation orientation="vertical">
        <Text formatter="fullname">
          {{ fullname }}
        </Text>
        <Text v-for="email in fields.contact_email" :key="email" class="block">
          {{ email }}
        </Text>
        <Text
          formatter="phone"
          v-for="phone in fields.contact_phone"
          :key="String(phone)"
          class="block"
        >
          {{ phone }}
        </Text>
      </Orientation>
      <Text>
        {{ fields.appointment_address }}
      </Text>
      <Orientation orientation="horizontal">
        <Orientation orientation="horizontal" class="bg-black text-white p-2 rounded-full">
          <Text>{{ statusText }}</Text>
          <Text v-if="statusText === STATUS.UPCOMING">
            {{ resolveTimeLeft(fields) }}
          </Text>
        </Orientation>
        <Text formatter="datetime" class="mx-4">
          {{ fields.appointment_date }}
        </Text>
      </Orientation>
      <div class="mx-4">
        <slot name="agent-avatars"></slot>
      </div>
    </Orientation>
  </div>
</template>
