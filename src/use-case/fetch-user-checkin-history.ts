import { CheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckinHistoryUseCaseRequest {
    userId: string
    page: number
}

interface FetchUserCheckinHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUsersCheckInsHistoryUseCase {
    constructor(
        private checkInsRepository: CheckInRepository,
    ) {}

    async execute ({ userId, page }: FetchUserCheckinHistoryUseCaseRequest): Promise<FetchUserCheckinHistoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return { checkIns }
    }
}
