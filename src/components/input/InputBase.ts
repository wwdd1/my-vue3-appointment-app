// const INPUT_TYPE = ['text', 'datetime', 'select'] as const
// type InputType = (typeof INPUT_TYPE)[number]

export type InputValueType = string
export type SelectOptionValueType = {
  id: string
  label: string
}
export type DateValueType = Date
type ValuePropType = SelectOptionValueType | InputValueType | DateValueType

export interface Props<T extends ValuePropType> {
  modelValue?: T
  placeholder?: string
  label?: string
  min?: number
  max?: number
  error?: Error
}

type EmitType = 'click' | 'input' | 'select' | 'keydown:enter' | 'update:value'
export type Emits<T> = {
  [K in EmitType]: [data: T]
}
