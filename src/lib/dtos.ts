import type { Avatar } from '@/components/Avatar/AvatarBase'

export interface AppointmentFields {
  appointment_id: number
  appointment_date: string
  appointment_address: string
  contact_id: string[]
  contact_name: string[]
  contact_surname: string[]
  contact_email: string[]
  contact_phone: number[]
  is_cancelled: boolean
}

export interface AgentFields {
  number: number
  agent_name: string
  agent_surname: string
  appointments: string[]
  color: string
}

export interface AppointmentFieldsWithAgents extends AppointmentFields {
  agents: Agent[]
  agent_avatars: Avatar[]
}

interface ApiEntity<T> {
  id: string
  createdTime: string
  fields: T
}

export interface PaginationParams {
  offset?: string
}

export interface Appointment extends ApiEntity<AppointmentFields> {}
export interface Agent extends ApiEntity<AgentFields> {}
export interface AppointmentWithAgent extends ApiEntity<AppointmentFieldsWithAgents> {}

export interface PagedApiResponse<T> {
  records: T[]
  offset: string
}
