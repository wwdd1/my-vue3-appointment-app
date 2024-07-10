import { type Size, type Orientation, type Theme, EMIT_TYPE } from '@/lib/types'

export interface Props {
  orientation: Orientation
  size?: Size
  theme?: Theme
}

export const EMIT_TYPE_CLICK = EMIT_TYPE.CLICK
type EmitType = 'click'
export type Emits<T> = {
  [K in EmitType]: [data: T]
}
