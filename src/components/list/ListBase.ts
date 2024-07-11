import { type Orientation, EMIT_TYPE } from '@/lib/types'

export type WithId = {
  id: string
}

export interface Props<T = WithId> {
  orientation?: Orientation
  dataSource: Promise<T[]>
}

export const EMIT_TYPE_CLICK = EMIT_TYPE.CLICK

type EmitType = 'click'
export type Emits<T> = {
  [K in EmitType]: [data: T]
}
