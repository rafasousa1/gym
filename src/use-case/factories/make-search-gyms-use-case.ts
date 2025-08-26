import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositories'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepositories()
    const useCase = new SearchGymsUseCase(gymsRepository)

    return useCase
}
