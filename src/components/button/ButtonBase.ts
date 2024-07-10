import { type Size, EMIT_TYPE } from '../../lib/types'

export interface Props {
  label: string
  size?: Size
}

export const EMIT_TYPE_CLICK = EMIT_TYPE.CLICK
export const EMIT_TYPE_KEY_ENTER = EMIT_TYPE.KEY_ENTER

type EmitType = 'click' | 'keydown:enter'
export type Emits<T> = {
  [K in EmitType]: [data: T]
}
