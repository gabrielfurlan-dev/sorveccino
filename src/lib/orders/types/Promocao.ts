import { EDaysOfWeek } from "@/lib/date/EDaysOfWeek"

export type Sale = {
    price: number,
    description: string,
    daysOfWeek: EDaysOfWeek[]
}