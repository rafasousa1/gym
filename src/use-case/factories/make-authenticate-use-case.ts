import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repositories'
import { Authenticate } from '../authenticator'

export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new Authenticate(userRepository)
    
    return authenticateUseCase
}