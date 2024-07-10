import { type Size, EMIT_TYPE } from '../../lib/types'

export interface Avatar {
  id?: string
  initials: string
  backgroundColor: string
}

export interface Props extends Avatar {
  size?: Size
}

export const EMIT_TYPE_CLICK = EMIT_TYPE.CLICK
type EmitType = 'click'
export type Emits<T> = {
  [K in EmitType]: [data: T]
}
