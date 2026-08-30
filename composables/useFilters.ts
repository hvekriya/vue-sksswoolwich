/** Calendar date as YYYY-MM-DD in the viewer's local timezone. */
function toDateOnlyString(value?: string | Date | null) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        const y = value.getFullYear()
        const m = String(value.getMonth() + 1).padStart(2, '0')
        const d = String(value.getDate()).padStart(2, '0')
        return `${y}-${m}-${d}`
    }
    if (typeof value === 'string' && value) {
        return value.slice(0, 10)
    }
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

export const useFilters = () => {
    const isSameOrAfter = (date1: string | Date, date2: string | Date) => {
        const d1 = new Date(date1)
        const d2 = new Date(date2)
        d1.setHours(0, 0, 0, 0)
        d2.setHours(0, 0, 0, 0)
        return d1.getTime() >= d2.getTime()
    }

    const isBefore = (date1: string | Date, date2: string | Date) => {
        const d1 = new Date(date1)
        const d2 = new Date(date2)
        d1.setHours(0, 0, 0, 0)
        d2.setHours(0, 0, 0, 0)
        return d1.getTime() < d2.getTime()
    }

    /** True when the event date is the same calendar day as today (local timezone). */
    const isEventToday = (eventDate: string | Date) => {
        const d = new Date(eventDate)
        const today = new Date()
        d.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)
        return d.getTime() === today.getTime()
    }

    /** Events dated today or later (date-only YYYY-MM-DD, local calendar). */
    const isUpcomingEventDate = (eventDate: string | Date | null | undefined) => {
        if (!eventDate) return false
        return toDateOnlyString(eventDate) >= toDateOnlyString()
    }

    /** Events dated before today (date-only YYYY-MM-DD, local calendar). */
    const isPastEventDate = (eventDate: string | Date | null | undefined) => {
        if (!eventDate) return false
        return toDateOnlyString(eventDate) < toDateOnlyString()
    }

    return {
        isSameOrAfter,
        isBefore,
        isEventToday,
        isUpcomingEventDate,
        isPastEventDate,
        toDateOnlyString,
    }
}
