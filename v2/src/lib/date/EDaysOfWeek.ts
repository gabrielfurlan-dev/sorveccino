import { z } from "zod"

export const EDaysOfWeekSchema = z.enum(['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'])
export type EDaysOfWeek = z.infer<typeof EDaysOfWeekSchema>