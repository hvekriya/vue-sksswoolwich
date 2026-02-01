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

    return {
        isSameOrAfter,
        isBefore
    }
}
