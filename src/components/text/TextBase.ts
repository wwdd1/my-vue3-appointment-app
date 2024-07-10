import { type Size, EMIT_TYPE } from '../../lib/types'

type BuiltInTextFormatterType = 'fullName' | 'phone' | 'address' | 'date'

export interface Props {
  text?: string
  variant?: 'bold' | 'normal' | 'light'
  formatter?: BuiltInTextFormatterType | ((input: string) => string)
  size?: Size
}

export const EMIT_TYPE_CLICK = EMIT_TYPE.CLICK
type EmitType = 'click'
export type Emits<T> = {
  [K in EmitType]: [data: T]
}
