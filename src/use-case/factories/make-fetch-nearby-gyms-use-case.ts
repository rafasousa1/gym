import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositories'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepositories()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)

    return useCase
}
