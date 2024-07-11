import axios from 'axios'
import type { Appointment, PagedApiResponse } from '@/lib/dtos'

export function getAppointments(): Promise<PagedApiResponse<Appointment>> {
  const url = `${import.meta.env.VITE_AIR_API_URL}/Appointments`
  return axios
    .get<PagedApiResponse<Appointment>>(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIR_API_TOKEN}`
      }
    })
    .then(({ data }) => data)
}
