import { type Size, EMIT_TYPE } from '../../lib/types'

export type BuiltInTextFormatterType = 'fullname' | 'phone' | 'address' | 'date' | 'datetime'

export interface Props {
  ellipsisMaxCharLength?: number
  wrap?: boolean
  variant?: 'bold' | 'normal' | 'light'
  formatter?: BuiltInTextFormatterType | ((input: string) => string)
  size?: Size
}

export const EMIT_TYPE_CLICK = EMIT_TYPE.CLICK
type EmitType = 'click'
export type Emits<T> = {
  [K in EmitType]: [data: T]
}
