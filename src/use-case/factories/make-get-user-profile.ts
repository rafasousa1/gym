import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repositories'
import { GetUserProfile } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
    const userRepository = new PrismaUserRepository()
    const useCase = new GetUserProfile(userRepository)
    
    return useCase
}
