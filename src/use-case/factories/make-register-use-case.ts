import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repositories'
import { RegisterUseCase } from '@/use-case/register'

export function makeRegisterUseCase() {
    const userRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    return registerUseCase
}
