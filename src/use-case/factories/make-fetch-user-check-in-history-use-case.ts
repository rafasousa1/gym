import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repositories'
import { FetchUsersCheckInsHistoryUseCase } from '../fetch-user-checkin-history'

export function makeGetUserCheckInHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInRepository()
    const useCase = new FetchUsersCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}
