import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = prisma.checkIn.create({
            data,
        })

        return checkIn
    }

    async save(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id,
            },
            data,
        })

        return checkIn
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return checkIn
    }

    async findManyByUserId(user_id: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id,
            },
            take: 20, // trazer os 20 por página
            skip: (page - 1) * 20
        })

        return checkIns
    }

    async countByUserId(user_id: string) {
        const count = prisma.checkIn.count({
            where: {
                user_id,
            }
        })

        return count
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })
        
        return checkIn
    }
}
