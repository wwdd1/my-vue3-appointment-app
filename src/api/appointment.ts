import axios from 'axios'
import type { Appointment, PagedApiResponse, PaginationParams } from '@/lib/dtos'

export function getAppointments(args?: { params?: PaginationParams }): Promise<PagedApiResponse<Appointment>> {
  const url = `${import.meta.env.VITE_AIR_API_URL}/Appointments`
  return axios
    .get<PagedApiResponse<Appointment>>(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIR_API_TOKEN}`
      },
      params: args?.params,
    })
    .then(({ data }) => data)
}
