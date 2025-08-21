import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository{
    create(data: Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>
    save(checkIn: CheckIn) : Promise<CheckIn>
    findById(id: string) : Promise<CheckIn | null>
    findManyByUserId(user_id: string, page: number): Promise<CheckIn[]>
    countByUserId(user_id: string) : Promise<number>
    findByUserIdOnDate(userId: string, date: Date) : Promise<CheckIn | null>
}
