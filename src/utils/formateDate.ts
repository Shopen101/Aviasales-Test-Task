import { format } from 'date-fns'

export const formatDurationToHoursAndMinutes = (duration: number): string => {
    const hours = Math.floor(duration / 60)
    const minutes = duration - hours * 60

    return `${hours}ч ${minutes}м`
}

export const formatOfFinishTime = (date: string, duration: number): string => {
    return formatDateToHoursAndMinutes(
        new Date(new Date(date).setMinutes(duration)).toString(),
    )
}

export const formatDateToHoursAndMinutes = (date: string): string => {
    return format(new Date(date), 'HH:MM')
}