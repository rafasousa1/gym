import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository{
    create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>
    findManyByUserId(user_id: string, page: number): Promise<CheckIn[]>
    findByUserIdOnDate(userId: string, date: Date) : Promise<CheckIn | null>
}
