import type { Appointment, AppointmentFields, Agent, AppointmentWithAgent } from '@/lib/dtos'
import { timeTo } from './date'
import cloneDeep from 'lodash.clonedeep'
import { initials as initialLettersOf } from './string'
import type { Avatar } from '@/components/Avatar/AvatarBase'
import { STATUS } from '../constants'

export function resolveStatus(appointment: AppointmentFields): string {
  const { is_cancelled, appointment_date } = appointment
  if (is_cancelled) {
    return STATUS.CANCELLED
  }
  const date = new Date(appointment_date)
  const now = new Date()
  if (date.getTime() - now.getTime() > 0) {
    return STATUS.UPCOMING
  } else {
    return STATUS.COMPLETED
  }
}

export function resolveTimeLeft(appointment: AppointmentFields): string {
  const { appointment_date } = appointment

  return timeTo(appointment_date)
}

export function groupAgentsByAppointmentId(agents: Agent[]): Record<string, Agent[]> {
  return agents.reduce(
    (byIdMap, agent) => {
      const { appointments } = agent.fields
      if (!Array.isArray(appointments)) {
        return byIdMap
      }
      appointments.forEach((id) => {
        if (id in byIdMap) {
          byIdMap[id].push(cloneDeep(agent))
        } else {
          byIdMap[id] = [cloneDeep(agent)]
        }
      })
      return byIdMap
    },
    {} as Record<string, Agent[]>
  )
}

export function mapAgentsToAppointments(
  appointments: Appointment[],
  agents: Agent[]
): AppointmentWithAgent[] {
  if (!appointments) {
    throw new Error('Appointment list is empty or not found')
  }
  if (!agents) {
    throw new Error('Agent list is empty or not found')
  }
  const agentByAppointmentId = groupAgentsByAppointmentId(agents)
  return appointments.map((appointment) => {
    const { id: appointmentId } = appointment
    const appointmentAgents = agentByAppointmentId[appointmentId] || []
    const agentAvatars = mapAgentsToAvatarItems(appointmentAgents)
    return {
      ...appointment,
      fields: {
        ...appointment.fields,
        agents: [...appointmentAgents],
        agent_avatars: agentAvatars
      }
    }
  })
}

export function mapAgentsToAvatarItems(agents: Agent[]): Avatar[] {
  return agents.map((agent) => {
    const { agent_name, agent_surname, color } = agent.fields
    const initials = initialLettersOf(`${agent_name} ${agent_surname}`)
    const backgroundColor = color
    return {
      initials,
      backgroundColor
    }
  })
}
