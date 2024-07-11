import { format } from '@/lib/utils/date'

export const fullname = (input: string): string => {
  return input
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ')
}

export const date = (input: string): string => {
  return format(input, 'DD/MM/YYYY')
}

export const datetime = (input: string): string => {
  return format(input)
}

export const phone = (input: string): string => {
  return input.replace(/^(\d{2})(\d{4})(\d{0,}).*/, '$1 $2 $3')
}
