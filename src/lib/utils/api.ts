import type { PaginationParams, PagedApiResponse } from "@/lib/dtos"

type ApiPromiseType<T> = (args?: { params?: PaginationParams }) => Promise<PagedApiResponse<T>>
export async function fetchAllPaged<T>(apiCall: ApiPromiseType<T>): Promise<T[]> {
  const allRecords = []
  let offsetParam = null
  let next = true
  while(next) {
    const params: PaginationParams = {}
    if (offsetParam) {
      params.offset = offsetParam
    }
    const { records, offset } = await apiCall({ params })
    allRecords.push(...records)
    offsetParam = offset
    next = !!offset
  }
  return allRecords
}
