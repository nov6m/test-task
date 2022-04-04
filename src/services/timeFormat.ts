import { format } from 'date-fns'

export function getTimeFormat(timeStr: string): string {
    return format(new Date(timeStr), "HH:mm:ss");
}