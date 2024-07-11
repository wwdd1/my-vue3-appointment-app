<script setup lang="ts">
import { MAX_VISIBLE_AVATAR_FOR_GROUP } from '@/lib/constants'

import HeaderContentLayout from '../layouts/HeaderContentLayout.vue'
import AvatarGroup from '@/components/avatar/AvatarGroup.vue'
import List from '@/components/list/List.vue'
import AppointmentListItem from '@/components/listItem/AppointmentListItem.vue'
import { getAppointments } from '@/api/appointment'
import { getAgents } from '@/api/agent'
import { mapAgentsToAppointments } from '@/lib/utils/appointment'

const appointmentsDataSource = getAppointments().then((data) => data.records)
const agentsDataSource = getAgents().then((data) => data.records)

const appointmentsWithAgentsDataSource = Promise.all([
  appointmentsDataSource,
  agentsDataSource
]).then((data) => {
  const [appointments, agents] = data
  return mapAgentsToAppointments(appointments, agents)
})
</script>

<template>
  <HeaderContentLayout>
    <template v-slot:default>
      <List :data-source="appointmentsWithAgentsDataSource" v-slot="{ item }">
        <AppointmentListItem v-bind="item">
          <template #agent-avatars>
            <AvatarGroup
              :avatars="item.fields.agent_avatars"
              :visible-count="MAX_VISIBLE_AVATAR_FOR_GROUP"
            ></AvatarGroup>
          </template>
        </AppointmentListItem>
      </List>
    </template>
    <template v-slot:header> Nothing </template>
  </HeaderContentLayout>
</template>
