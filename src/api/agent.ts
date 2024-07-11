import axios from 'axios'
import type { PagedApiResponse, Agent } from '@/lib/dtos'

export function getAgents(): Promise<PagedApiResponse<Agent>> {
  const url = `${import.meta.env.VITE_AIR_API_URL}/Agents`
  return axios
    .get<PagedApiResponse<Agent>>(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIR_API_TOKEN}`
      }
    })
    .then(({ data }) => data)
}
