<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import {
  MAX_VISIBLE_AVATAR_FOR_GROUP,
  APPOINTMENTS_PAGE_SIZE,
  STATUS,
} from '@/lib/constants'
import HeaderContentLayout from '../layouts/HeaderContentLayout.vue'
import AvatarGroup from '@/components/avatar/AvatarGroup.vue'
import PaginationList from '@/components/list/PaginationList.vue'
import SelectInput from '@/components/input/SelectInput.vue'
import DateTimeInput from '@/components/input/DateTimeInput.vue'
import AppointmentListItem from '@/components/list-item/AppointmentListItem.vue'
import { getAppointments } from '@/api/appointment'
import { getAgents } from '@/api/agent'
import { mapAgentsToAppointments, mapAgentsToAvatarItems } from '@/lib/utils/appointment'
import type { Appointment, Agent } from '@/lib/dtos'
import { fetchAllPaged } from '@/lib/utils/api'
import type { Avatar } from '@/components/Avatar/AvatarBase'

const agentAvatars = ref<Avatar[]>([])
const select = ref()
const fromDate = ref()
const toDate = ref()

const allAppointments = fetchAllPaged<Appointment>(getAppointments)
const allAgents = fetchAllPaged<Agent>(getAgents)
const appointmentsWithAgentsDataSource = Promise.all([
  allAppointments,
  allAgents,
]).then((data) => {
  const [appointments, agents] = data
  return mapAgentsToAppointments(appointments, agents)
})

const statuses = Promise.resolve(
  Object.values(STATUS)
    .map(status => ({
      id: status,
      label: status
    }))
)

onBeforeMount(() => {
  allAgents.then(agents => {
    agentAvatars.value = mapAgentsToAvatarItems(agents)
  })
})
</script>

<template>
  <HeaderContentLayout>
    <template v-slot:header>
      <!-- This was happen to be a separate header component but no time :) -->
      <div class="flex p-4 gap-8 items-center">
        <AvatarGroup
          :avatars="agentAvatars"
          :visible-count="MAX_VISIBLE_AVATAR_FOR_GROUP"
        ></AvatarGroup>
        <SelectInput
          placeholder="Status"
          :data-source="statuses"
          v-model="select"
        ></SelectInput>
        <DateTimeInput
          v-model="fromDate"
        ></DateTimeInput>
        <DateTimeInput
          v-model="toDate"
        ></DateTimeInput>
      </div>
    </template>
    <template v-slot:default>
      <PaginationList
        :initial-page="1"
        :data-source="appointmentsWithAgentsDataSource"
        v-slot="{ item }"
        :page-size="APPOINTMENTS_PAGE_SIZE"
      >
        <AppointmentListItem v-bind="item">
          <template #agent-avatars>
            <AvatarGroup
              :avatars="item.fields.agent_avatars"
              :visible-count="MAX_VISIBLE_AVATAR_FOR_GROUP"
            ></AvatarGroup>
          </template>
        </AppointmentListItem>
      </PaginationList>
    </template>
  </HeaderContentLayout>
</template>
