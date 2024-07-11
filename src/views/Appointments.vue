<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { MAX_VISIBLE_AVATAR_FOR_GROUP, APPOINTMENTS_PAGE_SIZE } from '@/lib/constants'
import HeaderContentLayout from '../layouts/HeaderContentLayout.vue'
import AvatarGroup from '@/components/avatar/AvatarGroup.vue'
import PaginationList from '@/components/list/PaginationList.vue'
import AppointmentListItem from '@/components/list-item/AppointmentListItem.vue'
import { getAppointments } from '@/api/appointment'
import { getAgents } from '@/api/agent'
import { mapAgentsToAppointments, mapAgentsToAvatarItems } from '@/lib/utils/appointment'
import type { Appointment, Agent } from '@/lib/dtos'
import { fetchAllPaged } from '@/lib/utils/api'
import type { Avatar } from '@/components/Avatar/AvatarBase'

const agentAvatars = ref<Avatar[]>([])

const allAppointments = fetchAllPaged<Appointment>(getAppointments)
const allAgents = fetchAllPaged<Agent>(getAgents)
const appointmentsWithAgentsDataSource = Promise.all([
  allAppointments,
  allAgents,
]).then((data) => {
  const [appointments, agents] = data
  return mapAgentsToAppointments(appointments, agents)
})

onBeforeMount(() => {
  allAgents.then(agents => {
    agentAvatars.value = mapAgentsToAvatarItems(agents)
  })
})
</script>

<template>
  <HeaderContentLayout>
    <template v-slot:header>
      <div class="flex p-4">
        <AvatarGroup
          :avatars="agentAvatars"
          :visible-count="MAX_VISIBLE_AVATAR_FOR_GROUP"
        ></AvatarGroup>
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
