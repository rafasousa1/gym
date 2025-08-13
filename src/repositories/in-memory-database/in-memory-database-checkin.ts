import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInRepository } from '../check-in-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {
    public items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')
        
        const checkInOnSameDate = this.items.find((checkin) => {
            const checkInOnDate = dayjs(checkin.created_at)

            const IsOnSameDate = checkInOnDate.isAfter(startOfTheDay) && checkInOnDate.isBefore(endOfTheDay)

            return checkin.user_id === userId && IsOnSameDate
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }
    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }
}
