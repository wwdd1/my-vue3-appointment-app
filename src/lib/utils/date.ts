import dayjs from '@/lib/utils/dayjs'

export function timeTo(date: Date | string): string {
  return dayjs().utc().to(dayjs(date))
}

export function format(date: Date | string, format: string = 'DD/MM/YYYY HH:mm'): string {
  return dayjs(date).utc().format(format)
}
