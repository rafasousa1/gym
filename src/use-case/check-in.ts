import { CheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInRepository) {}

    async execute ({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return { 
            checkIn
        }
    }
}
