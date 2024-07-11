import { EMIT_TYPE } from '@/lib/types'

export interface Props {}

export const EMIT_TYPE_CLICK = EMIT_TYPE.CLICK

type EmitType = 'click'
export type Emits<T> = {
  [K in EmitType]: [data: T]
}
