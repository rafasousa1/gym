import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repositories'
import { CheckInUseCase } from '../check-in'
import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositories'

export function makeChecInseCase() {
    const checkInsRepository = new PrismaCheckInRepository()
    const gymsRepository = new PrismaGymsRepositories
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return useCase
}
