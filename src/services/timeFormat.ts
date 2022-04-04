import { format } from 'date-fns'

export function getTimeFormat (time: string): string {
  return format(new Date(time), 'HH:mm:ss')
}
